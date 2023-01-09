import {
   View, Text, ScrollView, SafeAreaView, ImageBackground, ActivityIndicator,
   StyleSheet, TextInput, TouchableOpacity
} from 'react-native'
import {
   atomPic, atomPin, atomUserLocation, atomPinCity, atomPhantomWalletPublicKey, atomProfile, mapStyle,
   atomDescription, atomSession, atomSharedSecret, atomDappKeyPair, atomTransacSuccess, atomDataPic
} from '../services/globals'
import { useAtom } from 'jotai'
import MapView, { Marker, Callout } from 'react-native-maps'
import { useEffect, useLayoutEffect, useRef } from 'react'
import { getCity } from '../services/globals/functions'
import { useNavigation } from '@react-navigation/native'
import { signAndSendTransaction } from '../services/phantom/sign'
import { socketMint } from '../services/socket/function'
import { atomSOCKET } from '../services/socket'


const PostBeenzer = () => {

   const [pic, setPic] = useAtom(atomPic)
   const [pin, setPin] = useAtom(atomPin)
   const [userLocation] = useAtom(atomUserLocation)
   const [pinCity, setPinCity] = useAtom(atomPinCity)
   const [phantomWalletPublicKey, setPhantomWalletPublicKey] = useAtom(atomPhantomWalletPublicKey)
   const [profile, setProfile] = useAtom(atomProfile)
   const [description, setDescription] = useAtom(atomDescription)
   const scrollViewRef = useRef<any>(null)
   const navigation = useNavigation()
   const [session, setSession] = useAtom(atomSession)
   const [sharedSecret, setSharedSecret] = useAtom(atomSharedSecret)
   const [dappKeyPair, setDappKeyPair] = useAtom(atomDappKeyPair)
   const [transacSuccess, setTransacSuccess] = useAtom(atomTransacSuccess)
   const [dataPic, setDataPic] = useAtom(atomDataPic)
   const [SOCKET] = useAtom(atomSOCKET)

   const scrollToBottom = () => {
      if (scrollViewRef.current) {
         scrollViewRef.current.scrollToEnd({ animated: true })
      }
   }

   useLayoutEffect(() => {
      navigation.setOptions({
         headerTitle: 'Drop Beenzer',
      })
   }, [navigation])

   useEffect(() => {
      if (userLocation.coords) {
         setPin({ latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude })
      }
   }, [userLocation])

   useEffect(() => {
      if (pin.latitude && pin.longitude) {
         const cityInfo = async () => {
            const city = await getCity(pin)
            setPinCity(city as any)
         }
         cityInfo()
      }
   }, [pin])

   useEffect(() => {
      if (transacSuccess) {
         socketMint(SOCKET,
            Buffer.from(dataPic.base64 as any, "base64"),
            "image/png",
            profile.__pubkey__,
            1,
            profile._username_,
            description,
            pinCity,
            pin.latitude,
            pin.longitude,
         )
         setTransacSuccess(false)
      }
   }, [transacSuccess])

   const createBeenzer = async () => {
      console.log('signAndSendTransaction')
      signAndSendTransaction(session, phantomWalletPublicKey, sharedSecret, dappKeyPair)
   }

   return (
      <>
         <SafeAreaView className="bg-zinc-800" style={StyleSheet.absoluteFillObject}>
            {userLocation.coords &&
               <ScrollView className="flex-1 ml-5 mr-5" ref={scrollViewRef}>
                  <MapView style={{ height: 300 }} provider='google'
                     customMapStyle={mapStyle}
                     initialRegion={{
                        latitude: userLocation.coords.latitude,
                        longitude: userLocation.coords.longitude,
                        latitudeDelta: 0.02,
                        longitudeDelta: 0.02,
                     }}
                  >
                     <Marker
                        coordinate={pin}
                        title={description}
                        focusable={true}
                        // description={description}
                        // draggable={true}
                        onDragEnd={(e) => setPin(e.nativeEvent.coordinate)}

                     >
                        <ImageBackground
                           source={{ uri: pic }}
                           style={{ width: 50, height: 50 }}
                        />
                        {/* <Callout> */}
                        {/* <Text>My Callout</Text>
                     <ImageBackground
                        source={{ uri: pic }}
                        style={{ width: 50, height: 50 }}
                     /> */}
                        {/* </Callout> */}
                     </Marker>
                  </MapView>
                  <View className='mt-2 '>
                     <Text className='text-green-800 text-xl'>DESCRIPTION</Text>
                  </View>
                  <View className="w-full items-center">
                     <TextInput
                        onFocus={scrollToBottom}
                        style={styles.input}
                        blurOnSubmit={true}
                        multiline={true}
                        placeholder="Insert a description.."
                        onChangeText={(newText: string) => setDescription(newText)}
                        placeholderTextColor={"white"}
                     />
                  </View>
                  <View className="w-full items-center mt3">
                     <TouchableOpacity
                        className="mt-2 w-full bg-green-600  p-4 rounded-2xl"
                        onPress={createBeenzer}
                     >
                        <Text className="font-semibold text-center">
                           {" "}
                           Drop BeenZer + Mint NFT
                        </Text>
                     </TouchableOpacity>
                  </View>
                  <View className='mt-2 '>
                     <Text className='text-green-800 text-xl'>PROPERTIES</Text>
                  </View>
                  <View className='flex-row flex-wrap mt-2'>
                     <View style={styles.rectangle}>
                        <Text className='text-green-800'>LATITUDE</Text>
                        <Text className='text-white'>{pin.latitude}</Text>
                     </View>
                     <View style={styles.rectangle}>
                        <Text className='text-green-800'>LONGITUDE</Text>
                        <Text className='text-white'>{pin.longitude}</Text>
                     </View>
                     <View style={styles.rectangle}>
                        <Text className='text-green-800'>CITY</Text>
                        <Text className='text-white'>{pinCity}</Text>
                     </View>
                     <View style={styles.rectangle}>
                        <Text className='text-green-800'>USERNAME</Text>
                        <Text className='text-white'>{profile._username_}</Text>
                     </View>
                     <View style={styles.rectangle}>
                        <Text className='text-green-800'>CREATOR</Text>
                        <Text className='text-white'>{profile.__pubkey__}</Text>
                     </View>
                  </View>

               </ScrollView>
            }
            {!userLocation.coords &&
               <SafeAreaView className="items-center justify-center content-center">
                  <ActivityIndicator
                     className="self-center m-10"
                     size="large"
                     color="green"
                  />
               </SafeAreaView>
            }
         </SafeAreaView>
      </>
   )
}

const styles = StyleSheet.create({
   rectangle: {
      borderColor: 'gray',
      borderWidth: 1,
      padding: 10,
      margin: 1,
   },
   input: {
      borderColor: "gray",
      width: "100%",
      borderWidth: 1,
      borderRadius: 10,
      padding: 10,
      marginBottom: 5,
      marginTop: 5,
      color: 'white',
      height: 100,
   },
});

export default PostBeenzer