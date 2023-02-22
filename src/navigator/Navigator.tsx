import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { PermissionsScreen } from '../pages/PermissionsScreen';
import { CameraScreen } from '../pages/CameraScreen';
import { PermissionsContext } from '../context/PermissionsContext';
import { LoadingScreen } from '../pages/LoadingScreen';
import { MediaNavigator } from './MediaNavigator';

const Stack = createStackNavigator();

export const Navigator = () => {

  const { permissions } = useContext( PermissionsContext )

  if ( permissions.cameraStatus === 'not-determined' ) {
    return <LoadingScreen />
  }

  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false,
            cardStyle: {
                backgroundColor: 'white'
            }
        }}
    >
      {
        ( permissions.cameraStatus === 'authorized')
          ? <Stack.Screen name="MediaNavigator" component={MediaNavigator} />
          : <Stack.Screen name="PermissionsScreen" component={PermissionsScreen} />
      }
      
    </Stack.Navigator>
  );
}

