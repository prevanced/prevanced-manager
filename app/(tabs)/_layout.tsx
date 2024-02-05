import { Home, Settings2 } from "@tamagui/lucide-icons";
import { Tabs } from "expo-router";

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
        tabBarStyle: {
          paddingBottom: 6,
          height: 55,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "PreVanced Manager",
          tabBarIcon: ({ color }) => <Home color={color} />,
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
