/* eslint-disable no-undef */
import React from 'react';
import { View, Text, SafeAreaView, StatusBar, Dimensions, StyleSheet, ScrollView, Image } from 'react-native';
const { width } = Dimensions.get('window');
import SelectDropdown from 'react-native-select-dropdown';

interface ISearchProps {
    items: string[];
    selected: string
    onSelect: (item: string) => void;
}

export const Search = ({ items, selected, onSelect }: ISearchProps) => {

    return (
        <SelectDropdown
            data={items}
            onSelect={(selectedItem, index) => {
                onSelect(selectedItem)

            }}
            defaultButtonText={'Select'}
            buttonTextAfterSelection={(selectedItem, index) => {
                return selected;
            }}
            rowTextForSelection={(item, index) => {
                return item;
            }}
            buttonStyle={styles.dropdown2BtnStyle}
            buttonTextStyle={styles.dropdown2BtnTxtStyle}
            renderDropdownIcon={isOpened => {
                return <Image source={require('../../assets/up-and-down.png')} className="h-4 w-4" style={{ tintColor: '#cbd5e1' }} />
            }}
            dropdownStyle={styles.dropdown2DropdownStyle}
            rowStyle={styles.dropdown2RowStyle}
            rowTextStyle={styles.dropdown2RowTxtStyle}
            search
            searchInputTxtColor='black'
            searchInputStyle={styles.dropdown2searchInputStyle}
            searchPlaceHolder={''}
            searchPlaceHolderColor={'#282a2e'}
            renderSearchInputLeftIcon={() => {
                return <Image source={require('../../assets/search.png')} className="h-4 w-4 translate-x-1 translate-y-0.5" style={{ tintColor: '#94a3b8' }} />
            }}
        />
    );
};

const styles = StyleSheet.create({
    dropdown2BtnStyle: {
        width: '100%',
        height: 40,
        backgroundColor: '#f1f5f9',
        borderRadius: 8,
    },
    dropdown2BtnTxtStyle: {
        color: '#282a2e',
        textAlign: 'left',
        fontFamily: 'Inter-SemiBold',
        fontSize: 14,
        lineHeight: 20,
    },
    dropdown2DropdownStyle: {
        backgroundColor: '#FFF',
        borderRadius: 8,
        position: 'absolute',
        paddingBottom: 8,
        top: 50,
        left: 0,
    },
    dropdown2RowStyle: { backgroundColor: '#fff', borderBottomColor: '#f8fafc' },
    dropdown2RowTxtStyle: {
        color: '#282a2e',
        textAlign: 'left',
        fontFamily: 'Inter-SemiBold',
        fontSize: 14,
        lineHeight: 20,
    },
    dropdown2searchInputStyle: {
        backgroundColor: '#f1f5f9',
        borderBottomWidth: 1,
        borderRadius: 0,
        borderBottomColor: '#FFF',
        fontFamily: 'Inter-SemiBold',

    },
});