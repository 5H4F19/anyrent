import React from 'react'
import { View, TouchableOpacity, Image, Text, FlatList } from 'react-native'
import { launchImageLibrary } from 'react-native-image-picker';

interface IUploadProps {
  photos: any[],
  setPhotos: (photos: any[]) => void
}

export const Upload = ({ photos, setPhotos }: IUploadProps) => {

  const handleChoosePhoto = () => {
    try {
      launchImageLibrary({ mediaType: 'photo', selectionLimit: 5 }, (response) => {
        if (response.assets) {
          // const photos = response.assets.filter(asset => ({ name: asset.fileName, uri: asset.uri, type: asset.type }))
          setPhotos(response.assets)
        }
      })

    } catch (error) {

    }
  };

  const _filter = (index: number) => {
    // @ts-ignore
    const newPhotos = photos.filter(i => i !== photos[index])
    setPhotos(newPhotos)
  }

  return (
    <>
      <View className='flex flex-row items-center'>
        <TouchableOpacity
          className='flex flex-row items-center rounded-md px-4 h-9 my-2 bg-gray'
          onPress={handleChoosePhoto}
        /*  style={{
           width: '100%',
           borderStyle: 'dashed',
           borderWidth: 1,
           borderColor: '#000000'
         }} */
        >
          <Image source={require('../../assets/upload.png')} className="h-6 w-6" />
          <Text className="font-['Inter-Medium'] text-black z-10 px-2">Upload images</Text>
        </TouchableOpacity>
        {!photos &&
          <Text className='text-md mx-2 text-black'>No file choosen</Text>
        }
      </View>
      <View>
        <FlatList
          data={photos}
          horizontal
          renderItem={({ item, index }) =>
            <View>
              <Image
                key={item?.uri}
                source={{ uri: item?.uri }}
                className="h-24 w-[109px] rounded-lg object-cover m-1"
              />
              <TouchableOpacity
                className='flex items-center justify-center absolute top-3 right-3 bg-white p-[5px] rounded-full'
                onPress={() => _filter(index)}>
                <Image source={require('../../assets/close.png')} className="h-[9px] w-[9px]" style={{ tintColor: '#374151' }} />
              </TouchableOpacity>
            </View>
          }
        />
      </View>
    </>
  )
}

