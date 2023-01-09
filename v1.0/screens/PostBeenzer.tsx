import { View, Text, ScrollView, SafeAreaView, ImageBackground } from 'react-native'
import { atomPic, atomPin, atomUserLocation, atomPinCity } from '../services/globals'
import { useAtom } from 'jotai'
import MapView, { Marker, Callout } from 'react-native-maps'
import { useEffect } from 'react'
import { getCurrentPositionAsync } from 'expo-location'
import { getCity } from '../services/globals/functions'

const PostBeenzer = () => {

   const [pic, setPic] = useAtom(atomPic)
   const [pin, setPin] = useAtom(atomPin)
   const [userLocation] = useAtom(atomUserLocation)
   const [pinCity, setPinCity] = useAtom(atomPinCity)

   useEffect(() => {
      if (userLocation) {
         setPin({ latitude: userLocation.coords.latitude, longitude: userLocation.coords.longitude })
      }
   }, [])

   useEffect(() => {
      const cityInfo = async () => {
         const city = await getCity(pin)
         setPinCity(city as any)
      }
      cityInfo()
   }, [pin])


   return (
      <SafeAreaView className="bg-zinc-800 flex-1">
         <ScrollView className="flex-1 ml-5 mr-5">
            <MapView style={{ height: 500 }} provider='google'
               initialRegion={{
                  latitude: userLocation.coords.latitude,
                  longitude: userLocation.coords.longitude,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,
               }}
            >
               <Marker
                  coordinate={pin}
                  title="My Marker"
                  description="Some description"
                  draggable={true}
                  onDragEnd={(e) => setPin(e.nativeEvent.coordinate)}
               >
                  <ImageBackground
                     source={{ uri: pic }}
                     style={{ width: 50, height: 50 }}
                  />
                  <Callout>
                     <Text>My Callout</Text>
                     <ImageBackground
                        source={{ uri: pic }}
                        style={{ width: 50, height: 50 }}
                     />
                  </Callout>
               </Marker>
            </MapView>
            <View>
               <Text>
                  {pin.longitude}
                  {pin.latitude}
                  {pinCity}
               </Text>
            </View>
         </ScrollView>
      </SafeAreaView>
   )
}

export default PostBeenzer