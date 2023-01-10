import { useState } from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native'
import { mapStyle } from '../services/globals'
import { ArrowRightOnRectangleIcon, PencilSquareIcon } from "react-native-heroicons/solid"
import { useAtom } from 'jotai'
import { atomProfile, atomUserLocation } from '../services/globals'
import GradientText from "../components/GradientText"
import MapView from 'react-native-maps'
import ProfileTab from '../components/ProfileTab'
import ProfileCollection from '../components/ProfileCollection'
import ProfileMap from '../components/ProfileMap'
import ProfileFriends from '../components/ProfileFriends'
import Footer from './Footer'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'

const Profile = () => {

   const [profile, setProfile] = useAtom(atomProfile)
   const [userLocation, setUserLocation] = useAtom(atomUserLocation)
   const [showProfileTab, setShowProfileTab] = useState<string>('Profile')
   const [showDetails, setShowDetails] = useState(false);
   const navigation = useNavigation<NavigationProp<ParamListBase>>();

   const editProfile = () => {
      navigation.navigate<any>('EditProfile')
   }

   return (
      <SafeAreaView className="flex flex-col h-full bg-zinc-900">
         <ScrollView contentContainerStyle={styles.contentContainer}>
            <View className='flex flex-row justify-center items-end'>
               <View className="'flex flex-row justify-center items-end'">
                  <TouchableOpacity onPress={editProfile}><Image className=" h-28 w-28 rounded-full mb-2" source={
                     profile[0]._pfp ?
                        { uri: profile[0]._pfp } :
                        require("../assets/newUser.png")
                  }
                  />
                  </TouchableOpacity>
               </View>
               <TouchableOpacity
                  className="  "
                  onPress={editProfile}
               >
                  <PencilSquareIcon size={18} color="#30a24f" />
               </TouchableOpacity>
            </View>
            <View className="flex flex-col items-center mb-3">
               <Text className=" text-white text-6xl uppercase font-extrabold p-4">
                  {profile[0]._username_}
               </Text>
               <GradientText text={profile[0]._description || "No description yet :("} className="uppercase font-extrabold mb-2" />
            </View>
            <View className='flex flex-row flex-wrap'>
            </View>
            <View className='flex flex-row justify-evenly'>
               <ProfileTab title='📷' component={'Collection'} setShowProfileTab={setShowProfileTab} setShowDetails={setShowDetails} />
               <ProfileTab title='🗺️' component={'ProfileMap'} setShowProfileTab={setShowProfileTab} setShowDetails={setShowDetails} />
               <ProfileTab title='👥' component={'ProfileFriends'} setShowProfileTab={setShowProfileTab} setShowDetails={setShowDetails} />
            </View>
            <View className='flex lex-col items-center'>
               {showProfileTab === 'Collection' && (
                  <>
                     <ProfileCollection setShowDetails={setShowDetails} showDetails={showDetails} />
                  </>
               )}
               {showProfileTab === 'ProfileMap' && (
                  <ProfileMap />
               )}
               {showProfileTab === 'ProfileFriends' && (
                  <ProfileFriends />
               )}
            </View>
         </ScrollView>
         <Footer />
      </SafeAreaView >
   )
}

export default Profile

const styles = StyleSheet.create({
   picture: {
      width: 100,
      height: 100,
      resizeMode: "cover"
   },
   contentContainer: {
      flexGrow: 1,
   },
});




