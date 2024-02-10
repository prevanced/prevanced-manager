import AsyncStorage from "@react-native-async-storage/async-storage";
import { ArrowUpRightFromCircle } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import {
  Button,
  Input,
  Paragraph,
  ScrollView,
  Text,
  View,
  XStack,
  YStack,
} from "tamagui";
import FilterAppsPopup from "../../components/FilterAppsPopup";
import SwitchWithLabel from "../../components/SwitchWithLabel";
import { PrevancedFilterApps, PrevancedOptions } from "../../types/prevanced";
import { showToast } from "../../utils";

export default function TabTwoScreen() {
  const [prevancedOptions, setPrevancedOptions] = useState<PrevancedOptions>({
    ghRepo: "revanced-apks/build-apps",
    ghReleaseTag: "latest",
    prevancedManagerUpdate: true,
  });
  const [prevancedFilterApps, setPrevancedFilterApps] =
    useState<PrevancedFilterApps>({
      filterApps: [],
    });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchSettings() {
      await AsyncStorage.getItem("prevancedOptions").then((value) => {
        if (value) {
          setPrevancedOptions(JSON.parse(value));
        }
      });
      await AsyncStorage.getItem("prevancedFilterApps").then((value) => {
        if (value) {
          const filterApps: PrevancedFilterApps = JSON.parse(value);
          setPrevancedFilterApps(filterApps);
        }
      });
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
    setPrevancedFilterApps({
      filterApps: prevancedFilterApps.filterApps.map((app) => {
        app.checked = true;
        return app;
      }),
    });

    showToast("Restored. Don't forget `Apply changes`");
  };

  const applyChanges = () => {
    Promise.all([
      AsyncStorage.setItem(
        "prevancedOptions",
        JSON.stringify(prevancedOptions)
      ),
      AsyncStorage.setItem(
        "prevancedFilterApps",
        JSON.stringify(prevancedFilterApps)
      ),
    ]).then(() => {
      showToast("Changes applied. Click refresh button to reflect changes.");
    });
  };

  return (
    <ScrollView>
      <View paddingVertical="$2">
        <YStack paddingHorizontal="$4" gap="$4">
          <YStack gap="$2">
            <Text fontSize="$5">GitHub Repository</Text>
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
            <Text fontSize="$5">Release Tag</Text>
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
            <Text fontSize="$5">Filter Apps</Text>
            <Paragraph theme="alt1">
              Choose the apps to be shown for downloads in the PreVanced
              Manager.
            </Paragraph>
            <Button
              w="100%"
              borderRadius="$12"
              theme="blue"
              size="$3"
              onPress={() => {
                setOpen(!open);
              }}
              scaleIcon={1.2}
              iconAfter={ArrowUpRightFromCircle}
            >
              Choose Apps
            </Button>
            <FilterAppsPopup
              open={open}
              setOpen={setOpen}
              prevancedFilterApps={prevancedFilterApps}
              setPrevancedFilterApps={setPrevancedFilterApps}
            />
          </YStack>
          <YStack gap="$2">
            <Text fontSize="$5">Updates</Text>
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
          <XStack gap="$2" w="100%" justifyContent="flex-end">
            <Button theme="blue_alt1" onPress={restoreChanges}>
              Reset
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
