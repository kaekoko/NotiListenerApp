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
  View,
  Button,
  AppState
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RNAndroidNotificationListener from 'react-native-android-notification-listener';


function App() {
  const [hasPermission, setHasPermission] = useState(false)


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
         
      </SafeAreaView>
  )
}

export default App;
