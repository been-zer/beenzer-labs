import { View, Text } from 'react-native'
import { useEffect, useState } from 'react'
import { Camera, CameraPermissionStatus } from 'react-native-vision-camera';
import { NavigationContainer } from '@react-navigation/native';

const Picture = () => {

   const [cameraPermission, setCameraPermission] = useState<CameraPermissionStatus>();
   const [microphonePermission, setMicrophonePermission] = useState<CameraPermissionStatus>();

   useEffect(() => {
      Camera.getCameraPermissionStatus().then(setCameraPermission);
      Camera.getMicrophonePermissionStatus().then(setMicrophonePermission);
   }, []);


   if (cameraPermission == null || microphonePermission == null) {
      // still loading
      return null;
   }

   const showPermissionsPage = cameraPermission !== 'authorized' || microphonePermission === 'not-determined';
   return (
      <>
         {showPermissionsPage ?
            <PermissionsPage /> : <CameraPage />
         }
      </>
   );


   export default Picture