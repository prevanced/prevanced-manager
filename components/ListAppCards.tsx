import React from "react";
import { ScrollView, YGroup } from "tamagui";
import DisplayApp from "./DisplayApp";
import { Assets, Release } from "../types/release";

type ListAppCardsProps = {
  releases: Assets[];
  search: string;
};

function ListAppCards(props: ListAppCardsProps) {
  const { releases, search } = props;
  return (
      <ScrollView>
    <YGroup alignSelf="center" size="$4" paddingTop="$2" paddingBottom="$12" gap="$3">
        {releases
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
