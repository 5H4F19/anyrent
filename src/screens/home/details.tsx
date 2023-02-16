import { Image, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native"
import { Container } from "../../components"
import { Back } from "../../components/back"
import { Slider } from "../../components/slider"
import { Map, MapMini } from "./map"
import { useSafeAreaInsets } from 'react-native-safe-area-context'
const imageList = [
  require('../../assets/house/1.jpg'),
  require('../../assets/house/1.jpg'),
]

export const Details = (props: any) => {
  const area = useSafeAreaInsets()

  const renderItem = ({ item, index }: any) => {
    return (<Image source={item.source} />)
  }
  console.log("length", area)
  return (
    <View className="flex-1 items-center">
      <StatusBar translucent={true} backgroundColor={'transparent'} />
      <ScrollView className="mb-20">
        <Slider />
        <Back className="absolute" navigation={props.navigation} />
        <View className="relative mx-auto rounded-2xl font-['Inter-Regular'] mb-5" style={{ width: '95%' }} >
          <View className="flex flex-row p-4 h-[110px] justify-between">
            <View className="flex justify-between">
              <View className="">
                <Text className="text-xl font-normal text-black tracking-tight font-['Inter-Bold']">Ali house, Rangpur</Text>
                <Text className="text-sm text-gray-600 capitalize font-['Inter-Regular']">3 bedroom</Text>
              </View>
              <View className="flex flex-row items-center gap-1">
                <View className="flex justify-center items-center w-2 overflow-hidden">
                  <Image source={require('../../assets/taka.png')} className="h-6 w-6" style={{ tintColor: 'black' }} />
                </View>
                <Text className="text-sm text-gray-800 capitalize font-['Inter-Bold']">3,455</Text>
              </View>
            </View>
            <View className="flex justify-between">
              <View className="font-['Inter-SemiBold'] text-black text-xs p-1 px-2 bg-gray-200 rounded-xl">
                <Text className="font-['Inter-SemiBold'] text-black text-xs bg-gray-200 rounded-xl">Family</Text>
              </View>
            </View>
          </View>
          <View className="mx-4">
            <Text className="text-gray-600">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Numquam sapiente facilis dolor aliquam excepturi beatae corporis? Distinctio similique magni alias.</Text>
          </View>
          <View className="">
            <Text className="my-4 mx-4 text-gray-800 font-['Inter-SemiBold'] text-xl">Directions</Text>
            <MapMini onPress={() => props.navigation.navigate('Map')} />
          </View>
          <View className="">
            <Text className="my-4 mx-4 text-gray-800 font-['Inter-SemiBold'] text-xl">House policies</Text>
            <Text className="text-gray-500 mx-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae magni commodi ad laborum recusandae atque id a. Itaque praesentium aliquam commodi maxime ipsam. Dolorum minima similique distinctio illum iusto deleniti cupiditate blanditiis, sunt cum placeat. Voluptatem earum, ipsam fugit illo similique ut amet iusto, quisquam temporibus odio animi suscipit. Quidem!
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Buttons Bottom */}
      <View className="absolute bottom-0 py-4 flex flex-row justify-around w-10/12">
        <TouchableOpacity className="flex-1">
          <View className="text-primary font-['Inter-Bold'] border border-primary text-center p-3 rounded-lg w-full my-2">
            <Text className="text-primary font-['Inter-Bold'] text-center rounded-lg w-full">Call</Text>
          </View>
        </TouchableOpacity>
        <View className="w-5" />
        <TouchableOpacity className="flex-1">
          <View className="text-white font-['Inter-Bold'] bg-primary text-center p-3 rounded-lg w-full my-2">
            <Text className="text-white font-['Inter-Bold'] text-center rounded-lg w-full">Chat</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  )
}
