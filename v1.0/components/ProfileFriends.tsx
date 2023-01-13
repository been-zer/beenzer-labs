import { View, Text, KeyboardAvoidingView, ScrollView, SafeAreaView, Platform, TouchableOpacity, FlatList, Image } from 'react-native'
import { Searchbar } from 'react-native-paper';
import React, { useState, useEffect } from 'react'
import { atomSOCKET } from '../services/socket';
import { useAtom } from 'jotai'
import { IProfile } from '../Types';
import { socketFriends, socketAddFriend } from '../services/socket/function';
import { atomProfile } from '../services/globals';


const ProfileFriends = () => {
   const [searchQuery, setSearchQuery] = useState('');
   const [users, setUsers] = useState<IProfile[]>([]);
   const [SOCKET] = useAtom(atomSOCKET);
   const [profile, setProfile] = useAtom(atomProfile)

   useEffect(() => {
      const searchFriends = async (searchQuery: string) => {
         const res = await socketFriends(SOCKET, searchQuery)
         setUsers(res)
         console.log('res', res)
      }
      searchFriends(searchQuery)
   }, [searchQuery])

   const onChangeSearch = (query: string) => setSearchQuery(query);

   const addFriends = async (pubkeyFriends: string) => {
      const ans = await socketAddFriend(SOCKET, profile[0].__pubkey__, pubkeyFriends)
      console.log('ans', ans)
   }

   return (
      <>
         <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            className="mt-4 mr-2 ml-2"
         />
         {
            users.map((item, index) => {
               return (
                  <View className='mr-2 ml-2'>
                     <TouchableOpacity onPress={() => console.log('navigate to friend profile')}>
                        <View className='flex flex-row items-center mt-2'>
                           <View className='flex-1 flex-row'>
                              <Image source={item._pfp ? { uri: item._pfp } : require('../assets/newUser.png')} style={{ width: 50, height: 50, borderWidth: 1 }} />
                              <Text className='text-white font-bold text-lg ml-1 mb-1'>{item._username_}</Text>
                           </View>
                           <TouchableOpacity onPress={() => addFriends(item.__pubkey__)}>
                              <View className='bg-green-500 rounded-full w-10 h-10 ml-2 flex items-center justify-center'>
                                 <Text className='text-white text-xl font-bold'>+</Text>
                              </View>
                           </TouchableOpacity>
                        </View>
                        <Text className='text-white mb-2'>{item.__pubkey__}</Text>
                     </TouchableOpacity>
                  </View>
               )
            })}
         <View className='h-96'></View>
      </>
   )
}

export default ProfileFriends