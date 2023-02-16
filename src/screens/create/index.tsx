import React, { useState } from 'react'
import { Alert, ScrollView, TouchableOpacity, View, Image } from 'react-native'
import { Text } from 'react-native'
import { Container, Heading } from '../../components'
import { Button } from '../../components/button'
import { Search } from '../../components/search'
import { TextInput } from '../../components/textInput'
import { family } from '../home'
import { Upload } from '../upload'

export const Create = () => {

  const [type, setType] = useState<string>(family.Both)
  const [photos, setPhotos] = useState<any>(null)

  return (
    <Container>
      <Heading>Create</Heading>
      <ScrollView className='px-7 space-y-2'>
        <TermsPolicy />
        {/*
           House title 
        */}
        <TextInput placeholder='House title eg. Ali House' />
        {/*
           No of rooms
          className="flex-1 flex-row py-0 my-0 justify-center items-center"
        */}
        <TextInput placeholder='No of rooms eg. 3' keyboardType='phone-pad' />
        {/*
           No of price
        */}
        <TextInput placeholder='Rent price eg. 1000' keyboardType='phone-pad' />
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
          placeholder='House policies'
          multiline={true}
          className="h-52"
          style={{ textAlignVertical: 'top', alignItems: 'flex-start' }}
        />
        {/*
           Upload photos for gallery
        */}
        <Upload photos={photos} setPhotos={setPhotos} />
        {/*
           Action buttons
        */}
        <View className='flex-row'>
          <Button color={"outline"}>Discard</Button>
          <View className='w-2' />
          <Button className=''>Save</Button>
        </View>
        <Button className='mt-0'>Post</Button>
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
