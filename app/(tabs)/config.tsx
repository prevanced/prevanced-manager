import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Label,
  Paragraph,
  ScrollView,
  View,
  XStack,
  YStack,
} from "tamagui";
import { PrevancedOptions } from "../../types/prevanced";
import { showToast } from "../../utils";
import SwitchWithLabel from "../../components/SwitchWithLabel";

export default function TabTwoScreen() {
  const [prevancedOptions, setPrevancedOptions] = useState<PrevancedOptions>({
    ghRepo: "revanced-apks/build-apps",
    ghReleaseTag: "latest",
    prevancedManagerUpdate: true,
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
      prevancedManagerUpdate: true,
    };

    setPrevancedOptions(default_options);

    showToast("Restored. Don't forget `Apply changes`");
  };

  const applyChanges = () => {
    Promise.all([
      AsyncStorage.setItem(
        "prevancedOptions",
        JSON.stringify(prevancedOptions)
      ),
    ]).then(() => {
      showToast("Changes applied");
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
            <Input
              id="ghRepo"
              defaultValue={prevancedOptions.ghRepo}
              onChangeText={(text) =>
                setPrevancedOptions({ ...prevancedOptions, ghRepo: text })
              }
            />
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
          <YStack gap="$2">
            <Label fontSize="$5">Updates</Label>
            <Paragraph theme="alt1">
              Check for updates on app start. We recommend keep this enabled as
              new features and bug fixes are added frequently.
            </Paragraph>
            <SwitchWithLabel
              label="PreVanced Manager Update"
              id="prevancedManagerUpdateToggle"
              labelSize="$4"
              checkboxSize="$3"
              checked={prevancedOptions.prevancedManagerUpdate}
              onCheckedChange={(checked) =>
                setPrevancedOptions({
                  ...prevancedOptions,
                  prevancedManagerUpdate: checked,
                })
              }
            />
          </YStack>
          <XStack gap="$2">
            <Button theme="blue_alt1" onPress={restoreChanges}>
              Restore
            </Button>
            <Button theme="green_active" color="white" onPress={applyChanges}>
              Apply changes
            </Button>
          </XStack>
        </YStack>
      </View>
    </ScrollView>
  );
}
