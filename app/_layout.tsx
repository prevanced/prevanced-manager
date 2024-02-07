import "../tamagui.css";

import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { SplashScreen, Stack } from "expo-router";
import { Alert, useColorScheme } from "react-native";
import { TamaguiProvider } from "tamagui";

import { useFonts } from "expo-font";
import { useEffect } from "react";
import { config } from "../tamagui.config";
import { PermissionsAndroid } from "react-native";
import messaging from "@react-native-firebase/messaging";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(tabs)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [interLoaded, interError] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  });

  useEffect(() => {
    if (interLoaded || interError) {
      // Hide the splash screen after the fonts have loaded (or an error was returned) and the UI is ready.
      SplashScreen.hideAsync();
    }
  }, [interLoaded, interError]);

  if (!interLoaded && !interError) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  const handlePermission = async () => {
    const notificationPermissionStatus = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    if (notificationPermissionStatus === "granted") {
      const unsubscribe = messaging().onTokenRefresh((token) => {
        console.log("FCM Token", token);
      });
      return unsubscribe;
    }
  };

  useEffect(() => {
    handlePermission();
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.notification?.title) {
        let title = remoteMessage.notification?.title;
        if (!title) {
          title = "Notification 📬";
        }
        const body = remoteMessage.notification?.body;
        Alert.alert(title, body, [{ text: "OK" }]);
      } else {
        let title = remoteMessage.data?.title;
        if (!title) {
          title = "New message 📬";
        }
        const body = remoteMessage.data?.body;
        if (!body) {
          return;
        }
        Alert.alert(title.toString(), body!.toString());
      }
    });
    return unsubscribe;
  }, []);

  return (
    <TamaguiProvider config={config} defaultTheme={colorScheme as any}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          </Stack>
      </ThemeProvider>
    </TamaguiProvider>
  );
}
