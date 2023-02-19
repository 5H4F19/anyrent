import React, { memo } from 'react'
import { ActivityIndicator, ButtonProps, Text, TouchableHighlightProps, TouchableOpacity, View } from 'react-native'
import { Loader } from '../loader'

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
  color?: string
}
type IButtonProps = LocalProps & Partial<TouchableHighlightProps>

export const Button = ({ ...props }: IButtonProps) => {
  return (
    <TouchableOpacity {...props}>
      <View
        className={`${props.className} text-white font-['Inter-Bold'] 
            ${props.color === 'outline' ? `${type["outline"].bg}` : `${type["primary"].bg}`}
            ${props.disabled && "opacity-20"}
            text-center p-3 rounded-lg w-full my-2 ${props.className}`}>
        <Text
          className={`${props.color === 'outline' ? type["outline"].text : type["primary"].text} font-['Inter-Bold'] text-center rounded-lg w-full`}>
          {props.disabled ? <Loader /> : props.children}
        </Text>
      </View>
    </TouchableOpacity>
  )
}
