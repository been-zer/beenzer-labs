import { View, TouchableOpacity, Text, StyleSheet } from "react-native"
import { Camera, CameraType, CameraPictureOptions, CameraCapturedPicture } from 'expo-camera'
import { useState } from "react"
import * as ScreenOrientation from 'expo-screen-orientation';
import Preview from "./Preview"

const Takepicture = ({ camera, type, setCamera, toggleCameraType, previewVisible, takePicture, capturedImage, setPictureSaved, retakePicture,
   setCameraOpen }: any) => {

   const handlePress = async () => {
      takePicture()
   }

   return (
      previewVisible && capturedImage ? (
         <Preview
            capturedImage={capturedImage}
            retakePicture={retakePicture}
            setPictureSaved={setPictureSaved}
            setCameraOpen={setCameraOpen}
         />
      ) : (
         <>
            <Camera
               type={type}
               style={{ flex: 1, width: "100%" }}
               ref={(ref) => {
                  setCamera(ref as Camera);
               }}
            />
            <View
               className="flex-row"
               style={{
                  position: "absolute",
                  bottom: 30,
               }}
            >
               <View className="flex-1 self-center items-center">
                  <View className="flex-1 flex-row items-center content-center border-2 border-indigo-50">
                     <View className="bg-transparent flex-1 aspect-square" />
                  </View>
                  <TouchableOpacity
                     className="flex-1 items-center mt-10"
                     onPress={toggleCameraType}
                  >
                     <Text style={styles.text}>
                        {type === "back" ? "Show your face" : "You're beautiful"}
                     </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                     className="mb-10 mt-1 w-52 bg-green-600  p-4 rounded-2xl mx-28"
                     onPress={handlePress}
                  >
                     <Text className="font-semibold text-center"> BeenZer 📷 </Text>
                  </TouchableOpacity>
               </View>
            </View>
         </>)
   )
}

const styles = StyleSheet.create({
   text: {
      fontSize: 18,
      fontWeight: 'bold',
      color: 'white',
      marginBottom: 20,
   },
});


export default Takepicture;