import { View, Text,Image } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from '../components/CustomButton'
import { router } from 'expo-router'
const EmptyState = ({ title, subtitle}) => {

  return (
    <View className="justify-center items-center px-4">
      <Image 
        source={images.empty}
        className=" w-[270px] h-[217px]"
        resizeMode='contain'
      />
      <Text className=" text-center font-pmedium text-sm text-gray-100 mt-2">{subtitle}</Text>
      <Text className=" text-center font-psemibold text-xl text-white mt-2">{title}</Text>
      <CustomButton
        title="Create Video"
        containerStyle="w-full m-4"
        handlePress={() => router.push("/create")}
      />
    </View>
  )
}

export default EmptyState