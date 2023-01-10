import { View, Text, Modal, SafeAreaView, TouchableOpacity, FlatList, Image } from 'react-native'
import { atomUserNFTs } from '../services/globals/'
import { useAtom } from 'jotai'
import { INFT } from '../Types'

const EditProfilePic = ({ setModalVisible, setSelectedPicture, modalVisible }: any) => {

   const [userNFTs, setUserNFTs] = useAtom(atomUserNFTs)


   const closePictureModal = () => {
      setModalVisible(false);
   }

   const selectPicture = (picture: INFT) => {
      setSelectedPicture(picture);
      setModalVisible(false);
   }

   return (

      <Modal
         animationType="slide"
         transparent={false}
         visible={modalVisible}
         onRequestClose={closePictureModal}
      >
         <SafeAreaView className='bg-zinc-900 items-center'>
            <TouchableOpacity onPress={closePictureModal}>
               <Text className='mb-5 text-red-600 font-extrabold text-xl'>Cancel</Text>
            </TouchableOpacity>
            <FlatList
               numColumns={3}
               data={userNFTs}
               renderItem={({ item }) => (
                  <View className='items-center'>
                     <TouchableOpacity onPress={() => selectPicture(item)}>

                        <Image
                           source={{ uri: item._asset }}
                           style={{ marginBottom: 20 }}
                           className="h-28 w-28 rounded-full m-1"
                        />
                     </TouchableOpacity>
                  </View>
               )}
               keyExtractor={item => item.__token__}
            />
         </SafeAreaView>
      </Modal>
   )
}

export default EditProfilePic