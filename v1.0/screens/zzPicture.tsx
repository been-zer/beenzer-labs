import { Camera, CameraType } from 'expo-camera';
import * as ScreenOrientation from 'expo';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';

function zzPicture() {
   const [type, setType] = useState(CameraType.back);
   const [permission, requestPermission] = Camera.useCameraPermissions();
   const cameraRef = useRef<Camera>(null);
   const [pic, setPic] = useState<string>();
   const [portrait, setPortrait] = useState<boolean>(true);
   const [camReady, setCamReady] = useState<boolean>(false);

   if (!permission) {
      // Camera permissions are still loading
      return <View />;
   }

   if (!permission.granted) {
      // Camera permissions are not granted yet
      return (
         <View className='flex-1 justify-center bg-zinc-900'>
            <Text style={{ textAlign: 'center', color: 'white' }}>We need your permission to show the camera</Text>
            <Button onPress={requestPermission} title="grant permission" />
         </View >
      );
   }

   const toggleCameraType = () => {
      setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
   }

   const cameraReady = () => {
      setCamReady(true);
   }

   const takePicture = async () => {
      if (camReady && cameraRef.current) {
         const data = await cameraRef.current.takePictureAsync({
            quality: 1,
            isImageMirror: false,
         }
         );
         console.log(data)
         setPortrait(data.width < data.height);
         if (type === CameraType.front) {
            const flipped = await ImageManipulator.manipulateAsync(
               data.uri,
               [{ flip: ImageManipulator.FlipType.Horizontal }],
            );
            setPic(flipped.uri);
         } else {
            setPic(data.uri);
         }
         console.log(data.uri)
      }
   }

   return (
      <View className='flex-1'>
         {pic ? (
            <>
               <Image source={{ uri: pic }} className='flex-1' style={{ transform: [{ rotate: portrait ? '0deg' : '90deg' }] }} />
               <Text>Picture taken</Text>

            </>
         ) : (
            <Camera className='flex-1' type={type} ref={cameraRef} onCameraReady={cameraReady}>

               <View className="flex-1 flex-row content-center border-2 border-indigo-50">
                  < View className='flex-1 flex-col justify-end items-center pb-5'>
                     <TouchableOpacity className=" " onPress={toggleCameraType}>
                        <Text className='font-bold text-l text-white mb-3 '>
                           {type === "back" ? "Show your face 🔄" : "You're beautiful"}
                        </Text>
                     </TouchableOpacity>
                     <TouchableOpacity className="w-52 bg-green-600 p-4 rounded-2xl" onPress={() => takePicture()}>
                        <Text className="font-semibold text-center"> BeenZer 📷 </Text>
                     </TouchableOpacity>
                  </View>
               </View>
            </Camera >
         )
         }
      </View >
   );
}

