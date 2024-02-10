import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshCw } from "@tamagui/lucide-icons";
import { useEffect, useState } from "react";
import { Alert } from "react-native";
import {
  Button,
  Input,
  Spinner,
  Text,
  View,
  XStack,
  YStack
} from "tamagui";
import ListAppCards from "../../components/ListAppCards";
import { PrevancedFilterApp, PrevancedFilterApps } from "../../types/prevanced";
import { Release } from "../../types/release";
import { checkForUpdate, showToast } from "../../utils";
import { prepareLoading } from "../../utils/load";
import { fetchReleases } from "../../utils/release";

export default function TabOneScreen() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [releases, setReleases] = useState<Release>();

  const withLoading = async (asyncFunction: () => Promise<void>) =>
    prepareLoading(asyncFunction, setLoading);

  const fetchAndSetReleases = async () => {
    try {
      let fetchedReleases = await fetchReleases();
      // apply filterApps
      const stringPrevancedFilterApps = await AsyncStorage.getItem(
        "prevancedFilterApps"
      );
      const prevancedFilterApps: PrevancedFilterApps = JSON.parse(
        stringPrevancedFilterApps || "{}"
      );
      if (prevancedFilterApps && prevancedFilterApps.filterApps) {
        let filterApps = prevancedFilterApps.filterApps;
        // add apps which are not in the list
        const newApps = fetchedReleases.assets.filter((release) => {
          return !filterApps.some(
            (filterApp) => filterApp.name === release.name
          );
        });
        newApps &&
          filterApps.push(
            ...newApps.map((newApp) => {
              return {
                name: newApp.name,
                checked: true,
              };
            })
          );
        await AsyncStorage.setItem(
          "prevancedFilterApps",
          JSON.stringify({ filterApps: filterApps })
        );
        const filteredReleases = fetchedReleases.assets.filter((release) => {
          return filterApps.some(
            (filterApp) => filterApp.name === release.name && filterApp.checked
          );
        });
        fetchedReleases = { ...fetchedReleases, assets: filteredReleases };
      } else {
        const filterApps: PrevancedFilterApp[] = fetchedReleases.assets.map(
          (release) => {
            return {
              name: release.name,
              checked: true,
            };
          }
        );
        await AsyncStorage.setItem(
          "prevancedFilterApps",
          JSON.stringify({ filterApps: filterApps.reverse() })
        );
      }
      setReleases(fetchedReleases);
    } catch (error: unknown) {
      Alert.alert("Error ⛔", String(error));
    }
  };

  useEffect(() => {
    withLoading(fetchAndSetReleases);
    checkForUpdate().catch((error) => showToast(String(error)));
  }, []);

  return (
    <YStack padding="$2" width="100%" paddingBottom="$8">
      {loading ? (
        <View
          alignItems="center"
          alignSelf="center"
          justifyContent="center"
          height="100%"
          width="100%"
        >
          <Spinner size="large" color="$blue10" scaleX={1.5} scaleY={1.5} />
        </View>
      ) : (
        <>
          <XStack gap="$2" alignItems="center" alignSelf="center" width="100%" pb="$2">
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
              size="$3"
              borderRadius="$12"
              bordered
              accessibilityLabel="Refresh"
              circular
              mr="$3"
              scaleIcon={1.5}
              icon={RefreshCw}
            />
          </XStack>
          {releases && releases.assets && (
            <ListAppCards releases={releases} search={search} />
          )}
        </>
      )}
    </YStack>
  );
}
