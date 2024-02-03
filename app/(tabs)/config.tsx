import { useState } from "react";
import { Button, Input, Label, View, YStack, XStack, Paragraph, ScrollView } from "tamagui";
import { useToastController, useToastState } from '@tamagui/toast';

export default function TabTwoScreen() {
  const toast = useToastController();
  const [ghRepo, setGhRepo] = useState("revanced-apks/build-apps");
  const [ghReleaseTag, setGhReleaseTag] = useState("latest");

  const restoreChanges = () => {
    const default_ghRepo = "revanced-apks/build-apps";
    const default_tag = "latest";
  
    setGhRepo(default_ghRepo);
    setGhReleaseTag(default_tag);

    toast.show("Restored. Don't forget `Apply changes`", {
      native: true,
    })
  };
  
  const applyChanges = () => {
    console.log("Apply changes");
  };

  return (
    <ScrollView>
      <View paddingVertical="$2">
        <YStack paddingHorizontal="$4" gap="$4">
          <YStack gap="$2">
            <Label htmlFor="ghRepo" fontSize="$5">GitHub Repository</Label>
            <Paragraph theme="alt1">
              The repository to use for fetching the latest APKs from. This should be a public repository.
            </Paragraph>
            <Input id="ghRepo" value={ghRepo} onChangeText={setGhRepo} />
          </YStack>
          <YStack gap="$2">
            <Label htmlFor="ghReleaseTag" fontSize="$5">Release Tag</Label>
            <Paragraph theme="alt1">
              The tag to use for fetching the latest APKs from. This should be a tag that is present in the repository. `latest` means the latest release.
            </Paragraph>
            <Input id="ghReleaseTag" value={ghReleaseTag} onChangeText={setGhReleaseTag} />
          </YStack>
          <XStack gap="$2">
            <Button theme="red" onPress={restoreChanges}>
              Restore
            </Button>
            <Button theme="green" onPress={applyChanges}>
              Apply changes
            </Button>
          </XStack>
        </YStack>
      </View>
    </ScrollView>
  );
}
