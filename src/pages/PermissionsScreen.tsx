import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { BlackButton } from '../components/BlackButton';
import { PermissionsContext } from '../context/PermissionsContext';

export const PermissionsScreen = () => {

  const { permissions, askCameraPermission } = useContext( PermissionsContext )

  return (
    <View style={ styles.container }>
        <Text style={ styles.title }>Es necesario otorgar los permisos de la camara y el microfono</Text>
        <BlackButton 
          title='Permiso'
          onPress={askCameraPermission}
        />

        {/* <Text style={{ color: 'black' }}>
          { JSON.stringify(permissions, null, 5) }
        </Text> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    width: 250,
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
    color: 'black'
  }
})