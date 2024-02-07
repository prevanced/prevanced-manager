import { RefreshCcwDot } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { Button, Input, Spinner, View, XStack, YStack, Text } from "tamagui";
import ListAppCards from "../../components/ListAppCards";
import { Release } from "../../types/release";
import { prepareLoading } from "../../utils/load";
import { fetchReleases } from "../../utils/release";
import { checkForUpdate, showToast } from "../../utils";
import { Alert } from "react-native";
import {PermissionsAndroid} from 'react-native';

export default function TabOneScreen() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [releases, setReleases] = useState<Release>();

  const withLoading = async (asyncFunction: () => Promise<Release>) =>
    prepareLoading(asyncFunction, setLoading);

  const fetchAndSetReleases = async () => {
    try {
      const fetchedReleases = await withLoading(fetchReleases);
      setReleases(fetchedReleases);
    } catch (error: unknown) {
      Alert.alert("Error ⛔", String(error));
    }
  };

  useEffect(() => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);
    fetchAndSetReleases();
    checkForUpdate().catch((error) => showToast(String(error)));
  }, []);

  return (
    <YStack padding="$2">
      {loading ? (
        <View
          alignItems="center"
          alignSelf="center"
          justifyContent="center"
          height="100$"
          width="100%"
        >
          <Spinner size="large" color="$blue11" />
        </View>
      ) : (
        <>
          <XStack gap="$2" alignItems="center" alignSelf="center" width="100%">
            <Input
              placeholder="Search"
              paddingStart="$6"
              width="85%"
              size="$3"
              paddingHorizontal="$4"
              paddingVertical="$2"
              borderRadius="$12"
              onChangeText={setSearch}
              value={search}
            />
            <Button
              onPress={fetchAndSetReleases}
              width="13%"
              alignSelf="center"
              padding="$2"
              size="$4"
              borderRadius="$12"
              bordered
              accessibilityLabel="Refresh"
              mr="$3"
            >
              <RefreshCcwDot size="$1" />
            </Button>
          </XStack>
          {
            releases && <XStack p="$2" mt="$2" mb="$1.5" gap="$2" justifyContent="center" alignContent="center" width="100%" overflow="hidden" borderRadius="$12" backgroundColor="$blue1" theme="blue_alt1" >
              <Text>Release {releases.name}</Text>
              <Text>on {new Date(releases.published_at).toLocaleDateString()}</Text>
            </XStack>
          }
          <View alignItems="center">
            {releases && releases.assets && <ListAppCards releases={releases.assets} search={search} />}
          </View>
        </>
      )}
    </YStack>
  );
}
