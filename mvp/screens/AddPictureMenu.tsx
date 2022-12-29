import { View, TouchableOpacity, Text, StyleSheet, Alert, SafeAreaView, ScrollView } from "react-native"
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import Footer from "../components/Footer";
import Header from "../components/Header";

const AddPictureMenu = ({
  openCamera,
  mintingOver,
}: {
  openCamera: any;
  mintingOver: boolean
}) => {

  const navigation = useNavigation<NavigationProp<ParamListBase>>()

  return (
    <SafeAreaView className="bg-zinc-900 h-screen">
      <ScrollView>
        <Header title="Profile" />
        <View style={
          {
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginTop: 20,
            marginBottom: 20
          }
        }>
          <TouchableOpacity
            className=" w-52 bg-green-600  p-4 rounded-2xl mt-4 mb-4"
            onPress={() => Alert.alert("Coming soon 😉")}
          >
            <Text className="font-semibold text-center ml-6">
              New Beenzer 🎤
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className=" w-52 bg-green-600  p-4 rounded-2xl mt-4 mb-4"
            onPress={() => Alert.alert("Coming soon 😉")}
          >
            <Text className="font-semibold text-center">
              New Beenzer 🎥
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="  w-52 bg-green-600  p-4 rounded-2xl mt-4 mb-4"
            onPress={openCamera}
          >
            <Text className="font-semibold text-center">
              New Beenzer 📸
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView >
  );
};


export default AddPictureMenu;