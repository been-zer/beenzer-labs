import React from 'react'
import { Text, SafeAreaView, ScrollView, View, Image } from 'react-native'
import Header from '../components/Header';
import { userNFTs } from '../types/types';

const NFTsDetails = ({ NFTselected }: { NFTselected: userNFTs }) => {
   console.log('NFTselected', NFTselected)
   return (
      <SafeAreaView className="bg-zinc-900 h-screen w-screen android:mt-6">
         <Header title="Profile" />
         <ScrollView>
            <View className="flex justify-center align-center ">
               <Text className='text-2xl text-bold text-white text-center p-2'>
                  Beenzer #{NFTselected.Number}
               </Text>
            </View>
            <View className="flex justify-center align-center ">
               <Image
                  className="h-[350px] rounded-xl m-4 border shadow-xl shadow-white"
                  source={{ uri: NFTselected.Link }} />
            </View>

            <View className="flex content-center justify-center align-center border border-white mb-2 rounded-2xl">
               <View className="flex w-80">
                  <Text className='text-xl text-bold text-white text-left p-2  '>
                     Description
                  </Text>
                  <Text className='text-xl text-bold text-white text-left p-2'>
                     {NFTselected.Description}
                  </Text>
               </View>
            </View>
            {Object.keys(NFTselected).map((key) => {
               return (
                  <View className="flex content-center justify-center align-center border border-white mb-2 rounded-2xl ">
                     <View className="flex w-80">
                        <Text className='text-xl  text-bold text-white text-left p-2'>
                           {key}
                        </Text>
                        <Text className='text-xl text-bold text-white text-left p-2'>
                           {NFTselected[key]}
                        </Text>
                     </View>
                  </View>
               )
            })}
         </ScrollView >
      </SafeAreaView >

   )
}

export default NFTsDetails