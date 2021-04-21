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

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <RootNavigation />
    </SafeAreaView>
  );
};

export default App;
