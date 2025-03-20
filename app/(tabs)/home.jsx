import { View, Text, FlatList, Image, RefreshControl } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from '../../constants'
import CustomSearchInput from '../../components/CustomSearchInput'
import Trending from '../../components/Trending'
import EmptyState from '../../components/EmptyState'
import { useState } from 'react'
import {getAllPosts, getLatestPosts} from '../../libs/appwrite'
import useAppwrite from '../../libs/useAppwrite'
import VideoCard from '../../components/VideoCard'

const Home = () => {
  const {data: posts, reFetch} = useAppwrite(getAllPosts);
  const {data: latestPosts} = useAppwrite(getLatestPosts);

  const [refreshing, setRefreshing] = useState(false)
  const onRefresh = async () => {
    setRefreshing(true)
    await reFetch()
    setRefreshing(false)
  }

  console.log(posts)

  return (
    <SafeAreaView className=" bg-primary h-full">
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({item}) => (
          <VideoCard video={item}/>
        )}
        ListHeaderComponent={() => (
          <View className=" my-6 px-4 space-y-6">
            <View className=" justify-between items-start flex-row mb-6">
              <View>
                <Text className=" font-pmedium text-sm text-gray-100">
                   Welcome Back
                </Text>
                <Text className=" text-2xl font-psemibold text-white">
                    ANIMESH
                </Text>
              </View>
              <View className=" mt-1.5">
                <Image
                  source={images.logoSmall}
                  className=" w-10 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>
            <CustomSearchInput/>

            <View className=" w-full flex-1 pt-5 pb-8">
              <Text className=" text-gray-100 font-pmedium mb-4">
              Trending Videos
              </Text>
              <Trending
                posts={latestPosts ?? []}
              />
            </View>
          </View>
        )}
        ListEmptyComponent={() => (
          <EmptyState
            subtitle="Be the first one to upload a video"
            title="No Videos Found"
          />
        )}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
      />
    </SafeAreaView>
  )
}

export default Home