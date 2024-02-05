import React from "react";
import {
  Card,
  YGroup,
  H2,
  Paragraph,
  Button,
  XStack,
  Separator,
} from "tamagui";
import { Release } from "../types/release";
import { Linking } from "react-native";

type DisplayAppProps = {
  release: Release;
};

export default function DisplayApp(props: DisplayAppProps) {
  const { release } = props;
  return (
    <YGroup.Item>
      <Card bordered my="$2">
        <Card.Header padded>
          <H2>{release.name}</H2>
          <Paragraph theme="alt1">{release.fileName}</Paragraph>
          <Separator marginVertical="$2" />
          <XStack alignItems="center">
            <Paragraph>{release.version}</Paragraph>
            <Separator alignSelf="stretch" vertical marginHorizontal={15} />
            <Paragraph>{release.arch}</Paragraph>
          </XStack>
        </Card.Header>
        <Card.Footer padded>
          <Button
            borderRadius="$10"
            bordered
            theme="blue_alt1"
            width="100%"
            onPress={() => Linking.openURL(release.browser_download_url)}
          >
            Download
          </Button>
        </Card.Footer>
      </Card>
    </YGroup.Item>
  );
}
