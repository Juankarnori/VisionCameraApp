import React, { createContext, useEffect, useState } from 'react';
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import { AppState } from 'react-native';

export interface PermissionsState {
    cameraStatus: CameraPermissionStatus
    microphoneStatus: CameraPermissionStatus
}

export const permissionInitState: PermissionsState = {
    cameraStatus: 'not-determined',
    microphoneStatus: 'not-determined'
}

type PermissionsContextProps = {
    permissions: PermissionsState
    askCameraPermission: () => void;
    checkCameraPermission: () => void;
}

export const PermissionsContext = createContext({} as PermissionsContextProps);

export const PermissionsProvider = ({ children }: any) => {

    const [permissions, setPermissions] = useState( permissionInitState)

    useEffect(() => {
        
        AppState.addEventListener('change', state => {
            
            if( state !== 'active') return;

            checkCameraPermission();

        })

    }, [])
    

    const askCameraPermission =async () => {

        const cameraPermission = await Camera.requestCameraPermission()
        const microphonePermission = await Camera.requestMicrophonePermission()
    
        setPermissions({
            ...permissions,
            cameraStatus: cameraPermission,
            microphoneStatus: microphonePermission
        })
        
        // console.log(`Permisos Camara: ${cameraPermission} Microfono: ${microphonePermission}`)
        
    }

    const checkCameraPermission = async() => {

        const cameraPermission = await Camera.getCameraPermissionStatus()
        const microphonePermission = await Camera.getMicrophonePermissionStatus()
    
        setPermissions({
            ...permissions,
            cameraStatus: cameraPermission,
            microphoneStatus: microphonePermission
        })

        // console.log(`Permisos Camara: ${cameraPermission} Microfono: ${microphonePermission}`)

    }

    return(
        <PermissionsContext.Provider value={{
            permissions,
            askCameraPermission,
            checkCameraPermission,

        }}>
            { children }
        </PermissionsContext.Provider>
    )

}