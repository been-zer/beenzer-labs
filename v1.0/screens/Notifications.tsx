import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import NFTCreation from './NFTCreation'
import DisplayButton from '../components/DisplayButton'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';

const Notifications = () => {

   const [display, setDisplay] = useState('Notifications')
   const navigation = useNavigation<NavigationProp<ParamListBase>>();


   return (
      <SafeAreaView className='h-full bg-zinc-900 flex-1'>
         <View className='flex-row justify-around'>
            <DisplayButton title='Notifications' setDisplay={setDisplay} display={display} />
            <DisplayButton title='Logs' setDisplay={setDisplay} display={display} />
         </View>
         {display === 'Logs' && <NFTCreation />}
         {display === 'Notifications' &&
            <View className='flex-1 justify-center items-center'>
               <Text className='text-white text-2xl'>No notifications yet</Text>
            </View>}
         <View className=' justify-center items-center'>
            <TouchableOpacity
               className="mt-2 w-1/2 bg-green-600  p-4 rounded-2xl "
               onPress={() => navigation.navigate('Home')}
            >
               <Text className="font-semibold text-center">Back to Home</Text>
            </TouchableOpacity>
         </View>
      </SafeAreaView>
   )
}

export default Notifications