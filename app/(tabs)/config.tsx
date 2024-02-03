import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Label,
  View,
  YStack,
  XStack,
  Paragraph,
  ScrollView,
} from "tamagui";
import { useToastController } from "@tamagui/toast";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type PrevancedOptions = {
  ghRepo: string;
  ghReleaseTag: string;
};

export default function TabTwoScreen() {
  const toast = useToastController();
  const [prevancedOptions, setPrevancedOptions] = useState<PrevancedOptions>({
    ghRepo: "revanced-apks/build-apps",
    ghReleaseTag: "latest",
  });

  useEffect(() => {
    async function fetchSettings() {
      const prevancedOptions = await AsyncStorage.getItem("prevancedOptions");

      if (prevancedOptions) {
        setPrevancedOptions(JSON.parse(prevancedOptions));
      }
    }

    fetchSettings();
  }, []);

  const restoreChanges = () => {
    const default_options: PrevancedOptions = {
      ghRepo: "revanced-apks/build-apps",
      ghReleaseTag: "latest",
    };

    setPrevancedOptions(default_options);

    toast.show("Restored. Don't forget `Apply changes`", {
      native: true,
    });
  };

  const applyChanges = () => {
    Promise.all([AsyncStorage.setItem("prevancedOptions", JSON.stringify(prevancedOptions))]).then(() => {
      toast.show("Changes applied", {
        native: true,
      });
    });
  };

  return (
    <ScrollView>
      <View paddingVertical="$2">
        <YStack paddingHorizontal="$4" gap="$4">
          <YStack gap="$2">
            <Label htmlFor="ghRepo" fontSize="$5">
              GitHub Repository
            </Label>
            <Paragraph theme="alt1">
              The repository to use for fetching the latest APKs from. This
              should be a public repository.
            </Paragraph>
            <Input id="ghRepo" defaultValue={prevancedOptions.ghRepo} onChangeText={(text) => setPrevancedOptions({ ...prevancedOptions, ghRepo: text })} />
          </YStack>
          <YStack gap="$2">
            <Label htmlFor="ghReleaseTag" fontSize="$5">
              Release Tag
            </Label>
            <Paragraph theme="alt1">
              The tag to use for fetching the latest APKs from. This should be a
              tag that is present in the repository. `latest` means the latest
              release.
            </Paragraph>
            <Input
              id="ghReleaseTag"
              value={prevancedOptions.ghReleaseTag}
              onChangeText={(text) =>
                setPrevancedOptions({ ...prevancedOptions, ghReleaseTag: text })
              }
            />
          </YStack>
          <XStack gap="$2">
            <Button theme="blue_alt1" onPress={restoreChanges}>
              Restore
            </Button>
            <Button theme="green_active" onPress={applyChanges}>
              Apply changes
            </Button>
          </XStack>
        </YStack>
      </View>
    </ScrollView>
  );
}
