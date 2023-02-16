import React, { memo } from 'react'
import { ButtonProps, Text, TouchableOpacity, View } from 'react-native'

export const type = {
  primary: {
    bg: 'bg-primary',
    text: 'text-white'
  },
  outline: {
    bg: 'bg-white border border-primary',
    text: 'text-primary'
  },
}

interface LocalProps {
  className?: string
  children: string
}
type IButtonProps = LocalProps & Partial<ButtonProps>

export const Button = ({ ...props }: IButtonProps) => {
  return (
    <TouchableOpacity className="flex-1">
      <View
        className={`${props.className} text-white font-['Inter-Bold'] 
            ${props.color === 'outline' ? `${type["outline"].bg}` : `${type["primary"].bg}`} 
            text-center p-3 rounded-lg w-full my-2 ${props.className}`}>
        <Text
          className={`${props.color === 'outline' ? type["outline"].text : type["primary"].text} font-['Inter-Bold'] text-center rounded-lg w-full`}>
          {props.children}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
