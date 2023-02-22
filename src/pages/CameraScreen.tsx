import { StackScreenProps } from '@react-navigation/stack';
import React, { useRef } from 'react'
import { Text, View, StyleSheet, Platform, PermissionsAndroid, Alert, Button } from 'react-native';
import { Camera, sortFormats, useCameraDevices } from 'react-native-vision-camera';
import { LoadingScreen } from './LoadingScreen';
import { MediaStackParams } from '../navigator/MediaNavigator';

// const requestSavePermission = async (): Promise<boolean> => {
//   if (Platform.OS !== 'android') return true;

//   const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
//   if (permission == null) return false;
//   let hasPermission = await PermissionsAndroid.check(permission);
//   if (!hasPermission) {
//     const permissionRequestResult = await PermissionsAndroid.request(permission);
//     hasPermission = permissionRequestResult === 'granted';
//   }
//   return hasPermission;
// };

interface Props extends StackScreenProps<MediaStackParams, 'CameraScreen'>{};

export const CameraScreen = ( { navigation }: Props ) => {

  const devices = useCameraDevices()
  const device = devices.back

  // console.log(`Formatos: ${device?.formats.sort(sortFormats)}`)
  console.log(`Formatos: ${device?.formats}`)
  console.log(`FramesProccessors: ${device?.supportsParallelVideoProcessing}`)

  const camera = useRef<Camera>(null);

  const startvideo = async() => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');
      
      camera.current.startRecording({
        flash: 'on',
        onRecordingFinished: (video) => {
          console.log(`Path: ${video.path}`)
          console.log(`Duration: ${video.duration}`)
          navigation.navigate('MediaScreen',{
            path: video.path,
            duration: video.duration
          })
        },
        onRecordingError: (error) => console.error(error),
      })
      console.log('Taking photo...');
      // const photo = await camera.current.takePhoto({
      //   flash: 'on',
      //   skipMetadata: true,
      // });
      setTimeout(async () => {
        camera.current?.stopRecording()
        // const {path} = await camera.current?.stopRecording()
        // navigation.navigate('MediaScreen',{})
       }, 10000)
      // console.log('take a photo')
      // console.log(`Video: ${video}`)
      // const hasPermission = await requestSavePermission();
      // if (!hasPermission) {
      //   console.log('Permiso denegado')
      //   Alert.alert('Permission denied!', 'Vision Camera does not have permission to save the media to your camera roll.');
      //   return;
      // }
      // PhotoGallery.saveToCameraRoll(tag, { type, album })
      // await CameraRoll.save(`file://${}`, {
      //   type: type,
      // });
    } catch (e) {
      console.error('Failed to take photo!', e);
    }
  }

  if (device == null) return <LoadingScreen />
  return (
    <View style={{ flex: 1, width: '100%'}}>
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFill}
          device={device}
          fps={240}
          isActive={true}
          photo={true}
          video={true}
          audio={true} // <-- optional
        />
        <Button
          title='Start'
          onPress={startvideo}
        />
    </View>
  )
}

const styles = StyleSheet.create({

});
