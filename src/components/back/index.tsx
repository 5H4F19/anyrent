import React from 'react'
import { Image, Platform, SafeAreaView, StatusBar, TouchableOpacity, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export const Back = ({ navigation, className }: { navigation: any, className?: string }) => {
  const area = useSafeAreaInsets()
  return (
    <TouchableOpacity
      style={{ top: Platform.OS === 'android' ? StatusBar.currentHeight : area.top, elevation: 5 }} className={`absolute rounded-lg p-2 bg-white mx-2 ${className}`}
      onPress={() => navigation.goBack()}>
      <Image
        source={require('../../assets/arrow-left.png')}
        className="w-5 h-5 opacity-70" style={{ tintColor: 'black' }} />
    </TouchableOpacity >
  )
}
