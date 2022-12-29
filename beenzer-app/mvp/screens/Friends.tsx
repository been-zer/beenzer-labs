import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, FlatList, TextInput } from 'react-native'
import React from 'react'
import Header from '../components/Header';
import { XMarkIcon } from 'react-native-heroicons/outline'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { SOCKET } from "../services/socket"
import { User } from '../types/types';
import Footer from '../components/Footer';


export default function Friends() {
  // search for users by username and public key
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const [search, setSearch] = React.useState('')
  const [users, setUsers] = React.useState<User[]>([])

  const searchUser = (search: React.SetStateAction<string>) => {
    SOCKET.emit('searchUsers', search)
  }
  const handleSearch = (search: React.SetStateAction<string>) => {
    setSearch(search)
    searchUser(search)
  }
  React.useEffect(() => {
    SOCKET.emit("searchUsers", search);
    SOCKET.on("searchUsersRes", (users: User[]) => {
      console.log("Friendsssssssss", users);
      setUsers(users);
    });
  }, [])

  const deleteSearch = () => {
    setSearch('')
  }




  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#18181b' }}>
      <Header title="Friends" />
      <ScrollView>
        <View style={{ flex: 1, backgroundColor: '#18181b' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10 }}>
            <TextInput
               style={{borderBottomColor: '#c3e3df', borderBottomWidth: 1, width: '90%', borderColor: 'transparent', backgroundColor: '#ECECEC', padding: 10, color: 'grey', borderRadius: 30}}
              placeholder="Search"
              onChangeText={handleSearch}
              value={search}
            />
            <TouchableOpacity onPress={deleteSearch} >
              <XMarkIcon color='#3f6212' style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </View>
          <View style={{ flex: 1, backgroundColor: '#18181b' }}>
            <FlatList
              data={users}
              renderItem={({ item }: any) =>
              (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10, }}>
                  <TouchableOpacity onPress={() => navigation.navigate('FriendProfile', {
                    user: item
                  })}>
                    <View className=' w-96 ' style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {/* <Image source={{ uri: item._avatar }} style={{ width: 50, height: 50, borderRadius: 25}} /> */}
                      <View style={{ marginLeft: 10, width: 50 }}>
                        <Text className='text-white  w-96 ' style={{ fontSize: 16, fontWeight: 'bold' }}>{item._username_}</Text>
                        <Text className='text-white font-light  w-96' style={{ fontSize: 12, color: '#ffffff' }}>{item.__pubkey__}</Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item: any) => item.publicKey}
            />
          </View>
        </View>
      </ScrollView>
      <Footer />
    </SafeAreaView>
  )

}

