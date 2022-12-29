import { View, Text, SafeAreaView, Image, ScrollView, TouchableOpacity, TextInput, StyleSheet, FlatList } from 'react-native'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import React from 'react'
import Header from '../components/Header';
import { ChatBubbleLeftRightIcon, CheckIcon, XMarkIcon } from 'react-native-heroicons/outline';
import {SOCKET, socketUserFriends} from "../services/socket"

export default function Messages({publicKey}: any)  {
  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  const [friends, setFriends] = React.useState<any>([])
  const [input, setInput] = React.useState('')


  React.useEffect(() => {
    SOCKET.emit("getUserFriends",publicKey);
    SOCKET.on("userFriends", (friends: Array<any>) => {
      console.log('Friends in useEffect =======>',friends);
      setFriends(friends);
    });
  }, []);

  React.useEffect(() => {
    console.log('Friends in messages =======>',friends);
  }, [friends]);

  return (
    <SafeAreaView className='flex  flex-col  h-full bg-zinc-900 '>
      <Header />
      <TouchableOpacity className='absolute top-12 right-0 m-4' onPress={() => navigation.navigate('AddMessageScreen')}>
        <ChatBubbleLeftRightIcon className='h-6 w-6' size={30} color='#30a24f' />
      </TouchableOpacity>
      <View className='flex flex-col items-center justify-center flex-1  ' >
        <Text className='text-2xl font-light text-green-600 bottom-12'>
          Messages
        </Text>
        <TextInput
          className='border-2 border-green-700 text-white bg-zinc-300 rounded-lg w-96 h-10 bottom-10 my-4 p-2'
          placeholder='Search'
          onChangeText={setInput}
          value={input}
        />
        {friends && friends.length ? <FlatList
        className=' rounded-lg w-96 h-96 bottom-10'
          data={friends}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }: any) => {
              return item ? <TouchableOpacity
              className='flex  flex-row items-center  justify-between w-96 h-20 bg-zinc-800 rounded-lg my-2'
              onPress={() =>
                navigation.navigate('MessageScreen', { friend: item })
              }
              >
              <View className='flex  flex-row items-center'>
                {/* <Image
                  className='h-12  w-12 rounded-full'
                  source={{ uri: item._avatar }}
                  /> */}
                <Text className='text-lg font-light ml-5 text-white'>
                  {item._username_}
                </Text>
              </View>
              <View className='flex flex-row items-center'>
                <Text className='font-light text-xs mt-10 right-12 text-white'>
                  {item.__pubkey__}
                </Text>
              </View>
            </TouchableOpacity> : <></>
          }}


          /> : <></>}
          </View>
          </SafeAreaView>
  )


}



// return (
//   <SafeAreaView className='flex flex-col  h-full bg-zinc-900 '>
//     <Header />
//     <TouchableOpacity className='absolute top-12 right-0 m-4' onPress={() => navigation.navigate('AddMessageScreen')}>
//       <ChatBubbleLeftRightIcon className='h-6 w-6' size={30} color='#30a24f' />
//     </TouchableOpacity>
//     <View className='flex flex-col items-center justify-center flex-1  ' >
//       <Text className='text-2xl font-light text-green-600 bottom-12'>
//         Messages
//       </Text>
//       <TextInput
//         className='border-2 border-green-700 text-white rounded-lg w-96 h-10 bottom-10 my-4 p-2'
//         placeholder='Search'
//         onChangeText={setInput}
//         value={input}
//       />
//       <View className='flex flex-col w-screen items-center justify-center flex-1  ' >
//         <FlatList
//         className=' w-96 h-96'
//           data={friends}
//           renderItem={({ item } : any)  =>  ( console.log(item),
//             <TouchableOpacity className="m-2  w-96 h-96" onPress={() => navigation.navigate('MessageScreen', { friend: item
//             })} >
//               <View className='flex  flex-1 border-2  border-white flex-row items-center justify-between w-full h-full rounded-lg' style={{ backgroundColor: '#15803d' }}>
//                 <View className='flex border-2  flex-row items-center'>
//                   <Image className='h-12 w-12 rounded-full' source={{ uri: item._avatar }} />
//                   <Text className='text-lg  font-light ml-4 text-white'>
//                   {item._username_}
//                   </Text>
//                 </View>
//                 <View className='flex flex-row items-center'>
//                   <Text className='text-sm font-light mt-10 right-48 text-white' >
//                   {item.__pubkey__}
//                   </Text>
//                 </View>
//               </View>
//               {/* <View className='flex flex-row items-center'>
//                 <Text className='text-sm font-light mt-10 right-48 text-white' >
//                   {item._lastMessage}
//                 </Text>
//               </View>
//               <View className='flex-row fixed mx-10 left-64 bottom-16  '>
//                 <Text className='text-sm font-light text-slate-400 mr-1 mb-8'>
//                   {item._lastMessageTime}
//                 </Text>
//               </View> */}
//             </TouchableOpacity>
//           )}
//           keyExtractor={(item : any ) => item.publicKey}
//         />
//       </View>
//     </View>
//   </SafeAreaView>
//   )


