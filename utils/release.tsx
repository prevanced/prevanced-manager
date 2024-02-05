import AsyncStorage from "@react-native-async-storage/async-storage";
import { PrevancedOptions } from "../types/prevanced";
import { Release } from "../types/release";

export async function fetchReleases(): Promise<Release[]> {
  const awaitedOptions = await AsyncStorage.getItem("prevancedOptions");
  const prevancedOptions: PrevancedOptions | null = JSON.parse(
    awaitedOptions || "{}"
  );
  let ghReleaseUrl;
  if (
    prevancedOptions &&
    prevancedOptions.ghRepo &&
    prevancedOptions.ghReleaseTag
  ) {
    if (prevancedOptions.ghReleaseTag == "latest") {
      ghReleaseUrl = `https://api.github.com/repos/${prevancedOptions.ghRepo}/releases/latest`;
    } else {
      ghReleaseUrl = `https://api.github.com/repos/${prevancedOptions.ghRepo}/releases/tags/${prevancedOptions.ghReleaseTag}`;
    }
  } else {
    ghReleaseUrl =
      "https://api.github.com/repos/Revanced-APKs/build-apps/releases/latest";
  }
  if (!ghReleaseUrl) {
    throw new Error("Empty GitHub release URL");
  }
  const response = await fetch(ghReleaseUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch releases from ${prevancedOptions?.ghRepo}`);
  }
  
  const data = await response.json();
  if (data.assets) {
    return data.assets
          .filter((asset: Release) => !asset.name.match("magisk"))
          .map((asset: Release) => {
            let name = "";
            let version = "";
            let arch = "";
            let brand = "";
            const regex = /(.+)-([a-z]+)-(v[\d.]+)-(\S+)\.apk/;
            const match = asset.name.match(regex);
  
            if (match) {
              name = match[1].charAt(0).toUpperCase() + match[1].slice(1);
              brand = match[2];
              version = match[3];
              arch = match[4];
              // twitter version fix
              if (arch.split(".").length > 1) {
                arch = arch.split(".").reverse()[0].split("-").reverse()[0];
              }
            } else {
              const regex = /(.+)-([a-z]+)-(v[\S.]+)-(\S+)\.apk/;
              const match = asset.name.match(regex);
              if (match) {
                name = match[1].charAt(0).toUpperCase() + match[1].slice(1);
                brand = match[2];
                version = match[3];
                if (version.length > 30) {
                  version = version.slice(0, 30);
                  version = version + "...";
                }
                arch = match[4];
              }
            }
  
            if (arch !== "") {
              if (arch !== "all") {
                name = name + " " + arch;
              }
            }
  
            if (brand !== "") {
              // for patches like extended and ReX
              if (brand != "revanced") {
                name = name + " " + brand;
              }
            }
  
            return {
              name,
              brand,
              fileName: asset.name,
              version,
              arch,
              browser_download_url: asset.browser_download_url,
            };
          }) as Release[];

  } else {
    throw new Error("No assets found");
  }
}
