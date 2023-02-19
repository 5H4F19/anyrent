import React from 'react'
import { Alert, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import { Image } from 'react-native'
import { Button } from '../../components/button'
import { TextInput } from '../../components/textInput'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, database } from '../../../config/firebase'
import { ErrorText } from '../../components/warning'
import { Mode, useToasts } from '../../utils/useToasts'
import { doc, setDoc } from 'firebase/firestore'

const schema = yup.object({
  username: yup.string().required(),
  email: yup.string().email().required(),
  phone: yup.number().min(11).required(),
  password: yup
    .string()
    .required('Please Enter your password')
  // .matches(
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
  //     "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
  // ),
})


export const Signup = ({ navigation }: { navigation: any }) => {
  const toast = useToasts(Mode.dark, 5000)

  const _handleSubmit = async (values: any) => {
    const { email, username, password, phone } = values
    try {
      toast.dismiss()
      toast.loading("Loggin in ...")
      const res = await createUserWithEmailAndPassword(auth, email, password)
      await setDoc(doc(database, "users", res.user.uid), {
        uid: res.user.uid,
        email,
        username,
        phone
      })
      toast.dismiss()
      toast.success("Sign up succesful")
      navigation.navigate('Login')
    } catch (error: any) {
      toast.dismiss()
      toast.error(error?.message)
    }
  }

  const formik = useFormik({
    initialValues: { username: "", email: "", phone: "", password: "" },
    validationSchema: schema,
    onSubmit: async (values, action) => {
      console.log("Something")
      await _handleSubmit(values)
      action.resetForm()
    }

  })

  return (
    <SafeAreaView className='flex-1 bg-white justify-center space-y-2'>
      <View className='flex-1 bg-white justify-center px-10 space-y-2'>
        <Logo />
        <TextInput
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          placeholder='Ali hashem'
        />
        {formik.errors.username && <ErrorText>{formik.errors.username}</ErrorText>}

        <TextInput
          value={formik.values.email}
          onChangeText={formik.handleChange('email')}
          placeholder='example@gmail.com'
          keyboardType='email-address' />
        {formik.errors.email && <ErrorText>{formik.errors.email}</ErrorText>}

        <TextInput
          value={formik.values.phone}
          onChangeText={formik.handleChange('phone')}
          placeholder='8801700000000'
          keyboardType='email-address' />
        {formik.errors.phone && <ErrorText>{formik.errors.phone}</ErrorText>}

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
        <Signin nav={navigation} />
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
      <Text className='text-3xl font-bold text-black'>Sign up</Text>
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


export const Signin = ({ nav }: { nav: any }) => {
  return (
    <TouchableOpacity className='flex flex-row items-center' onPress={() => nav.navigate('Login')}>
      <Text className='text-black'>Have an account?</Text>
      <Text className='text-primary my-1 mx-3'>Sign up</Text>
    </TouchableOpacity>
  )
}

