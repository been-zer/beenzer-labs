import { View, Text, SafeAreaView, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native'
import { SOCKET } from "../services/socket";


const EditProfile = ({ username, setUsername, profile, setEditProfile, description, setDescription }: { username: string, setUsername: any, profile: any, setEditProfile: any, description: any, setDescription: any }) => {

   const regex = new RegExp(/(\s*([\0\b\'\"\n\r\t\%\_\\]*\s*(((select\s*.+\s*from\s*.+)|(insert\s*.+\s*into\s*.+)|(update\s*.+\s*set\s*.+)|(delete\s*.+\s*from\s*.+)|(drop\s*.+)|(truncate\s*.+)|(alter\s*.+)|(exec\s*.+)|(\s*(all|any|not|and|between|in|like|or|some|contains|containsall|containskey)\s*.+[\=\>\<=\!\~]+.+)|(let\s+.+[\=]\s*.*)|(begin\s*.*\s*end)|(\s*[\/\*]+\s*.*\s*[\*\/]+)|(\s*(\-\-)\s*.*\s+)|(\s*(contains|containsall|containskey)\s+.*)))(\s*[\;]\s*)*)+)/i)

   const updateUsername = () => {
      if (!username.match(regex)) {

         const pubkey = profile[0].__pubkey__ as string
         const update = '_username_'
         const value = username
         SOCKET.emit('updateUser', pubkey, update, value)
         Alert.alert('Your username has been updated')
      }
   }

   const back = () => {
      setEditProfile(false)
   }

   const updateDescription = () => {
      if (!username.match(regex)) {

         const pubkey = profile[0].__pubkey__ as string
         const update = '_description'
         const value = description
         SOCKET.emit('updateUser', pubkey, update, value)
         SOCKET.on('updateUserRes', val => console.log("update?", val))
         Alert.alert('Your description has been updated')

      }
   }

   const handleUsername = (text: string) => {
      if (!text.match(regex)) {
         setUsername(text.replace(/ /g, ''))
      }
      else {
      }
   }
   const handleDescription = (text: string) => {
      if (!text.match(regex)) {
         setDescription(text)
      }
      else {
         console.log('no')
      }
   }

   return (
      <SafeAreaView className='bg-zinc-900' >
         <ScrollView>
            <View className='flex flex-col justify-begin items-center h-full'>
               <Text className='text-3xl text-green-600'>Edit profile</Text>
               <TextInput
                  className='border-2 border-green-600 text-white rounded-lg w-80 h-10 my-4 p-3'
                  placeholder='Username'
                  placeholderTextColor='white'
                  onChangeText={handleUsername}
               />
               <TouchableOpacity className=" w-52 bg-green-600  p-4 rounded-2xl" onPress={updateUsername} >
                  <Text className="font-semibold text-center" > Update my username </Text>
               </TouchableOpacity>
               <TextInput
                  className='border-2 border-green-600 text-white rounded-lg w-80 h-10 my-4 p-3'
                  placeholder='Description'
                  placeholderTextColor='white'
                  onChangeText={handleDescription}
               />
               <TouchableOpacity className=" w-52 bg-green-600  p-4 rounded-2xl" onPress={updateDescription} >
                  <Text className="font-semibold text-center" > Update my description </Text>
               </TouchableOpacity>
               <TouchableOpacity className=" w-52 bg-green-600 mt-4 p-4 rounded-2xl" onPress={back} >
                  <Text className="font-semibold text-center" > Back</Text>
               </TouchableOpacity>
            </View>
         </ScrollView>
      </SafeAreaView>
   )
}

export default EditProfile