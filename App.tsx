import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { type PropsWithChildren } from 'react';
import {
  StatusBar,
  Text,
  View,
} from 'react-native';
import { TabBar } from './src/components';
import { Details } from './src/screens/home/details';
import { Map } from './src/screens/home/map';
import { Login } from './src/screens/login';
const Stack = createNativeStackNavigator()

const App = () => {

  return (
    <>
      <NavigationContainer>
        <StatusBar translucent backgroundColor={'transparent'} />

        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name="Home" component={TabBar} options={{ headerShown: false }} />
          <Stack.Screen name="Details" component={Details} options={{ headerShown: false }} />
          <Stack.Screen name="Map" component={Map} options={{ headerShown: false }} />
          <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default App;
