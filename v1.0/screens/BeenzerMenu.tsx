import { View, TouchableOpacity, Text, StyleSheet, Alert, SafeAreaView, ScrollView } from "react-native"
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import Footer from "./Footer";
import BeenzerPhoto from "./BeenzerPhoto";
import BeenzerVideo from "./BeenzerVideo";
import BeenzerAudio from "./BeenzerAudio";

const BeenzerMenu = () => {

   return (
      <SafeAreaView className='h-full bg-zinc-900 flex-1 ' style={StyleSheet.absoluteFillObject}>
         <ScrollView >
            <View className="flex-1 justify-evenly items-center my-20">
               <BeenzerAudio />
               <BeenzerVideo />
               <BeenzerPhoto />
            </View>
         </ScrollView>
         <Footer />
      </SafeAreaView >
   )
};

export default BeenzerMenu;