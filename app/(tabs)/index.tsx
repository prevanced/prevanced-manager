import { RefreshCcwDot } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { useEffect, useState } from "react";
import { Button, Input, Spinner, View, YStack } from "tamagui";
import ListAppCards from "../../components/ListAppCards";
import { Release } from "../../types/release";
import { prepareLoading } from "../../utils/load";
import { fetchReleases } from "../../utils/release";

export default function TabOneScreen() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSearchVisible, setIsSearchVisible] = useState(true);
  const [releases, setReleases] = useState<Release[]>([]);
  const toast = useToastController();

  const withLoading = async (asyncFunction: () => Promise<Release[]>) =>
    prepareLoading(asyncFunction, setLoading);

  const fetchAndSetReleases = async () => {
    try {
      const fetchedReleases = await withLoading(fetchReleases);
      setReleases(fetchedReleases);
    } catch (error: unknown) {
      toast.show(String(error), {
        native: true,
      });
    }
  };

  useEffect(() => {
    fetchAndSetReleases();
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
            {isSearchVisible && <Input
              placeholder="Search"
              width="100%"
              paddingStart="$6"
              paddingHorizontal="$4"
              paddingVertical="$3"
              borderRadius="$12"
              borderWidth="$1"
              onChangeText={setSearch}
              value={search}
            />}
          <View alignItems="center">
            <ListAppCards releases={releases} search={search} />
          </View>
          <Button
            theme="blue_active"
            onPress={fetchAndSetReleases}
            position="absolute"
            bottom="8%"
            right="5%"
            padding="$3"
            size="$5"
            borderRadius="$12"
          >
            <RefreshCcwDot color="white" />
          </Button>
        </>
      )}
    </YStack>
  );
}
