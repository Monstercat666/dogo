import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home/container';
import Styles from './Styles';
import {GlobalDataProvider} from '../context/GlobalContext';
import {Gallery} from '../screens/Gallery/container';
import strings from '../localization/Localization';
import Colors from '../styles/Colors';
import {StatusBar} from 'react-native';

export enum RouteName {
  HomeScreen = 'HomeScreen',
  GalleryScreen = 'GalleryScreen',
}

export type Route = {
  [RouteName.HomeScreen]: undefined;
  [RouteName.GalleryScreen]: undefined;
};

const Stack = createNativeStackNavigator();

export const Routes: React.FC = () => {
  return (
    <>
      <StatusBar hidden={false} backgroundColor={Colors.Blue} />
      <NavigationContainer>
        <GlobalDataProvider>
          <Stack.Navigator
            initialRouteName={RouteName.HomeScreen}
            screenOptions={{
              headerStyle: Styles.headerStyle,
              headerTintColor: Colors.White,
            }}>
            <Stack.Screen
              name={RouteName.HomeScreen}
              component={Home}
              options={{title: strings.dogo}}
            />
            <Stack.Screen
              name={RouteName.GalleryScreen}
              component={Gallery}
              options={{
                headerBackTitle: strings.back,
                title: '',
              }}
            />
          </Stack.Navigator>
        </GlobalDataProvider>
      </NavigationContainer>
    </>
  );
};
