import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, Alert, SafeAreaView, ScrollView } from "react-native"

const BeenzerMedia = ({ title, menu }: { title: string, menu: string }) => {

   const navigation = useNavigation<NavigationProp<ParamListBase>>();

   const handleClick = (beenzer: string) => {
      if (beenzer === 'audio') {
         Alert.alert('Audio Beenzer', 'Coming soon')
      } else if (beenzer === 'photo') {
         navigation.navigate('zzPicture')
      } else if (beenzer === 'video') {
         Alert.alert('Video Beenzer', 'Coming soon')
      }
   }

   return (
      <TouchableOpacity
         className=" w-52 bg-green-600  p-4 rounded-2xl mt-4 mb-4"
         onPress={() => handleClick(menu)}
      >
         <Text className="font-semibold text-center ml-6">
            {title}
         </Text>
      </TouchableOpacity>
   )
}

export default BeenzerMedia