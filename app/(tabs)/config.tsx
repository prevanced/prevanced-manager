import { Text, View } from 'tamagui'
import {MessageCircleWarning} from '@tamagui/lucide-icons'

export default function TabTwoScreen() {
  return (
    <View flex={1} alignItems='center' justifyContent='center' paddingVertical="$2">
      <Text fontSize={20}>This page is under construction. <MessageCircleWarning /></Text>
    </View>
  )
}
