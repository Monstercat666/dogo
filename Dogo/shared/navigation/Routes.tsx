import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home/container';
import Styles from './Styles';
import {GlobalDataProvider} from '../context/GlobalContext';
import {Gallery} from '../screens/Gallery/container';

export enum Route {
  HomeScreen = 'HomeScreen',
  GalleryScreen = 'GalleryScreen',
}

const Stack = createNativeStackNavigator();

export const Routes: React.FC = () => {
  return (
    <NavigationContainer>
      <GlobalDataProvider>
        <Stack.Navigator
          initialRouteName={Route.HomeScreen}
          screenOptions={{headerStyle: Styles.headerStyle}}>
          <Stack.Screen name={Route.HomeScreen} component={Home} />
          <Stack.Screen name={Route.GalleryScreen} component={Gallery} />
        </Stack.Navigator>
      </GlobalDataProvider>
    </NavigationContainer>
  );
};
