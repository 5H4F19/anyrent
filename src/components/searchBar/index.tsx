import { View, Image, TextInput, TouchableOpacity } from "react-native"
import BottomSheet, { BottomSheetView, BottomSheetModalProvider } from '@gorhom/bottom-sheet'
import { useRef, useState } from "react"
import { Text } from "react-native"

export const SearchBar = ({ setIsOpen }: { setIsOpen: (t: boolean) => void }) => {
    return (<>
        <View className="flex flex-row justify-between items-center px-2.5 py-1.5 w-full bg-white my-6 mx-auto rounded-full" style={{ width: '90%', elevation: 15, shadowColor: '#64748b' }}>
            <Image source={require('../../assets/search.png')} className="h-6 w-6 mx-1" style={{ tintColor: '#334155' }} />
            <TextInput className=" flex-1 text-sm p-0 font-['Inter-SemiBold'] text-black" placeholder="Search" />
            <TouchableOpacity className="p-2 rounded-full bg-white" onPress={() => setIsOpen(true)}>
                <Image source={require('../../assets/setting.png')} className="h-5 w-5" style={{ tintColor: '#334155' }} />
            </TouchableOpacity>
        </View>


    </>
    )
}