import React, { useContext, useState } from 'react'
import { Alert, ScrollView, TouchableOpacity, View, Image, Platform } from 'react-native'
import { Text } from 'react-native'
import { Container, Heading } from '../../components'
import { Button } from '../../components/button'
import { Search } from '../../components/search'
import { TextInput } from '../../components/textInput'
import { family } from '../home'
import { Upload } from '../upload'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { AuthContext } from '../../context/authContext'
import { database, storage } from '../../../config/firebase'
import { Asset } from 'react-native-image-picker'
import { getDownloadURL, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage'
import { ProgressBar } from '../../components/progressbar'
import { doc, setDoc } from 'firebase/firestore'
import { Mode, useToasts } from '../../utils/useToasts'
import { ErrorText } from '../../components/warning'
import { uploadPhotos } from '../../utils/uploadPhotos'

const schema = yup.object({
  title: yup.string().required(),
  room: yup.number().required(),
  price: yup.number().required(),
  policy: yup.string(),
})


export const Create = () => {

  const [type, setType] = useState<string>(family.Both)
  const [photos, setPhotos] = useState<any>(null)
  const [progress, setprogress] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(false)

  const { currentUser } = useContext(AuthContext)

  const toast = useToasts(Mode.dark)


  const formik = useFormik({
    initialValues: { title: "", room: 0, price: 0, policy: "" },
    validationSchema: schema,
    onSubmit: async (values, action) => {
      setLoading(true)
      const { title, room, price, policy } = values
      await _handleSubmit(title, room, price, policy, type as family)
      action.resetForm()
      setLoading(false)
    }
  })

  const _handleSubmit = async (title: string, room: number, price: number, policy: string, type: family) => {
    try {
      toast.loading("Creating your post ...")
      if (photos && photos.length > 0) {
        const urls = await uploadPhotos(photos, progress, setprogress);
        console.log("photos", urls)
        if (urls) {
          await setDoc(doc(database, 'posts', Date.now() + currentUser.uid), {
            user: currentUser.uid,
            title,
            room,
            price,
            policy,
            type,
            urls
          })

        }
      }
      toast.success("Post created successfully")
    } catch (error: any) {
      toast.error(error?.message)
    }

  }


  return (
    <Container>
      <Heading>Create post</Heading>
      <ScrollView className='px-7 space-y-2'>
        <TermsPolicy />
        {/*
           House title 
        */}
        <TextInput
          value={formik.values.title}
          onChangeText={formik.handleChange('title')}
          placeholder='House title eg. Ali House' />
        <ErrorText>{formik.errors.title}</ErrorText>
        {/*
           No of rooms
          className="flex-1 flex-row py-0 my-0 justify-center items-center"
        */}
        <TextInput
          value={String(formik.values.room)}
          onChangeText={formik.handleChange('room')}
          placeholder='No of rooms eg. 3' keyboardType='phone-pad' />
        <ErrorText>{formik.errors.room}</ErrorText>
        {/*
           No of price
        */}
        <TextInput
          value={String(formik.values.price)}
          onChangeText={formik.handleChange('price')}
          placeholder='Rent price eg. 1000' keyboardType='phone-pad' />
        <ErrorText>{formik.errors.price}</ErrorText>
        {/*
           No of rooms
        */}
        <Search
          items={Object.values(family)}
          selected={type}
          onSelect={setType}
        />
        {/*
           House policies
        */}
        <TextInput
          value={formik.values.policy}
          onChangeText={formik.handleChange('policy')}
          placeholder='House policies'
          multiline={true}
          className="h-52"
          style={{ textAlignVertical: 'top', alignItems: 'flex-start' }}
        />
        <ErrorText>{formik.errors.policy}</ErrorText>
        {/*
           Upload photos for gallery
        */}
        <Upload photos={photos} setPhotos={setPhotos} />


        {loading && <ProgressBar percentage={progress} />}

        {/*
           Action buttons
        */}
        <View className='flex-row'>
          <Button color={"outline"}>Discard</Button>
          <View className='w-2' />
          <Button className=''>Save</Button>
        </View>
        <Button disabled={loading} onPress={async (e) => await formik.handleSubmit()}>Post</Button>
        <View className='h-20' />
      </ScrollView>
    </Container>
  )
}
const TermsPolicy = () => {
  return (
    <Text className='text-black text-xs mb-6'>
      Welcome, <Text className='font-bold'>Shafiq.</Text>
      &nbsp;You can ad post of your house from here but before please take a look at the
      <Text className='font-medium text-primary' onPress={() => Alert.alert("hello")}>&nbsp;Terms & Policy</Text>
    </Text>
  )
}
