import { ImageBackground, TouchableOpacity, StyleSheet, Text } from "react-native";


const Preview = ({ capturedImage, retakePicture, setPictureSaved, setCameraOpen }:
{
    capturedImage: any,
    retakePicture: () => void,
    setPictureSaved: (pictureSaved: boolean) => void,
    setCameraOpen: (cameraOpen: boolean) => void,
}) => {

const handleSave = () => {
    setPictureSaved(true)
    setCameraOpen(false)

}

return (

    <ImageBackground className="items-center justify-end"
        source={{ uri: capturedImage && capturedImage.uri }}
        style={{
        flex: 1
        }}
    >
    <TouchableOpacity className="mt-1 w-52 bg-green-600  p-4 rounded-2xl mx-28" onPress={handleSave} >
        <Text className="font-semibold text-white text-center" > Keep my Beenzer </Text>
    </TouchableOpacity>
    <TouchableOpacity className="mb-10 mt-1 w-52 bg-red-600  p-4 rounded-2xl mx-28" onPress={retakePicture} >
        <Text className="font-semibold text-white text-center" > Do another one </Text>
    </TouchableOpacity>
    </ImageBackground>

)
}

export default Preview;

const styles = StyleSheet.create({
  text: {
      fontSize: 50,
      fontWeight: 'bold',
      color: 'red',
      bottom: 0,
  },
  textSave: {
      fontSize: 30,
      fontWeight: 'bold',
      color: 'white',
      bottom: 0,
  },
  button: {
      flex: 1,
      alignItems: 'center',
      bottom: 0,

  },
  buttonSave: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'flex-end',
      marginBottom: 40,
      // backgroundColor: 'green',
  },
});
