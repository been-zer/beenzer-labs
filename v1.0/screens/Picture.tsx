import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import * as ScreenOrientation from 'expo';
import { useState, useRef } from 'react';
import { Button, Dimensions, Text, TouchableOpacity, View, ImageBackground, Image, ScrollView } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { atomPic, atomDataPic, atomKeepPic } from '../services/globals';
import { useAtom } from 'jotai';
import PostBeenzer from './PostBeenzer';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';

export default function Picture() {
   const [type, setType] = useState(CameraType.back);
   const [permission, requestPermission] = Camera.useCameraPermissions();
   const cameraRef = useRef<Camera>(null);
   const [pic, setPic] = useAtom(atomPic);
   const [portrait, setPortrait] = useState<boolean>(true);
   const [camReady, setCamReady] = useState<boolean>(false);
   const [keepPic, setKeepPic] = useAtom(atomKeepPic);
   const navigation = useNavigation<NavigationProp<ParamListBase>>();
   const [clicked, setClicked] = useState<boolean>(true);
   const [dataPic, setDatapic] = useAtom(atomDataPic)

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
      setClicked(false);
      if (camReady && cameraRef.current) {
         const data = await cameraRef.current.takePictureAsync({
            base64: true,
            quality: 0.5,
         }
         );
         setDatapic(data as CameraCapturedPicture)
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
      }
   }

   const handleSave = () => {
      setKeepPic(true);
      setClicked(true);
   }

   return (
      <>
         <View className='flex-1'>
            {pic ?

               (
                  <>
                     {!keepPic &&
                        <>
                           <View className='flex-1 justify-center items-center bg-zinc-900' >
                              <ImageBackground
                                 source={{ uri: pic }}
                                 resizeMode="contain"
                                 style={{
                                    transform: [{ rotate: portrait ? '0deg' : '90deg' }],
                                    flex: 1,
                                    width: '100%',
                                 }}>
                              </ImageBackground>
                              <TouchableOpacity className="mt-1 w-52 bg-green-600  p-4 rounded-2xl" onPress={handleSave} >
                                 <Text className="font-semibold text-white text-center" > continue </Text>
                              </TouchableOpacity>
                              <TouchableOpacity className="mb-10 mt-1 w-52 bg-red-600  p-4 rounded-2xl" onPress={() => (
                                 setPic(""), setClicked(true)
                              )} >
                                 <Text className="font-semibold text-white text-center" > Do another one </Text>
                              </TouchableOpacity>
                           </View>
                        </>
                     }
                     {keepPic &&
                        <>
                           <PostBeenzer />
                        </>
                     }
                  </>
               ) :

               (
                  <Camera className='flex-1' type={type} ref={cameraRef} onCameraReady={cameraReady}>
                     <View className="flex-1 flex-row content-center border-2 border-indigo-50">
                        < View className='flex-1 flex-col justify-end items-center pb-5'>
                           <TouchableOpacity className=" " onPress={toggleCameraType}>
                              <Text className='font-bold text-l text-white mb-3 '>
                                 {type === "back" ? "Show your face 🔄" : "You're beautiful"}
                              </Text>
                           </TouchableOpacity>
                           <TouchableOpacity className="w-52 bg-green-600 p-4 rounded-2xl" disabled={!clicked} onPress={() => takePicture()}>
                              <Text className="font-semibold text-center"> BeenZer 📷 </Text>
                           </TouchableOpacity>
                        </View>
                     </View>
                  </Camera >
               )}
         </View>
      </>
   );
}

