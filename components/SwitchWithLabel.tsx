import React from 'react'
import { Label, Separator, SizeTokens, Switch, XStack } from 'tamagui';

export function SwitchWithLabel(props: { 
    label: string; 
    id: string;
    labelSize: SizeTokens; 
    checkboxSize: SizeTokens; 
    onCheckedChange?: (checked: boolean) => void;
    checked?: boolean;
    defaultChecked?: boolean 
}) {
    return (
      <XStack width={200} alignItems="center" gap="$4">
        <Label
          paddingRight="$0"
          minWidth={90}
          justifyContent="flex-end"
          size={props.labelSize}
          htmlFor={props.id}
        >
            {props.label}
        </Label>
        <Separator minHeight={20} vertical />
        <Switch id={props.id} size={props.checkboxSize} onCheckedChange={props.onCheckedChange} checked={props.checked} defaultChecked={props.defaultChecked}>
          <Switch.Thumb animation="quick" />
        </Switch>
      </XStack>
    )
  }

export default SwitchWithLabel