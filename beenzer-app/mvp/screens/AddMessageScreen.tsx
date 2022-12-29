import { View, Text, SafeAreaView, TextInput, Button } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import { ChatBubbleOvalLeftEllipsisIcon } from 'react-native-heroicons/solid'
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native'

const AddMessageScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const [input, setInput] = React.useState('')

  return (
    <SafeAreaView className='bg-zinc-900 h-screen'>
      <Header />
      <View className='border-b-2
      border-zinc-600 '>
      </View>
      <View className='bottom-12 left-28 '>
        <Text className='text-green-600 text-2xl font-bold'>New Message</Text>
      </View>

      <Text className='text-white bottom-8 text-xl font-bold'>To :</Text>
      <View className='flex  flex-col justify-center items-center'>
        <View style={{ height: 840 }} className="">
          <TextInput
            className=' text-white border-2
          border-green-700 bottom-7  rounded-lg w-96 h-10 my-4'
            placeholder='Search'
            placeholderTextColor='white'
            onChangeText={(text) => setInput(text)}
          />
          <View className=' w-20 left-72 bottom-44 sticky'>
            <Button title=' Chat' color="#30a24f" onPress={() => navigation.navigate("MessageScreen")} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default AddMessageScreen