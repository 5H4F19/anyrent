import React, { useContext } from 'react'
import { View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import { Container, Heading } from '../../components'
import { AuthContext } from '../../context/authContext'

export const Chat = () => {

  const { currentUser } = useContext(AuthContext)
  console.log("current user", currentUser)
  return (
    <Container>
      <GiftedChat />
    </Container>
  )
}
