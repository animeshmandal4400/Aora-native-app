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
import { createUser } from '../../libs/appwrite'
import {useGlobalContext} from '../../context/GlobalProvider'

const SignUp = () => {
  const {setUser, setIsLogged} = useGlobalContext();
    const [ form, setForm ] = useState({
        userName:"",
        email:"",
        password:""
    })

    const [isSubmtting, setIsSubmitting] = useState(false)
    const submit = async() => {
      if(!form.userName || !form.email || !form.password){
        Alert.alert("Error", 'Please fill all the fields')
        return
      }
      setIsSubmitting(true)
      try {
        const result = await createUser( form.email, form.password, form.userName)
        setUser(result)
        setIsLogged(true)
        router.replace('/home')
      } catch (error) {
        Alert.alert("Error", error.message.replace(/^AppwriteException:\s*/, ""));
      }finally{
        setIsSubmitting(false)
      }
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
            Sign Up
          </Text>

          <CustomFormField
            title="Username"
            value={form.userName}
            handleChangeText={(e)=>setForm({...form, 
                userName: e
            })}
            otherStyle = "mt-7"
          />
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
          <CustomButton
          title="Sign Up"
          handlePress={submit}
          isLoading={isSubmtting}
          containerStyle=" w-full mt-7"
          textStyle="font-psemibold"
          />
          
          <View className=" justify-center w-full pt-5 flex-row gap-2">
          <Text className=" text-sm text-[#CDCDE0]">
            Already have an account?
          </Text>
            <Link href="./sign-in" className=" text-secondary-200 ">
               SignIn
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

export default SignUp