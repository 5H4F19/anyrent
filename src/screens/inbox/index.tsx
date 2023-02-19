import { async } from '@firebase/util'
import { collection, doc, Firestore, getDocs, onSnapshot, query } from 'firebase/firestore'
import { last } from 'lodash'
import { useContext, useEffect, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { auth, database } from '../../../config/firebase'
import { Container, Heading } from "../../components"
import { FadeInView } from '../../components/fadeInView'
import { AuthContext } from '../../context/authContext'

const inbox = [
  {
    user: 'Nawab khairuzzaman',
    lastMsg: 'Hello',
    img: require('../../assets/house/1.jpg')
  },
  {
    user: 'Shakib Hossen',
    lastMsg: 'Hello',
    img: require('../../assets/house/2.jpg')
  },
  {
    user: 'Tarek jaman',
    lastMsg: 'Hello',
    img: require('../../assets/house/3.jpg')
  },
  {
    user: 'Rishad Nur',
    lastMsg: 'Hello',
    img: require('../../assets/house/4.jpg')
  },
]

interface Room {
  id: string;
  user: string;
}

export const Inbox = ({ navigation }: { navigation: any }) => {

  const { currentUser } = useContext(AuthContext)

  const [rooms, setRooms] = useState<Room[]>([])
  useEffect(() => {

    const getRooms = async () => {
      const q = query(collection(database, "ROOMS"));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(currentUser.uid, " => ", doc.data().user);
      })
    }

    getRooms();
  }, [])

  return (
    <Container>
      <Heading>Inbox</Heading>
      <View className="flex flex-row justify-between items-center px-2.5 py-2 w-full bg-white mx-auto rounded-full" style={{ width: '90%', elevation: 15, shadowColor: '#64748b' }}>
        <Image source={require('../../assets/search.png')} className="h-6 w-6 mx-1" style={{ tintColor: '#334155' }} />
        <TextInput className=" flex-1 text-sm p-0 font-['Inter-SemiBold'] text-black" placeholder="Search" />
      </View>

      <View className='w-full h-screen flex gap-y-3 my-4'>
        {inbox.map(({ user, lastMsg, img }, index) => (
          <FadeInView key={user} className="my-1">
            <TouchableOpacity
              onPress={() => navigation.navigate('Chat')}
              className='flex flex-row items-center mx-4'
            >
              <Image source={img} className="w-12 h-12 rounded-full" />
              <View className='mx-3  flex justify-between'>
                <Text className=" text-gray-800 font-['Inter-SemiBold'] text-sm">{user}</Text>
                <Text className=" text-gray-800 font-['Inter-Regular'] text-xs">{lastMsg}</Text>
              </View>
            </TouchableOpacity>
          </FadeInView>
        ))}
      </View>
    </Container>
  )

}




