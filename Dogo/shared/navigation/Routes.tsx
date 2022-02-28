import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home} from '../screens/Home/container';
import Styles from './Styles';
import {GlobalDataProvider} from '../context/GlobalContext';
import {Gallery} from '../screens/Gallery/container';
import strings from '../localization/Localization';
import Colors from '../styles/Colors';
import Fonts from '../styles/Fonts';

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
      <NavigationContainer>
        <GlobalDataProvider>
          <Stack.Navigator
            initialRouteName={RouteName.HomeScreen}
            screenOptions={{
              headerStyle: Styles.headerStyle,
              headerTintColor: Colors.White,
              headerTitleAlign: 'center',
            }}>
            <Stack.Screen
              name={RouteName.HomeScreen}
              component={Home}
              options={{
                title: strings.dogo,
                headerTitleStyle: {fontSize: Fonts.Standard},
              }}
            />
            <Stack.Screen
              name={RouteName.GalleryScreen}
              component={Gallery}
              options={{
                headerBackTitle: strings.back,
                title: '',
                headerTitleStyle: {fontSize: Fonts.Standard},
              }}
            />
          </Stack.Navigator>
        </GlobalDataProvider>
      </NavigationContainer>
    </>
  );
};
