import AsyncStorage from "@react-native-async-storage/async-storage";
import { Check } from "@tamagui/lucide-icons";
import React from "react";
import { Button, Checkbox, Label, XStack, YStack } from "tamagui";
import { PrevancedFilterApps } from "../types/prevanced";
import { showToast } from "../utils";
import PopSheet from "./PopSheet";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  prevancedFilterApps: PrevancedFilterApps;
  setPrevancedFilterApps: (prevancedFilterApps: PrevancedFilterApps) => void;
};

const FilterAppsPopup = (props: Props) => {
  const { open, setOpen, prevancedFilterApps, setPrevancedFilterApps } = props;
  return (
    <PopSheet
      model
      open={open}
      setOpen={setOpen}
      title="Filter Apps"
      description="Filter which apps to be shown for downloads"
    >
      <YStack gap="$2">
        {prevancedFilterApps &&
          prevancedFilterApps.filterApps &&
          prevancedFilterApps.filterApps.map((app, index) => {
            return (
              <XStack key={index} alignItems="center" gap="$2">
                <Checkbox
                  key={index}
                  id={`${index}_${app.name}_checkbox`}
                  size="$5"
                  checked={app.checked}
                  onCheckedChange={(checked) => {
                    const newFilterApps = prevancedFilterApps.filterApps;
                    if (typeof checked === "boolean")
                      newFilterApps[index].checked = checked;
                    setPrevancedFilterApps({
                      filterApps: newFilterApps,
                    });
                  }}
                >
                  <Checkbox.Indicator>
                    <Check />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label htmlFor={`${index}_${app.name}_checkbox`} fontSize="$5">
                  {app.name}
                </Label>
              </XStack>
            );
          })}
        <Button
          w="100%"
          theme="green_active"
          borderRadius="$12"
          onPress={() => {
            setOpen(false);
            AsyncStorage.setItem(
              "prevancedFilterApps",
              JSON.stringify(prevancedFilterApps)
            ).then(() =>
              showToast(
                "Changes applied. Click refresh button to reflect changes."
              )
            );
          }}
        >
          Save Changes
        </Button>
      </YStack>
    </PopSheet>
  );
};

export default FilterAppsPopup;
