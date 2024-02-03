import {
  View,
  Input,
  Spinner,
  Text,
  YStack,
  ScrollView,
  YGroup,
  Card,
  Button,
  H2,
  Paragraph,
  XStack,
  Image,
} from "tamagui";
import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { Linking } from "react-native";

type Release = {
  name: string;
  browser_download_url: string;
};

export default function TabOneScreen() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [releases, setReleases] = useState<Release[]>([]);

  useEffect(() => {
    async function fetchReleases() {
      setLoading(true);
      const response = await fetch(
        "https://api.github.com/repos/Revanced-APKs/build-apps/releases/latest"
      );
      const data = await response.json();
      data.assets && setReleases(data.assets);
      setLoading(false);
    }
    fetchReleases();
  }, []);
  return (
    <YStack padding="$2">
      <View alignItems="center">
        <Input
          placeholder="Search"
          width="100%"
          paddingStart="$6"
          paddingHorizontal="$4"
          paddingVertical="$3"
          borderRadius="$2"
          borderWidth="$1"
          onChangeText={setSearch}
          value={search}
        />
      </View>
      <View alignItems="center">
        {loading ? (
          <Spinner size="large" />
        ) : (
          <YGroup alignSelf="center" size="$4" paddingBottom="$12">
            <ScrollView>
              {releases
                .filter((release) =>
                  release.name.toLowerCase().includes(search.toLowerCase())
                )
                .map((release, index) => {
                  return (
                    <YGroup.Item key={index}>
                      <Card elevate bordered my="$2">
                        <Card.Header padded>
                          <H2>{release.name}</H2>
                          <Paragraph theme="alt2">
                            {release.browser_download_url}
                          </Paragraph>
                        </Card.Header>
                        <Card.Footer padded>
                          <Button
                            borderRadius="$10"
                            width="100%"
                            onPress={() =>
                              Linking.openURL(release.browser_download_url)
                            }
                          >
                            Download
                          </Button>
                        </Card.Footer>
                      </Card>
                    </YGroup.Item>
                  );
                })}
            </ScrollView>
          </YGroup>
        )}
      </View>
    </YStack>
  );
}
