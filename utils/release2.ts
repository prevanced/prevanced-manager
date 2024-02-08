/*
 * Copyright (c) 2023 Pratham Mishra.
 * All Rights Reserved.
 * 
 * See the LICENSE file for more information.
 */

import AsyncStorage from "@react-native-async-storage/async-storage";
import { PrevancedOptions } from "../types/prevanced";
import { Assets, Release } from "../types/release";

export async function fetchReleases(): Promise<Release> {
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
      "https://api.github.com/repos/Dare-Devill/Revanced-apps/releases/latest";
  }
  if (!ghReleaseUrl) {
    throw new Error("Empty GitHub release URL");
  }
  const response = await fetch(ghReleaseUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch releases from ${prevancedOptions?.ghRepo}`);
  }
  
  const data = await response.json();
  let assets: Assets[] = [];
  if (data.assets) {
    assets = data.assets
    .filter((asset: Assets) => !asset.name.match("apk"))
    .map((asset: Assets) => {
      let name = "";
      let version = "";
      let arch = "";
      let brand = "";
      const regex = /(.+)-([a-z]+)-(v[\d.]+)-(\S+)\.zip/;
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

      if (brand !== "") {
        brand = brand.charAt(0).toUpperCase() + brand.slice(1);
        // for patches like extended and ReX
        if (brand != "Revanced") {
          name = name + " " + brand;
        }
      }

      if (arch !== "") {
        if (arch !== "all") {
          name = name + " " + arch;
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
    });
    
    return {
      tag_name: data.tag_name,
      assets,
      published_at: data.published_at,
      html_url: data.html_url,
      body: data.body,
      prerelease: data.prerelease,
      draft: data.draft,
      name: data.name,
      url: data.url,
      assets_url: data.assets_url,
      upload_url: data.upload_url,
      tarball_url: data.tarball_url,
      zipball_url: data.zipball_url,
      id: data.id,
      node_id: data.node_id,
    };
  } else {
    throw new Error("No assets found");
  }
}
