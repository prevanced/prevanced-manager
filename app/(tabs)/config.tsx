import { Button, Input, Label, View, YStack } from "tamagui";

export default function TabTwoScreen() {
  return (
    <View paddingVertical="$2">
      <YStack paddingHorizontal="$4" gap="$4">
        <YStack>
          <Label htmlFor="ghRepo">GitHub Repository</Label>
          <Input id="ghRepo" defaultValue="revanced-apks/build-apps" />
        </YStack>
        <YStack>
          <Label htmlFor="ghBranch">Release Tag</Label>
          <Input id="ghBranch" defaultValue="latest" />
        </YStack>
        <Button theme="green_alt1" onPress={() => console.log("Apply changes")}>
          Apply changes
        </Button>
      </YStack>
    </View>
  );
}
