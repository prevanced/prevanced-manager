import React from "react";
import { ScrollView, YGroup } from "tamagui";
import DisplayApp from "./DisplayApp";
import { Release } from "../types/release";

type ListAppCardsProps = {
  releases: Release[];
  search: string;
};

function ListAppCards(props: ListAppCardsProps) {
  const { releases, search } = props;
  return (
    <YGroup alignSelf="center" size="$4" paddingBottom="$12">
      <ScrollView>
        {releases
          .filter((release) =>
            release.fileName.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((release, index) => {
            return <DisplayApp key={index} release={release} />;
          })}
      </ScrollView>
    </YGroup>
  );
}

export default ListAppCards;
