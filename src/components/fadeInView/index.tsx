import React, { useEffect, useRef } from 'react'
import { View, Animated } from 'react-native'
import { Text } from 'react-native-svg'

interface FadeInViewProps {
  className?: string
  children: JSX.Element | JSX.Element[]

}

export const FadeInView = ({ className, children }: FadeInViewProps) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const moveY = useRef(new Animated.Value(10)).current

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(moveY, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start()
  }, [moveY])

  return <Animated.View className={className}
    style={{ transform: [{ translateY: moveY }], opacity: fadeAnim }}
  >{children}</Animated.View>
}

