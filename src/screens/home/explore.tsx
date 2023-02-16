import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useEffect, useRef, useState } from "react";
import { FlatList, Image, TextInput, TouchableOpacity, View } from "react-native"
import { Container, SearchBar } from "../../components"
import { Card } from "../../components/card";
import BottomSheet, { BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { Text } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { Search } from "../../components/search";

export enum family {
  Family = 'Family',
  Bachelor = 'Bachelor',
  Both = 'Both'
}

const cards = [
  {
    uri: require('../../assets/house/4.jpg'),
    type: family.Family
  },
  {
    uri: require('../../assets/house/2.jpg'),
    type: family.Bachelor
  },
  {
    uri: require('../../assets/house/3.jpg'),
    type: family.Both
  },
  {
    uri: require('../../assets/house/1.jpg'),
    type: family.Family
  },
  {
    uri: require('../../assets/house/5.jpg'),
    type: family.Bachelor
  },
]
const familyTypes = ['Family', 'Bachelor', 'Both']

// list of divisions of bangladesh
const category = ['Dhaka', 'Chittagong', 'Khulna', 'Barisal', 'Rajshahi', 'Rangpur', 'Sylhet', 'Mymensingh']
const subCategory = {
  'Barisal': ['Barguna', 'Barisal', 'Bhola', 'Jhalokati', 'Patuakhali', 'Pirojpur'],
  'Chittagong': ['Bandarban', 'Brahmanbaria', 'Chandpur', 'Chittagong', 'Comilla', 'Cox\'s Bazar', 'Feni', 'Khagrachhari', 'Lakshmipur', 'Noakhali', 'Rangamati'],
  'Dhaka': ['Dhaka', 'Faridpur', 'Gazipur', 'Gopalganj', 'Kishoreganj', 'Madaripur', 'Manikganj', 'Munshiganj', 'Narayanganj', 'Narsingdi', 'Rajbari', 'Shariatpur', 'Tangail'],
  'Khulna': ['Bagerhat', 'Chuadanga', 'Jessore', 'Jhenaidah', 'Khulna', 'Kushtia', 'Magura', 'Meherpur', 'Narail', 'Satkhira'],
  'Mymensingh': ['Jamalpur', 'Mymensingh', 'Netrokona', 'Sherpur'],
  'Rajshahi': ['Bogra', 'Joypurhat', 'Naogaon', 'Natore', 'Chapainawabganj', 'Pabna', 'Rajshahi', 'Sirajganj'],
  'Rangpur': ['Dinajpur', 'Gaibandha', 'Kurigram', 'Lalmonirhat', 'Nilphamari', 'Panchagarh', 'Rangpur', 'Thakurgaon'],
  'Sylhet': ['Habiganj', 'Moulvibazar', 'Sunamganj', 'Sylhet']
}
export const Explore = (props: NativeStackScreenProps<any, any>) => {

  const sheetRef = useRef<BottomSheet>(null)
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [family, setFamily] = useState<string>(familyTypes[2])

  const [cat, setcat] = useState<string>(category[0])
  const [subCat, setSubCat] = useState<string>(subCategory[cat as keyof typeof subCategory][0])

  //cat as keyof typeof subCategory
  const snaps = ['70']

  const renderCard = ({ item }: { item: any }) => {
    return <Card key={item} props={props} item={item} />
  }

  const upSheet = () => {
    sheetRef.current?.snapToPosition('90%')
  }

  useEffect(() => {
    setSubCat(subCategory[cat as keyof typeof subCategory][0])
  }, [cat, setSubCat])
  console.log(cat, subCat)
  return (
    <Container>
      <SearchBar setIsOpen={setIsOpen} />
      <FlatList
        data={cards}
        renderItem={renderCard}
        className="flex flex-col"
        initialNumToRender={3}
      />
      {isOpen ? (
        <GestureHandlerRootView className="absolute top-0 bottom-0 left-0 right-0 bg-gray-300/50">
          <TouchableOpacity onPress={() => setIsOpen(false)} className="absolute top-0 bottom-0 left-0 right-0 bg-gray-500/70" />
          <BottomSheetModalProvider>
            <BottomSheet
              ref={sheetRef}
              snapPoints={snaps}
              enableHandlePanningGesture={true}
              enablePanDownToClose={true}
              onClose={() => setIsOpen(false)}
            // containerStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)', zIndex: 0 }}
            >
              <BottomSheetView style={{ display: 'flex', justifyContent: 'space-between', paddingHorizontal: 20 }}>
                <View>
                  <Text className="font-['Inter-SemiBold'] text-black text-lg">Type</Text>
                  <View className="flex flex-row space-x-3 my-3">
                    {familyTypes.map((item, index) =>
                      <TouchableOpacity key={index} onPress={() => setFamily(item)}>
                        <Text className={[family === item ? 'text-primary bg-primary/25' : 'text-black bg-gray-100', "font-['Inter-SemiBold']  text-sm p-1 px-2  rounded-xl"].join(' ')}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
                <View>
                  <Text className="font-['Inter-SemiBold'] text-black text-lg">Price range</Text>
                  <View className="flex flex-row justify-between space-x-3 my-3">
                    <View className="flex flex-row items-center flex-1">
                      <Image source={require('../../assets/taka.png')} className="h-6 w-6" style={{ tintColor: 'black' }} />
                      <TextInput onFocus={upSheet} autoFocus={false} keyboardType="number-pad" className="rounded-lg bg-slate-100 p-2 flex-1 text-black font-['Inter-SemiBold'] text-sm" placeholder="min" placeholderTextColor={'#cbd5e1'} />
                    </View>
                    <View className="flex flex-row items-center flex-1">
                      <Image source={require('../../assets/taka.png')} className="h-6 w-6" style={{ tintColor: 'black' }} />
                      <TextInput onFocus={upSheet} autoFocus={false} keyboardType="number-pad" className="rounded-lg bg-slate-100 p-2 flex-1 text-black font-['Inter-SemiBold'] text-sm" placeholder="max" placeholderTextColor={'#cbd5e1'} />
                    </View>
                  </View>
                </View>
                <View>
                  <Text className="font-['Inter-SemiBold'] text-black text-lg">Division</Text>
                  <View className="my-3">
                    <Search items={category} selected={cat} onSelect={setcat} />
                  </View>
                </View>
                <View>
                  <Text className="font-['Inter-SemiBold'] text-black text-lg">District</Text>
                  <View className="my-3">
                    <Search selected={subCat} items={subCategory[cat as keyof typeof subCategory]} onSelect={setSubCat} />
                  </View>
                </View>
                <TouchableOpacity onPress={() => setIsOpen(false)}>
                  <Text className="text-white font-['Inter-Bold'] bg-primary text-center p-3 rounded-lg w-full my-2">Apply</Text>
                </TouchableOpacity>
              </BottomSheetView>
            </BottomSheet>
          </BottomSheetModalProvider>
          <TouchableOpacity />
        </GestureHandlerRootView>
      ) : <></>}
    </Container>
  )
}
