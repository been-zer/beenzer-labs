import { View, Text, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native'
import React from 'react'
import MapView, { Marker, Callout } from 'react-native-maps'
import { mapStyle } from '../services/globals'
import { atomUserLocation, atomUserNFTs } from '../services/globals'
import { useAtom } from 'jotai'

const ProfileMap = () => {
   const [userLocation, setUserLocation] = useAtom(atomUserLocation);
   const [userNFTs, setUserNFTs] = useAtom(atomUserNFTs);

   return (
      <>
         {userLocation.coords ? (
            <MapView
               customMapStyle={mapStyle}
               style={styles.map}
               showsUserLocation={true}
               provider="google"
               initialRegion={{
                  latitude: userLocation.coords.latitude as number,
                  longitude: userLocation.coords.longitude as number,
                  latitudeDelta: 0.05,
                  longitudeDelta: 0.05,

               }}>
               <>
                  {userNFTs.map((nft, index) => {
                     return <Marker coordinate={{ latitude: nft._latitude, longitude: nft._longitude }} pinColor="green"
                        key={index} title={nft._description}
                     >
                        <ImageBackground
                           className='w-10 h-10'
                           imageStyle={{ borderRadius: 50 }}
                           source={{ uri: nft._asset }}

                        />
                     </Marker>
                  })}
               </>
            </MapView>) : (<ActivityIndicator className="mt-5" size="large" color="green" />
         )
         }
      </>
   )
}

export default ProfileMap

const styles = StyleSheet.create({
   map: {
      width: '90%',
      height: 300,
      borderRadius: 10,
      marginTop: 10,
   },
   picture: {
      width: 100,
      height: 100,
      resizeMode: "cover"
   },
})