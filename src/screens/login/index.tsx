import React from 'react'
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native'
import { Button } from '../../components/button'
import { TextInput } from '../../components/textInput'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../config/firebase'
import { ErrorText } from '../../components/warning'
import { Mode, useToasts } from '../../utils/useToasts'
import AsyncStorage from '@react-native-async-storage/async-storage'

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup
    .string()
    .required('Please Enter your password')
  // .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  // ),
})


export const Login = ({ navigation }: { navigation: any }) => {
  const toast = useToasts(Mode.dark)

  const _handleSubmit = async (email: string, password: string) => {
    try {
      toast.dismiss()
      toast.loading("Loggin in ...")
      const res = await signInWithEmailAndPassword(auth, email, password)
      await AsyncStorage.setItem('userinfo', JSON.stringify(res))
      toast.dismiss()
      toast.success("Log in successfull")
      navigation.navigate('Home')
    } catch (error: any) {
      toast.dismiss()
      toast.error(error?.message)
    }
  }

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values, action) => {
      await _handleSubmit(values.email, values.password)
      action.resetForm()
    }

  })

  return (
    <SafeAreaView className='flex-1 bg-white justify-center space-y-2'>
      <View className='flex-1 bg-white justify-center px-10 space-y-2'>
        <Logo />
        <TextInput
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          placeholder='example@gmail.com'
          keyboardType='email-address' />
        {formik.errors.email && <ErrorText>{formik.errors.email}</ErrorText>}

        <TextInput
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          placeholder='*********'
          secureTextEntry={true} />
        <ErrorText>{formik.errors.password}</ErrorText>

        <Button
          onPress={formik.handleSubmit}
          className='my-2'>Log in</Button>

        <Forgotpassword nav={navigation} />
        <Signup nav={navigation} />
      </View>
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
    <TouchableOpacity className='flex flex-row items-center' onPress={() => nav.navigate('Signup')}>
      <Text className='text-black'>Have an account?</Text>
      <Text className='text-primary my-1 mx-3'>Sign up</Text>
    </TouchableOpacity>
  )
}

