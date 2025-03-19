import { Link, Redirect, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, Text, View,Image, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {images} from "../constants"
import CustomButton from "../components/CustomButton"
import { useGlobalContext } from '../context/GlobalProvider';

export default function App() {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;
  
  return (
    <SafeAreaView className=' bg-primary h-full'>
      <ScrollView contentContainerStyle={{height:"100%"}}>
        <View className=' justify-center items-center w-full h-full px-4'>
          <Image
            source={images.logo}
            className=' h-[84px] w-[130px]'
            resizeMode='contain'
          />
          <Image
            source={images.cards}
            className=' w-[375px] h-[298px]'
            resizeMode='contain'
          />
          <View className='relative mt-5'>
          <Text className=' font-pextrabold text-[30px] text-white text-center'>
            Discover Endless Possibilities with{" "}
            <Text className=' text-secondary-200 '>Aora</Text>
          </Text>
          <Image
            source={images.path}
            resizeMode='contain'
            className='w-[136px] h-[15px] absolute -bottom-[0.5] -right-8'
          />
          </View>
          <Text className=' font-pmedium text-[14px] text-[#CDCDE0] mt-5 text-center' >
          Where Creativity Meets Innovation: Embark on a Journey of Limitless Exploration with Aora          </Text>

          <CustomButton
          title="Continue With Email"
          handlePress={()=>{ router.push ('/sign-in')}}
          containerStyle=" w-full mt-7"
          textStyle=" font-psemibold"
          />
        </View>


      </ScrollView>
      <StatusBar backgroundColor='#161622'
        style='light'
      />
    </SafeAreaView>
  );
}
