import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { Text } from 'tamagui'
import { Home, Menu, Settings2 } from '@tamagui/lucide-icons'

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'cyan',
      }}
    >
      <Tabs.Screen
        name='index'
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Home color={color} />,
          headerRight: () => (
            <Link href='/modal' asChild>
              <Pressable>
                <Menu />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name='two'
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Settings2 color={color}/>,
        }}
      />
    </Tabs>
  )
}
