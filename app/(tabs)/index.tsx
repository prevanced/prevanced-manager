import AsyncStorage from "@react-native-async-storage/async-storage";
import { RefreshCcwDot } from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { useEffect, useState } from "react";
import { Button, Input, Spinner, View, YStack } from "tamagui";
import ListAppCards from "../../components/ListAppCards";
import { Release } from "../../types/release";
import { fetchReleases } from "../../utils/release";

export default function TabOneScreen() {
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [releases, setReleases] = useState<Release[]>([]);
  const toast = useToastController();

  useEffect(() => {
    async function initRelease() {
      setLoading(true);
      await fetchReleases({ setReleases, toast });
      setLoading(false);
    }
    initRelease();
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
            <ListAppCards releases={releases} search={search} />
          </View>
          <Button
            theme="blue_active"
            onPress={() => {
              setLoading(true);
              Promise.all([fetchReleases({ setReleases, toast })]).then(() => {
                setLoading(false);
                console.log("Refreshed");
              });
            }}
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
