import Clipboard from "@react-native-clipboard/clipboard";
import { Alert, Linking, ToastAndroid } from "react-native";
import { PreVancedUpdateType, Release } from "../types/release";
import DeviceInfo from 'react-native-device-info';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PrevancedOptions } from "../types/prevanced";

const copyToClipboard = (text: string) => {
  Clipboard.setString(text);
};

const showToast = (message: string) => {
  ToastAndroid.show(message, ToastAndroid.SHORT);
};

const checkAppUpdate = async (): Promise<PreVancedUpdateType> => {
  try {
    const currentVersion = DeviceInfo.getVersion();
    const deviceABIs = await DeviceInfo.supportedAbis();
    const deviceArch = deviceABIs[0];

    if (!currentVersion) {
      throw new Error("Failed to get the current version");
    }

    // Make a request to the GitHub API to get the latest release
    const response = await fetch(
      "https://api.github.com/repos/Dare-Devill/prevanced-manager/releases/latest"
    );
    const data: Release = await response.json();

    // Extract the latest version from the response
    const latestVersion = data.tag_name.slice(1);

    // Compare the current version with the latest version
    if (currentVersion !== latestVersion) {
      // There is an update available
      return {
        version: latestVersion,
        release: data,
        arch: deviceArch,
        isUpdateAvailable: true,
      };
    } else {
      // The app is up to date
      return {
        version: currentVersion,
        release: data,
        arch: deviceArch,
        isUpdateAvailable: false,
      };
    }
  } catch (error: Error | any) {
    console.error(error);
    throw new Error("Failed to check for updates");
  }
};

async function checkForUpdate() {
  const awaitedOptions = await AsyncStorage.getItem("prevancedOptions");
  const prevancedOptions: PrevancedOptions | null = JSON.parse(
    awaitedOptions || "{}"
  );
  let shouldCheckForUpdate = true;
  if (prevancedOptions) {
    if (prevancedOptions.prevancedManagerUpdate === false) {
      shouldCheckForUpdate = false;
    }
  }
  if (shouldCheckForUpdate) {
    const prevancedUpdate = await checkAppUpdate();
    const alertBody = `PreVanced Manager ${prevancedUpdate.release.tag_name}

    ${prevancedUpdate.release.body}
    `;
    if (prevancedUpdate.isUpdateAvailable) {
      Alert.alert("App Update Available", alertBody, [
        {
          text: "Update",
          onPress: () => {
            let assetUrl;
            assetUrl = prevancedUpdate.release.assets.find(
              (asset) =>
                asset.name.includes(prevancedUpdate.arch) &&
                asset.name.includes("apk")
            )?.browser_download_url;
            if (assetUrl) {
              showToast("Downloading update...");
              Linking.openURL(assetUrl);
            } else {
              showToast("Opening GitHub release page...");
              Linking.openURL(prevancedUpdate.release.html_url);
            }
          },
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    }
  }
}

export { copyToClipboard, showToast, checkForUpdate };
