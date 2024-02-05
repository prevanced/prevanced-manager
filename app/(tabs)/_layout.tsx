import { Home, Download,Settings2 } from "@tamagui/lucide-icons";
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
        tabBarShowLabel: true,
        tabBarBadgeStyle: {
          backgroundColor: "red",
        },
        tabBarLabelPosition: "beside-icon",
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
