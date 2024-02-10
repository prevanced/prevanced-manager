import { Info, Download, Settings2 } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";
import { Alert, Linking } from "react-native";
import { Button } from "tamagui";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "left",
        headerTitleStyle: {
          fontSize: 20,
        },
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: true,
        tabBarLabelPosition: "beside-icon",
        headerRight: () => <>
          <Button 
          icon={Info}
          circular
          size="$4"
          variant="outlined"
          scaleIcon={1.8}
          onPress={() => {
            Alert.alert("PreVanced Manager", 
            "PreVanced Manager is a simple app to manage your ReVanced app downloads. All the downloads are fetched from GitHub and are not hosted by the app. The app is open-source and is available on GitHub. You can also join the Telegram group to get the latest updates and news.",
            [
              { text: "GitHub", onPress: () => Linking.openURL("https://github.com/prevanced") },
              { text: "Telegram", onPress: () => Linking.openURL("https://telegram.me/prevanced_app") },
              { text: "Close", isPreferred: true },
            ]);
          }} />
        </>,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Downloads",
          headerTitle: "PreVanced Manager",
          tabBarIcon: ({ color }) => <Download color={color} />,
        }}
      />
      <Tabs.Screen
        name="config"
        options={{
          title: "Options",
          tabBarIcon: ({ color }) => <Settings2 color={color} />,
        }}
      />
    </Tabs>
  );
}
