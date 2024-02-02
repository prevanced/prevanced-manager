import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import { Home, Menu, Settings2 } from '@tamagui/lucide-icons'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: true,
      headerTitleAlign: 'left',
      headerTitleStyle: {
        fontSize: 20,
      },
    }}>
      <Tabs.Screen
        name='index'
        options={{
          title: 'PreVanced',
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
        name='config'
        options={{
          title: 'Config',
          tabBarIcon: ({ color }) => <Settings2 color={color}/>,
        }}
      />
    </Tabs>
  )
}
