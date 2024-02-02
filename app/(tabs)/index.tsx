import { View, Input, Spinner, Text, YStack, ScrollView } from 'tamagui'
import { useEffect, useState } from 'react'

type Release = {
  name: string
  browser_download_url: string
}

export default function TabOneScreen() {
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const [releases, setReleases] = useState<Release[]>([])
  useEffect(() => {
    search && console.log('search', search)
  }, [search])

  useEffect(() => {
    async function fetchReleases() {
      setLoading(true)
      const response = await fetch('https://api.github.com/repos/Revanced-APKs/build-apps/releases/latest')
      const data = await response.json()
      data.assets && setReleases(data.assets)
      setLoading(false)
    }
    fetchReleases()
  }, [])
  return (
    <>
    <View flex={1} alignItems="center">
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
    <View flex={1} alignItems="center">
      {loading ? 
        <Spinner size='large' /> 
        : 
        <>
          <ScrollView>
          {releases.map((release, index) => {
            return (
                  <View key={index}>
                    <Text fontSize={20}>{release.name}</Text>
                    <Text fontSize={16}>{release.browser_download_url}</Text>
                  </View>
                  )
                })
          }
          </ScrollView>
        </>
      }
    </View>
    </>
  )
}
