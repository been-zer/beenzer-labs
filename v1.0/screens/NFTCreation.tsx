import { View, Text, ScrollView, SafeAreaView, ActivityIndicator, Linking, TouchableOpacity, Vibration } from 'react-native'
import { useState } from 'react'
import Footer from './Footer'
import { atomSOCKET } from '../services/socket';
import { useAtom } from 'jotai'
import { useNavigation } from '@react-navigation/native';


const NFTCreation = () => {

   const [mintLogs, setMintLogs] = useState<string[]>([])
   const [mintingOver, setMintingOver] = useState(false)
   const [SOCKET] = useAtom(atomSOCKET)
   const navigation = useNavigation<any>();

   SOCKET.on('mintLogs', (data: string) => {
      if (data != 'true') {
         setMintLogs([...mintLogs, data])
         console.log(mintLogs)
      } else {
         setMintingOver(true);
         Vibration.vibrate();
         // setMintLogs([]);
      }
   })

   function makeClickable(log: any): any {
      const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
      const url = log.match(urlRegex);
      if (url) {
         return log.replace(url, <Text style={{ color: 'blue' }} onPress={() => Linking.openURL(url)}>{url}</Text>);
      } else {
         return log;
      }
   }

   return (
      <SafeAreaView className="bg-zinc-900 h-screen ">
         <ScrollView className='ml-5 mr-5 bg-zinc-800'>
            <View className='border border-white rounded-xl  '>
               {mintLogs.map((log, index) => {
                  return (
                     <View className='p-3 mt-1 text-[#3f6212]' key={index}>
                        <View>
                           <Text className='mt-1 text-lg text-white text-center px-4'>✅ {makeClickable(log)}</Text>
                        </View>
                     </View>
                  )
               })}
            </View >
            {!mintingOver && <ActivityIndicator size="large" color="green" />}
            <TouchableOpacity
               className="mt-2 w-full bg-green-600  p-4 rounded-2xl"
               onPress={() => navigation.navigate('Home')}
            >
               <Text className="font-semibold text-center">Back to Home</Text>
            </TouchableOpacity>
         </ScrollView >

         <Footer />
      </SafeAreaView >
   );
};

export default NFTCreation