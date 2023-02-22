import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { CameraScreen } from '../pages/CameraScreen';
import { MediaScreen } from '../pages/MediaScreen';

export type MediaStackParams = {
    CameraScreen: undefined,
    MediaScreen: { path?: string, duration?: number }
}

const Stack = createStackNavigator<MediaStackParams>();

export const MediaNavigator = () => {
  return (
    <Stack.Navigator>
        <Stack.Screen 
            name='CameraScreen'
            component={ CameraScreen }
            options={{ headerShown: false }}
            // options={{ title: 'Camara' }}
        />
        <Stack.Screen 
            name='MediaScreen'
            component={ MediaScreen }
            options={{ title: 'Carrete' }}
        />
    </Stack.Navigator>
  )
}
