import { View, Text, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { SOCKET, socketAddFriend, socketDeleteFriend } from "../services/socket"
import { User } from '../types/types';



export default function FriendProfile({ publicKey, route }: any) {
  const { user } = route.params
  const [friend, setFriend] = React.useState(false)
  const [follower, setFollower] = React.useState(false)
  const [pubkey, setPubkey] = React.useState('')
  const [pubkey2, setPubkey2] = React.useState('')



  const addFriend = (pubkey: string, pubkey2: string) => {
    socketAddFriend(pubkey, pubkey2)
    setFriend(true)
  }
  const deleteFriend = (pubkey: string, pubkey2: string) => {
    socketDeleteFriend(pubkey, pubkey2)
    console.log("delete friend")
    setFriend(false)
  }

  React.useEffect(() => {
    SOCKET.emit("addFriend", pubkey, pubkey2);
    console.log("pubkey", pubkey)
    SOCKET.on("addFriendRes", (res: boolean) => {
      return res;
    });
  }, [])

  React.useEffect(() => {
    SOCKET.emit("deleteFriend", pubkey, pubkey2);
    SOCKET.on("deleteFriendRes", (res: boolean) => {
      return res;
    });
  }, [])

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#18181b' }}>
      <Header title={user._username_} />
      <View className='border border-white' style={{ flex: 1, backgroundColor: '#18181b' }}>
        {/* <Image
          className='border border-white'
            style={{ width: 140, height: 140, borderRadius: 10, alignSelf: 'center', marginTop: 20 }}
            source={{ uri: user._avatar }}
          /> */}
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
          <View className='w-96 right-2' style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>
              {user._username_}
            </Text>
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'normal' }}>
              {user.__pubkey__}
            </Text>
            {!friend ? (
              <TouchableOpacity style={{ backgroundColor: '#3f6212', borderRadius: 10, padding: 10, marginTop: 10 }} onPress={() => addFriend(publicKey, user.__pubkey__)}  >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                  Add Friend
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{ backgroundColor: '#3f6212', borderRadius: 10, padding: 10, marginTop: 10 }} onPress={() => deleteFriend(publicKey, user.__pubkey__)} >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                  Delete Friend
                </Text>
              </TouchableOpacity>
            )}
            {!follower ? (
              <TouchableOpacity style={{ backgroundColor: '#3f6212', borderRadius: 10, padding: 10, marginTop: 10 }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                  Follow
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{ backgroundColor: '#3f6212', borderRadius: 10, padding: 10, marginTop: 10 }} onPress={() => deleteFriend(user.__pubkey__, user.__pubkey__)} >
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                  Delete Friend
                </Text>
              </TouchableOpacity>
            )}
            {!follower ? (
              <TouchableOpacity style={{ backgroundColor: '#3f6212', borderRadius: 10, padding: 10, marginTop: 10 }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                  Follow
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={{ backgroundColor: '#3f6212', borderRadius: 10, padding: 10, marginTop: 10 }}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                  UnFollow
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </SafeAreaView>


  )
}

