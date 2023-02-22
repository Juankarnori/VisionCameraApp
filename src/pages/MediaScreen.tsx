import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { MediaStackParams } from '../navigator/MediaNavigator';
import Video from 'react-native-video';

interface Props extends StackScreenProps<MediaStackParams, 'MediaScreen'>{};

export const MediaScreen = ({ route }: Props) => {

    const { path, duration } = route.params;

    const source = {
        uri: path
    }

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    }}>
        <Text style={{ color: 'black' }}>MediaScreen</Text>
        <Text style={{ color: 'black' }}>Path: {path}</Text>
        <Text style={{ color: 'black' }}>Duration: {duration}</Text>
        <Video
          source={source}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          posterResizeMode="cover"
          allowsExternalPlayback={false}
          automaticallyWaitsToMinimizeStalling={false}
          disableFocus={true}
          repeat={true}
          useTextureView={false}
          controls={false}
          playWhenInactive={true}
          ignoreSilentSwitch="ignore"
        />
    </View>
  )
}
