import React from 'react'
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native'
import { Button } from '../../components/button'
import { TextInput } from '../../components/textInput'

export const Login = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaView className='flex-1 bg-white justify-center px-10 space-y-2'>
      <Logo />
      <TextInput placeholder='example@gmail.com' keyboardType='email-address' />
      <TextInput placeholder='*********' secureTextEntry={true} />
      <Button className='my-2'>Log in</Button>
      <Forgotpassword nav={navigation} />
      <Signup nav={navigation} />
    </SafeAreaView>
  )
}

const Logo = () => {
  return (
    <View className='flex items-center my-4'>
      <Image
        source={require('../../assets/house/home.png')}
        className="h-20 w-20 my-4"
        style={{ tintColor: '#32C7FF' }}
      />
      <Text className='text-3xl font-bold text-black'>Log in</Text>
    </View>
  )
}

const Forgotpassword = ({ nav }: { nav: any }) => {
  return (
    <TouchableOpacity onPress={() => nav.navigate('Forgotpassword')}>
      <Text className='text-primary my-3'>Forget your password?</Text>
    </TouchableOpacity>
  )
}


export const Signup = ({ nav }: { nav: any }) => {
  return (
    <TouchableOpacity className='flex flex-row items-center' onPress={() => nav.navigate('Forgotpassword')}>
      <Text className='text-black'>Have an account?</Text>
      <Text className='text-primary my-1 mx-3'>Sign up</Text>
    </TouchableOpacity>
  )
}

