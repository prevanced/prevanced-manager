import React from "react";
import { ScrollView, XStack, YGroup, Text } from "tamagui";
import DisplayApp from "./DisplayApp";
import { Release } from "../types/release";

type ListAppCardsProps = {
  releases: Release;
  search: string;
};

function ListAppCards(props: ListAppCardsProps) {
  const { releases, search } = props;
  return (
    <ScrollView>
      <XStack
        p="$2"
        mb="$1.5"
        gap="$2"
        justifyContent="center"
        alignContent="center"
        width="100%"
        overflow="hidden"
        borderRadius="$12"
        backgroundColor="$blue1"
        theme="blue_alt1"
      >
        <Text>Release {releases.name}</Text>
        <Text>on {new Date(releases.published_at).toLocaleDateString()}</Text>
      </XStack>
      <YGroup
        alignSelf="center"
        size="$4"
        paddingTop="$1.5"
        gap="$3"
      >
        {releases
          .assets
          .filter((release) =>
            release.fileName.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((release, index) => {
            return <DisplayApp key={index} release={release} />;
          })}
      </YGroup>
    </ScrollView>
  );
}

export default ListAppCards;
