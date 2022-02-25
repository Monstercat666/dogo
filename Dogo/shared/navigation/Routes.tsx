import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home/container';
import Styles from './Styles';

export enum Route {
  HomeScreen = 'HomeScreen',
}

const Stack = createNativeStackNavigator();

export const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Route.HomeScreen}
        screenOptions={{headerStyle: Styles.headerStyle}}>
        <Stack.Screen name={Route.HomeScreen} component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
