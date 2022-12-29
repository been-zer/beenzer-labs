import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { MapIcon, UserIcon, UsersIcon, ChatBubbleOvalLeftEllipsisIcon, PlusCircleIcon } from 'react-native-heroicons/outline'
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, ParamListBase } from '@react-navigation/native'

export default function Footer() {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <View className=' flex-row rounded-md px-2 py-2 sticky justify-between items-center bg-zinc-900/20 backdrop-blur-3xl bg-clip-padding shadow-lg ' style={{
    }}>
      <TouchableOpacity className=' flex-col   items-center w-16 h-16   ' onPress={() => navigation.navigate('Home')}>
        <MapIcon size={35} color='#16a34a' />
        <Text className='text-gray-100 hover:text-white h-10'>Map</Text>
      </TouchableOpacity>

      <TouchableOpacity className=' flex-col   items-center w-16 h-16    ' onPress={() => navigation.navigate('Friends')}>
        <UsersIcon size={35} color='#16a34a' />
        <Text className='text-gray-100 hover:text-white h-10'>Friends</Text>
      </TouchableOpacity>

      <TouchableOpacity className=' flex-col  items-center w-24 h-16    ' onPress={() => navigation.navigate('AddPicture')}>
        <PlusCircleIcon size={35} color='#16a34a' />
        <Text className='text-gray-100 hover:text-white'>Beenzer</Text>
      </TouchableOpacity>

      <TouchableOpacity className=' flex-col  items-center w-20 h-16    ' onPress={() => navigation.navigate('Messages')}>
        <ChatBubbleOvalLeftEllipsisIcon size={35} color='#16a34a' />
        <Text className='text-gray-100 hover:text-white h-10'>Messages</Text>
      </TouchableOpacity>

      <TouchableOpacity className=' flex-col  items-center w-16 h-16    ' onPress={() => navigation.navigate('Profile')}>
        <UserIcon size={35} color='#16a34a' />
        <Text className='text-gray-100  hover:text-white h-10'>Profile</Text>
      </TouchableOpacity>
    </View>
  )
}