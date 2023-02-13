import { Image, Text, TouchableOpacity, View } from "react-native"

export const Heading = ({ children, navigation }: { children: string, navigation?: any }) => {
    return (
        <View className="bg-transaparent flex gap-1 flex-row my-7 items-start">
            {navigation ? (
                <TouchableOpacity className="bg-transparent" onPress={() => { if (navigation) navigation.goBack() }}>
                    <Image source={require('../../assets/back-arrow.png')} className="h-8 w-8 bg-transparent" />
                </TouchableOpacity>
            ) : <View className="h-8 w-8 bg-transparent"></View>}
            <Text className='bg-white text-2xl font-normal text-black w-full tracking-tighter' style={{ fontFamily: 'Inter-SemiBold' }}>{children}</Text>
        </View>
    )
}