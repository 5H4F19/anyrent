import React from 'react'
import { TextInput as Input, TextInputProps } from 'react-native'

export type ITextInputProps = { className?: string } & Partial<TextInputProps>

export const TextInput = ({ ...props }: ITextInputProps) => {
  console.log(props.className)
  return (
    <Input
      placeholderTextColor={'#999999'}
      {...props}
      className={`${props.className} bg-gray text-black font-semibold rounded-lg h-9 px-4 ${props.className}`}
    />
  )
}

