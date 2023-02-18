import React, { useRef } from 'react'
import { Text, View, StyleSheet, Platform, PermissionsAndroid, Alert, Button } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { LoadingScreen } from './LoadingScreen';

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

export const CameraScreen = () => {

  const devices = useCameraDevices('wide-angle-camera')
  const device = devices.back

  console.log(device)

  const camera = useRef<Camera>(null);

  const startvideo = async() => {
    try {
      if (camera.current == null) throw new Error('Camera ref is null!');
      
      const video = camera.current?.startRecording({
        flash: 'on',
        onRecordingFinished: (video) => console.log(video),
        onRecordingError: (error) => console.error(error),
      })
      console.log('Taking photo...');
      // const photo = await camera.current.takePhoto({
      //   flash: 'on',
      //   skipMetadata: true,
      // });
      setTimeout(async () => {
        const video = await camera.current?.stopRecording()
       }, 5000)
      console.log('take a photo')
      console.log(video)
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
