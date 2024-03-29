import { View, Text, TouchableOpacity, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { useAtom } from 'jotai'
import { atomProfile, atomFollowing } from '../services/globals'
import { atomSOCKET } from '../services/socket'
import { socketGetFollowing } from '../services/socket/function'
import { IProfile } from '../Types'

const FollowBlock = ({ data }: { show: string, data: IProfile[] }) => {

   const [profile, setProfile] = useAtom(atomProfile)
   const [SOCKET] = useAtom(atomSOCKET)

   return (
      <>
         {data &&
            data.map((item: IProfile, index: number) => {
               return (
                  <View key={item.__pubkey__} >
                     <View className='mr-2 ml-2 flex-row justify-between' >
                        <TouchableOpacity onPress={() => console.log('navigate to friend profile')}>
                           <View className='flex flex-row items-center mt-2'>
                              <View className='flex-row'>
                                 <Image source={item._pfp ? { uri: item._pfp } : require('../assets/newUser.png')} style={{ width: 50, height: 50, borderWidth: 1, borderColor: 'white', borderRadius: 50 }} />
                                 <Text className='text-white font-bold text-lg ml-2 mb-1 self-center'>{item._username_}</Text>
                              </View>
                           </View>
                        </TouchableOpacity>
                     </View>
                     <Text className='text-white mb-2'>{item.__pubkey__}</Text>
                  </View>
               )
            })}
      </>
   )
}

export default FollowBlock