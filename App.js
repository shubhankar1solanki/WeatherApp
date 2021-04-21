/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import {Alert} from 'react-native';
import {SafeAreaView} from 'react-native';
import RootNavigation from './App/Navigators/RootNavigation';
import messaging from '@react-native-firebase/messaging';
import Heartbeat from './App/Screens/Common/Heartbeat';
import Geolocation from '@react-native-community/geolocation';
import {OpenWeatherKey} from './App/Helper/Configs';

const App: () => React$Node = () => {
  const checkPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const getDeviceToken = async () => {
    messaging()
      .getToken()
      .then(token => {
        console.log('FCM Token:', token);
      })
      .catch(error => {
        console.log(error);
      });

    // Listen to whether the token changes
    return messaging().onTokenRefresh(token => {
      console.log('Latest FCM Token:', token);
    });
  };

  useEffect(() => {
    checkPermission();
    getDeviceToken();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert(
        remoteMessage.notification.title,
        remoteMessage.notification.body,
      );
    });

    getCurrentLocation();

    return unsubscribe;
  }, []);

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(async info => {
      const initRoute = {
        latitude: parseFloat(info.coords.latitude),
        longitude: parseFloat(info.coords.longitude),
      };

      let api = `http://api.openweathermap.org/data/2.5/weather?lat=${initRoute.latitude}&lon=${initRoute.longitude}&units=metric&appid=${OpenWeatherKey}`;
      let url =
        'https://images.vexels.com/media/users/3/154332/isolated/preview/079ffb98258a5cd58bc5f57438ce701d-cloud-weather-stroke-icon-by-vexels.png';

      await fetch(api)
        .then(res => res.json())
        .then(res => {
          let body = `Current temperature: ${res.main.temp}° c`;
          Heartbeat.startService(url, body);
        });
    });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <RootNavigation />
    </SafeAreaView>
  );
};

export default App;
