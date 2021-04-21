import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import CityList from '../Screens/CityList';
import WeatherInfo from '../Screens/WeatherInfo';

const Stack = createStackNavigator();

const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'CityList'}
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="CityList" component={CityList} />
        <Stack.Screen name="WeatherInfo" component={WeatherInfo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigation;
