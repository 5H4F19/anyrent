import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { type PropsWithChildren } from 'react';
import {
  Text,
  View,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { TabBar } from './src/components';
import { Details } from './src/screens/home/details';
import { Map } from './src/screens/home/map';

const Stack = createNativeStackNavigator()
const App = () => {

  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Home" component={TabBar} options={{ headerShown: false }} />
        <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
        <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
