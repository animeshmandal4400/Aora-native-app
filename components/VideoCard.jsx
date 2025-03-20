import { View, Text, Image,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { icons, images } from "../constants"
const VideoCard = ({video: {title, thumbnail, video, creator:{ username, avatar}}}) => {

    const [play, setPlay] = useState(false)

  return (
    <View className="flex-col items-center px-4 mb-14">
        <View className="flex-row gap-3 items-start ">
            <View className="justify-center items-center flex-row flex-1">
                <View className="w-[46px] h-[46px] rounded-lg border border-secondary justify-center items_center p-0.5 ">
                    <Image
                        source={{uri: avatar}}
                        className="w-full h-full rounded-lg"
                        resizeMode='cover'
                    />
                
                </View>
                <View className=" flex-1 justify-center ml-4">
                    <Text className=" font-psemibold text-lg text-white ">
                        {title}
                    </Text>
                    <Text className=" font-pmedium text-xs text-gray-200 ">
                        {username}
                    </Text>
                </View>
                <View className="pt-2">
                <Image
                    source={icons.menu}
                    className="w-5 h-5 flex"
                    resizeMode='contain'
                />
                </View>
            </View>
            
        </View>
        {
            play ? (
                <Text>
                    playing
                </Text>
            ) : (
                <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => setPlay(false)}
                className="w-full h-60 rounded-3xl mt-3 relative justify-center items-center">
                    <Image
                        source={{uri:thumbnail}}
                        className="w-full h-full rounded-xl mt-3"
                        resizeMode='cover'
                    />
                    <Image
                        source={icons.play}
                        className=" w-8 h-8 absolute"
                    />
                </TouchableOpacity>
            )
        }
    </View>
  )
}

export default VideoCard