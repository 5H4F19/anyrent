import { useState } from "react"
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { Image } from "react-native"
import { family } from "../../screens"

interface Icard {
    props: any,
    item: any
}

// house image url


export const Card = ({ props, item }: Icard) => {
    const [liked, setLiked] = useState<boolean>(false)
    return (
        <View className="relative mx-auto rounded-2xl font-['Inter-Regular'] mb-5" style={{ width: '95%' }} >
            <TouchableOpacity className="absolute h-16 w-16 top-0 right-0 z-10" onPress={() => setLiked(!liked)}>
                <Image className="h-6 w-6 mx-auto my-5" source={!liked ? require('../../assets/liked-outline.png') : require('../../assets/liked-filled.png')} style={{ tintColor: !liked ? '#fff' : '#f43f5e' }} />
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={() => props.navigation.navigate('Details')} className="mx-auto rounded-xl overflow-hidden" >
                <Image source={item.uri} className="w-full h-80 rounded-2xl" />
            </TouchableWithoutFeedback>
            <View className="flex flex-row p-4 h-[110px] justify-between">
                <View className="flex justify-between">
                    <View className="">
                        <Text className="text-sm font-normal text-black tracking-tight font-['Inter-Bold']">Ali house, Rangpur</Text>
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
                    <Text className="font-['Inter-SemiBold'] text-black text-xs p-1 px-2 bg-gray-100 rounded-xl">{item.type}</Text>
                    <View className="flex items-center justify-center">
                        <Image source={require('../../assets/google-maps.png')} className="h-6 w-6" style={{ tintColor: 'black' }} />
                        <Text className="text-[10px] text-gray-700 font-['Inter-SemiBold']">0.3 km</Text>
                    </View>
                </View>
            </View>
        </View>
    )
}



const Family = ({ family }: { family: family }) => {
    return <Text className="font-['Inter-SemiBold'] text-black text-xs p-1 px-2 bg-gray-100 rounded-xl">{family}</Text>
}
