import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { atomUserNFTs, atomProfile } from '../services/globals'
import { INFT } from '../Types'
import Properties from './Properties'
import ProfileMap from './ProfileMap'
import { ActivityIndicator } from 'react-native-paper'

const ProfileCollection = ({ setShowDetails, showDetails }: { showDetails: boolean, setShowDetails: any }) => {
   const [userNFTs, setUserNFTs] = useAtom(atomUserNFTs);
   const [profile, setProfile] = useAtom(atomProfile);
   const [NFTselected, setNFTselected] = useState<INFT | null>(null);
   const [userNFTsReverse, setUserNFTsReverse] = useState<INFT[]>([]);

   const handleShowDetails = (item: INFT) => {
      setShowDetails(true);
      setNFTselected(item);
   }

   const newProfilPic = (link: string) => {
      console.log(link);
   }

   useEffect(() => {
      setUserNFTsReverse(userNFTs.reverse());
   }, [userNFTs])

   return (
      <>
         {!showDetails && userNFTs.length > 0 &&
            <View className="flex flex-col items-center">
               <FlatList
                  className='mt-2'
                  data={userNFTsReverse}
                  numColumns={2}
                  renderItem={({ item }) => {
                     const borderColor = item._creator === profile[0].__pubkey__ ? 'black' : 'green';
                     return (
                        <>
                           <TouchableOpacity onPress={() => handleShowDetails(item)} onLongPress={() => newProfilPic(item._asset)}>
                              <View className="flex flex-col items-center">
                                 <Text className='text-white font-bold'>BEENZER #{item._id_}</Text>
                                 {item._asset ?
                                    <Image
                                       source={{ uri: item._asset }}
                                       style={{ width: 150, height: 150, marginRight: 10, marginLeft: 10, borderWidth: 1, borderColor, borderRadius: 10 }}
                                    /> : <ActivityIndicator
                                       className="self-center m-10"
                                       size="large"
                                       color="green"
                                    />}
                              </View>
                           </TouchableOpacity>
                        </>
                     );
                  }}
                  keyExtractor={(item) => item.__token__}
               />
            </View>
         }
         {userNFTs.length == 0 &&
            <Text className='text-white text-2xl mt-2'>No BEENZER yet</Text>}
         {showDetails &&
            <>
               <View className="flex justify-center align-center ">
                  <Text className='text-2xl font-bold text-white text-center'>
                     Beenzer #{NFTselected?._id_}
                  </Text>
                  <View className="flex justify-center align-center mr-2 ml-2 ">
                     <Image
                        style={{ height: 500, width: 500, resizeMode: 'center' }}
                        className="shadow-md shadow-white rounded-2xl "
                        source={{ uri: NFTselected?._asset }} />
                  </View>
               </View>
               <View className='mt-2 '>
                  <Text className='text-green-800 text-xl'>PROPERTIES</Text>
               </View>
               <View className='flex-row flex-wrap mt-2 justify-start'>
                  <Properties props={NFTselected?._description} propsTitle={'DESCRIPTION'} />
                  <Properties props={NFTselected?._latitude} propsTitle={'LATITUDE'} />
                  <Properties props={NFTselected?._longitude} propsTitle={'LONGITUDE'} />
                  <Properties props={NFTselected?._city} propsTitle={'CITY'} />
                  <Properties props={NFTselected?._username} propsTitle={'USERNAME'} />
                  <Properties props={NFTselected?._creator} propsTitle={'CREATOR'} />
               </View>
               <ProfileMap uniqueNFTs={NFTselected} />
            </>
         }
      </>
   )
}

export default ProfileCollection
