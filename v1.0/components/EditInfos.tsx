import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react'
import { IUpdateUser } from '../Types'



const EditInfos = ({
   userInfo,
   sockName,
   newData,
   setNewValue }: {
      userInfo: string, sockName: string, newData: IUpdateUser | undefined, setNewValue: any
   }) => {

   const handleUsername = (text: string) => {
      setNewValue((prev: []) => ({ ...prev, [sockName]: text }))
   }

   return (
      <View className='justify-start'>

         <Text className='text-white'>{userInfo}</Text>
         <TextInput
            value={
               userInfo === 'Username' ? newData?._username_ :
                  userInfo === 'Bio' ? newData?._description :
                     userInfo === 'Firstname' ? newData?._name :
                        userInfo === 'Email' ? newData?._email :
                           userInfo === 'Birthday' ? newData?._birthdate :
                              userInfo === 'Phone' ? newData?._phone :
                                 userInfo === 'City' ? newData?._city :
                                    userInfo === 'Country' ? newData?._country : ""
            }
            className='border-2 border-green-600 text-white rounded-lg w-80 h-10 my-2 p-3'
            onChangeText={handleUsername}
            keyboardType={userInfo === 'Phone' || userInfo === 'Birthday' ? 'phone-pad' : 'default'}
         />
      </View>
   )
}

export default EditInfos