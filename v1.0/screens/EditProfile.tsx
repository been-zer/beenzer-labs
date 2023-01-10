import { View, Text, SafeAreaView, ScrollView, TextInput, TouchableOpacity, Image, Modal, FlatList } from 'react-native'
import { useAtom } from 'jotai'
import { atomProfile } from '../services/globals'
import EditInfos from '../components/EditInfos'
import { useState } from 'react'
import { INFT, IUpdateUser } from '../Types'
import EditProfilePic from '../components/EditProfilePic'
import { updateUserProfile } from '../services/socket/function'
import { atomSOCKET } from '../services/socket'

const EditProfile = () => {

   const [profile, setProfile] = useAtom(atomProfile)
   const [modalVisible, setModalVisible] = useState(false);
   const [selectedPicture, setSelectedPicture] = useState<INFT>();
   const [SOCKET] = useAtom(atomSOCKET)
   const [newData, setNewValue] = useState<IUpdateUser>()

   const openPictureModal = () => {
      setModalVisible(true);
   }

   const updateUser = () => {
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_username_', newData?._username_)
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_description', newData?._description)
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_name', newData?._name)
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_email', newData?._email)
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_birthdate', newData?._birthdate)
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_phone', newData?._phone)
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_city', newData?._city)
      updateUserProfile(SOCKET, profile[0].__pubkey__, '_country', newData?._country)
   }

   return (
      <SafeAreaView className='bg-zinc-900 flex-1' >
         <ScrollView>
            <View className='items-center'>
               <TouchableOpacity onPress={openPictureModal} >
                  <Image className=" h-28 w-28 rounded-full"
                     source={
                        selectedPicture ?
                           { uri: selectedPicture._asset } :
                           require("../assets/newUser.png")
                     }
                  />
                  <Text className='text-white mt-1'>Edit profile picture</Text>
               </TouchableOpacity>
            </View>
            <EditProfilePic setModalVisible={setModalVisible} setSelectedPicture={setSelectedPicture} modalVisible={modalVisible} />
            <View className='flex flex-col justify-begin items-center h-full'>
               <EditInfos userInfo='Username' sockName={'_username_'} newData={newData} setNewValue={setNewValue} />
               <EditInfos userInfo='Bio' sockName={'_description'} newData={newData} setNewValue={setNewValue} />
               <EditInfos userInfo='Firstname' sockName={'_name'} newData={newData} setNewValue={setNewValue} />
               <EditInfos userInfo='Email' sockName={'_email'} newData={newData} setNewValue={setNewValue} />
               <EditInfos userInfo='Birthday' sockName={'_birthdate'} newData={newData} setNewValue={setNewValue} />
               <EditInfos userInfo='Phone' sockName={'_phone'} newData={newData} setNewValue={setNewValue} />
               <EditInfos userInfo='City' sockName={'_city'} newData={newData} setNewValue={setNewValue} />
               <EditInfos userInfo='Country' sockName={'_country'} newData={newData} setNewValue={setNewValue} />
               <TouchableOpacity className=" w-52 bg-green-600 mt-4 p-4 rounded-2xl" onPress={updateUser} >
                  <Text className="font-semibold text-center" > Save</Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </SafeAreaView >
   )
}

export default EditProfile