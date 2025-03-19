import { View, Text, ScrollView, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Image } from 'react-native'
import { images } from '../../constants'
import { StatusBar } from 'expo-status-bar'
import CustomFormField from '../../components/CustomFormField'
import { useState } from 'react'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { getCurrentUser, signIn } from '../../libs/appwrite'
import {useGlobalContext} from '../../context/GlobalProvider'

const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
    const [ form, setForm ] = useState({
            email:"",
            password:""
        })

    const [isSubmtting, setIsSubmitting] = useState(false)

        const submit = async() =>{
          if( !form.email || !form.password){
            Alert.alert("Error", 'Please fill all the fields')
            return; 
          }
          try {
            await signIn( form.email, form.password)
            const result = await getCurrentUser()
            setUser(result)
            setIsLogged(true)
            Alert.alert("Success", error.message.replace(/^AppwriteException:\s*/, "User signed in successfully"));
            router.replace('/home')
          } catch (error) {
            Alert.alert("Error", error.message.replace(/^AppwriteException:\s*/, ""));
          }finally{
            setIsSubmitting(false)
          }
        }
      const clickLogIn = () =>{
        Alert.alert("Alert","Chicked");
      }   

  return (
    <SafeAreaView className=' bg-primary h-full'>
      <ScrollView>
        <View className=' justify-center items-start w-full min-h-[83vh] px-4'>
          <Image
            source={images.logo}
            className=' h-[84px] w-[130px]'
            resizeMode='contain'
          />
          <Text className=' font-psemibold text-white text-[22px] mt-10 '>
            Sign in
          </Text>

          <CustomFormField
            title="Email"
            value={form.email}
            handleChangeText={(e)=>setForm({...form, 
                email: e
            })}
            otherStyle = "mt-7"
            keyboardType = "email-address" 
          />
          <CustomFormField
            title="Password"
            value={form.password}
            handleChangeText={(e)=>setForm({...form, 
                password: e
            })}
            otherStyle = "mt-7"
            keyboardType = "password" 
          />
          <Text className=" w-full text-right text-[#CDCDE0] mt-5 ">
            forget Password
          </Text>

          <CustomButton
          title="Log in"
          handlePress= {submit}
          isLoading={isSubmtting}
          containerStyle=" w-full mt-7"
          textStyle=" font-psemibold"
          />
          
          <View className=" justify-center w-full pt-5 flex-row gap-2">
          <Text className=" text-sm text-[#CDCDE0]">
            Don’t have an account
          </Text>
            <Link href="./sign-up" className=" text-secondary-200 ">
               SignUp
            </Link>
          </View>
          </View>
        </ScrollView>
        <StatusBar backgroundColor='#161622'
        style='light'
      />
    </SafeAreaView>
  )
}

export default SignIn