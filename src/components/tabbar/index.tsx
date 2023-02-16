import React, { useEffect, useReducer, useRef } from 'react'
import {
  Pressable,
  StatusBar,
  StyleSheet,
  View,
  Text,
  LayoutChangeEvent,
} from 'react-native'
// navigation
import { getFocusedRouteNameFromRoute, NavigationContainer, RouteProp, useRoute } from '@react-navigation/native'
import { BottomTabBarProps, BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
// svg
import Svg, { Path } from 'react-native-svg'
// reanimated
import Animated, { useAnimatedStyle, withTiming, useDerivedValue, tan } from 'react-native-reanimated'
// lottie
import Lottie from 'lottie-react-native'
import { Bookings, Explore, Inbox, Profile, Wishlists } from '../../screens'
// ------------------------------------------------------------------
import heart from './lottie/heart.ic.json'
import grid from './lottie/grid.json'
import search from './lottie/search.icon.json'
import inbox from './lottie/tele.json'
import user from './lottie/user.ic.json'

import { coloriseLottie } from './lottie/colorizeLottie'
import { Create } from '../../screens/create'

const Tab = createBottomTabNavigator()

const AnimatedSvg = Animated.createAnimatedComponent(Svg)


// ------------------------------------------------------------------
interface Itabs {
  name: string,
  icon: {
    json: any,
    key: string[]
  }
  component: any,
  size: number,
}

export const tabNames = {
  'Create': 'Create',
  'Wishlists': 'Wishlists',
  'Explore': 'Explore',
  'Inbox': 'Inbox',
  'Profile': 'Profile'
}

const tabs: Itabs[] = [
  {
    name: tabNames.Create,
    icon: { json: grid, key: ["layers.0.shapes.0.it.0.it.8.c.k"] },
    component: Create,
    size: 1,
  },
  {
    name: tabNames.Wishlists,
    icon: { json: heart, key: ["layers.0.shapes.0.it.0.it.0.it.2.c.k"] },
    component: Wishlists,
    size: 1,
  },
  {
    name: tabNames.Explore,
    icon: { json: search, key: ["layers.0.shapes.0.it.1.c.k", "layers.0.shapes.1.it.1.c.k", "layers.0.shapes.2.it.1.c.k"] },
    component: Explore,
    size: 1,
  },
  {
    name: tabNames.Inbox,
    icon: { json: inbox, key: ["layers.0.shapes.0.it.0.it.2.c.k"] },
    component: Inbox,
    size: 1.2,
  },
  {
    name: tabNames.Profile,
    icon: { json: user, key: ["layers.0.shapes.0.it.0.it.0.it.1.c.k", "layers.0.shapes.0.it.1.it.1.c.k"] },
    component: Profile,
    size: 1,
  },

]

export const TabBar = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <Tab.Navigator
        screenOptions={
          ({ route }) => ({
            tabBarStyle: { display: 'none' },
            headerShown: false
          })
        }
        initialRouteName="Explore"
        tabBar={(props) => <AnimatedTabBar {...props} />}
      >
        {tabs.map((tab, index) => (
          <Tab.Screen
            key={index}
            name={tab.name}
            // @ts-ignore
            options={({ route }) => ({
              // @ts-ignore
              // tabBarIcon: ({ ref }) => <Lottie ref={ref} loop={false} source={tab.icon} style={[styles.icon, { height: 24 * tab.size, width: 24 * tab.size, }]} />,
            })}
            component={tab.component}
          />

        ))}
      </Tab.Navigator>
    </>
  )
}

// ------------------------------------------------------------------

// ------------------------------------------------------------------

const AnimatedTabBar = ({ state: { index: activeIndex, routes }, navigation, descriptors }: BottomTabBarProps, { title }: BottomTabNavigationOptions) => {
  const { bottom } = useSafeAreaInsets()
  const route = useRoute()
  // get information about the components position on the screen -----

  const reducer = (state: any, action: { x: number, index: number }) => {
    // Add the new value to the state
    return [...state, { x: action.x, index: action.index }]
  }

  const [layout, dispatch] = useReducer(reducer, [])
  console.log(route)

  const handleLayout = (event: LayoutChangeEvent, index: number) => {
    dispatch({ x: event.nativeEvent.layout.x, index })
  }

  // animations ------------------------------------------------------

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;
    return [...layout].find(({ index }) => index === activeIndex)!.x - 55
  }, [activeIndex, layout])

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    }
  })

  return (
    <View className='bg-white pt-3 w-full mx-auto shadow-lg z-0' style={[{ position: 'absolute', bottom: 0 }]}>
      <AnimatedSvg
        width={160}
        height={64}
        viewBox="0 0 158.49 64.29"
        style={[styles.activeBackground, animatedStyles]}
        className="absolute bottom-0"
      >
        <Path fill={'black'} d="M158.49,64.29c-53.32-6.48-49.8-40.72-57.52-52.64C94.22,1.22,82.85-.13,79.25,0c-3.6-.14-14.89,1.31-21.64,11.73-7.72,11.92-4.29,46.07-57.61,52.54H79.25s79.25,0,79.25,0Z" />

        {/* <Path fill={'black'} d="M158.49,64.29c-53.32-6.48-49.01-41.51-56.73-53.43C95.01,.44,82.85-.12,79.25,.02c-3.6-.14-15.77,.42-22.53,10.85-7.72,11.92-3.4,46.96-56.72,53.43H79.25s79.25,0,79.25,0Z" /> */}
      </AnimatedSvg>

      <View className='pb-4 z-0' style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex
          const { options } = descriptors[route.key]

          return (
            <TabBarComponent
              key={route.key}
              index={index}
              active={active}
              title={route.name}
              options={options}
              onLayout={(e) => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          )
        })}
      </View>
    </View>
  )
}

// ------------------------------------------------------------------

type TabBarComponentProps = {
  active?: boolean
  index: number
  title?: string
  options: BottomTabNavigationOptions
  onLayout: (e: LayoutChangeEvent) => void
  onPress: () => void
}

const TabBarComponent = ({ active, index, options, title, onLayout, onPress }: TabBarComponentProps) => {
  // handle lottie animation -----------------------------------------
  const ref = useRef(null)

  useEffect(() => {
    if (active && ref?.current) {
      // @ts-ignore
      ref.current.play()
    }
  }, [active])

  // animations ------------------------------------------------------

  const animatedIconStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 250 })
        }
      ]
    }
  })

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 1, { duration: 250 })
    }

  })

  const animateTransition = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withTiming(active ? 3 : 0, { duration: 250 })
        }
      ]
    }
  })
  const tab = tabs[index]
  const keys = tab.icon.key.map(key => ({ [key]: active ? '#fff' : '#282a2e' }))
  console.log(keys)
  return (
    <Pressable className='relative z-0' onPress={onPress} onLayout={onLayout} style={styles.component}>
      {/* <Animated.View className="absolute h-[50px] w-[50px] rounded-full bg-white translate-y-3" style={[animatedComponentCircleStyles]} /> */}
      <Animated.View className={["mx-auto h-10 w-10 justify-center items-center rounded-full"].join(' ')} style={[animatedIconContainerStyles, animateTransition]}>
        {/* @ts-ignore */}
        {/* {options.tabBarIcon ? options.tabBarIcon({ ref }) : <Text>?</Text>} */}


        <Lottie ref={ref} loop={false} source={coloriseLottie(tab.icon.json, keys)} style={[{ height: 24 * tabs[index].size, width: 24 * tabs[index].size, marginTop: title === 'Inbox' ? -2 : (title === 'Explore' ? -1.2 : 0), marginLeft: title === 'Inbox' ? -1 : (title === 'Explore' ? -0.5 : 0) }]} />
        {!active && <Text style={{ fontFamily: 'Inter-Regular' }} className='mx-auto text-[9px] text-black z-0'>{title}</Text>}
      </Animated.View>

    </Pressable>
  )
}

// ------------------------------------------------------------------

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'red',
  },
  activeBackground: {
    position: 'absolute',
  },
  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  component: {
    height: 50,
    width: 50,
    marginBottom: -5,
    elevation: 3,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  iconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
})
