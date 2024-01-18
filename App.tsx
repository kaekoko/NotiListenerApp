/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  TextInput,
  Alert,
  View,
  Button,
  AppState,
} from 'react-native';

import { getUniqueId, getManufacturer } from 'react-native-device-info';

import AsyncStorage from '@react-native-async-storage/async-storage';

import RNAndroidNotificationListener from 'react-native-android-notification-listener';


function App() {
   

  const [hasPermission, setHasPermission] = useState(false)
  const deviveid=getUniqueId();


 


  const handleOnPressPermissionButton = async () => {
      /**
       * Open the notification settings so the user
       * so the user can enable it
       */
      RNAndroidNotificationListener.requestPermission()
  }

  const handleAppStateChange = async (
      nextAppState: string,
      force = false
  ) => {
      if (nextAppState === 'active' || force) {
          const status =
              await RNAndroidNotificationListener.getPermissionStatus()
          setHasPermission(status !== 'denied')
      }
  }

  useEffect(() => {
 

    const listener = AppState.addEventListener(
        'change',
        handleAppStateChange
    )

    handleAppStateChange('', true)

    return () => {
      
        listener.remove()
    }
}, [])

 //local storage
 const STORAGE_KEY = '@MyApp:key';
 const [value, setValue] = useState('');

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, value);
      Alert.alert('Save DeviceId', 'succefuly save deviceid', [
       
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    } catch (e) {
      console.error('Error saving value:', e);
    }
  };

  const handleLoad = async () => {
    try {
      const value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        setValue(value);
        
      }
    } catch (e) {
      console.error('Error loading value:', e);
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  return (
      <SafeAreaView >
          <View>
              <Text>
                  {hasPermission
                      ? 'Allowed to handle notifications'
                      : 'NOT allowed to handle notifications'}
              </Text>
              <Button
                  title='Open Configuration'
                  onPress={handleOnPressPermissionButton}
                  disabled={hasPermission}
              />
          </View>
          <View style={{ padding: 20 }}>
      <Text>Enter a value:</Text>
      <TextInput
        style={{ borderWidth: 1, borderColor: 'gray', padding: 10, marginVertical: 10 }}
        value={value}
        onChangeText={setValue}
      />
      <Button title="Save" onPress={handleSave} />
    </View>
         
      </SafeAreaView>
  )
}

export default App;
function async(arg0: string, deviveid: Promise<string>) {
    throw new Error('Function not implemented.');
}

