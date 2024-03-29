import { View, Text, KeyboardAvoidingView, ScrollView, SafeAreaView, Platform, TouchableOpacity, FlatList, Image } from 'react-native'
import { Searchbar } from 'react-native-paper';
import React, { useState, useEffect } from 'react'
import { atomSOCKET } from '../services/socket';
import { useAtom } from 'jotai'
import { IProfile } from '../Types';
import { socketGetFriends, socketGetFollowing, socketGetFollower } from '../services/socket/function';
import { atomProfile, atomFollowing, atomFollower } from '../services/globals';
import { atomUserFriends } from '../services/globals';
import DisplayButton from './DisplayButton';
import FriendSearch from './FriendSearch';
import FollowBlock from './FollowBlock';

const ProfileFriends = () => {
   const [SOCKET] = useAtom(atomSOCKET);
   const [profile, setProfile] = useAtom(atomProfile)
   const [userFriends, setUserFriends] = useAtom(atomUserFriends);
   const [friendsChanged, setFriendsChanged] = useState(false);
   const [display, setDisplay] = useState('Friends')
   const [following, setFollowing] = useAtom(atomFollowing)
   const [follower, setFollower] = useAtom(atomFollower)

   useEffect(() => {
      const getFriends = async (pubkey: string) => {
         const res = await socketGetFriends(SOCKET, pubkey)
         setUserFriends(res)
      }
      const getUserFollowing = async (pubkey: string) => {
         const res = await socketGetFollowing(SOCKET, pubkey)
         setFollowing(res)
      }
      const getUserFollowers = async (pubkey: string) => {
         const res = await socketGetFollower(SOCKET, pubkey)
         setFollower(res)
      }
      getFriends(profile[0].__pubkey__)
      getUserFollowing(profile[0].__pubkey__)
      getUserFollowers(profile[0].__pubkey__)

   }, [friendsChanged])


   return (
      <>
         <View className='flex-row justify-evenly mt-2'>
            <DisplayButton title='Friends' display={display} setDisplay={setDisplay} />
            <DisplayButton title='Followers' display={display} setDisplay={setDisplay} />
            <DisplayButton title='Following' display={display} setDisplay={setDisplay} />
            <DisplayButton title='🔎 Search' display={display} setDisplay={setDisplay} />
         </View>
         {display === 'Friends' && <FollowBlock show={'friends'} data={userFriends} />}
         {display === 'Followers' && <FollowBlock show={'followers'} data={follower} />}
         {display === 'Following' && <FollowBlock show={'following'} data={following} />}
         {display === '🔎 Search' && <FriendSearch />}
         <View className='h-96'></View>
      </>

   )
}

export default ProfileFriends