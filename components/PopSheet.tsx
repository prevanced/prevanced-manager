import { X } from "@tamagui/lucide-icons";
import React, { useEffect } from "react";
import { BackHandler } from "react-native";
import {
  Adapt,
  Button,
  Dialog, Sheet, Unspaced,
  View
} from "tamagui";

type Props = {
  title: string;
  description: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  model?: boolean;
  children?: React.ReactNode;
};

const PopSheet = (props: Props) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        if (props.open) {
          props.setOpen(false); // Close the sheet
          return true; // Prevent default back action
        }
        return false;
      }
    );
    return () => backHandler.remove();
  }, [props.open]);
  return (
    <>
      <Dialog
        modal={props.model}
        open={props.open}
        onOpenChange={props.setOpen}
      >
        <Adapt when="sm" platform="touch">
          <Sheet
            animation="quick"
            zIndex={200000}
            dismissOnSnapToBottom
            modal={props.model}
          >
            <Sheet.Frame padding="$4" gap="$4">
              <Sheet.ScrollView>
                <Adapt.Contents />
              </Sheet.ScrollView>
            </Sheet.Frame>
          </Sheet>
        </Adapt>

        <Dialog.Portal>
          <Dialog.Content
            bordered
            elevate
            key="content"
            gap="$4"
          >
            <Dialog.Title>{props.title}</Dialog.Title>
            <Dialog.Description>{props.description}</Dialog.Description>
            <View>{props.children}</View>
            <Unspaced>
              <Dialog.Close asChild displayWhenAdapted>
                <Button
                  position="absolute"
                  top="$0"
                  right="$1"
                  size="$3"
                  circular
                  scaleIcon={1.5}
                  icon={X}
                />
              </Dialog.Close>
            </Unspaced>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog>
    </>
  );
};

export default PopSheet;
