import { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native"
import Footer from './Footer';
import Map from './Map';
import { ActivityIndicator } from 'react-native-paper';
import { ArrowPathIcon } from 'react-native-heroicons/outline'
import { atomUserNFTs, atomProfile } from '../services/globals';
import { useAtom } from 'jotai';
import { socketUserNFTs, socketUserInfo } from "../services/socket/function";
import { atomUserLocation, atomRefreshLoc } from '../services/globals/index';
import { atomSOCKET } from '../services/socket';
import Feed from './Feed';
import { getUserLocation } from '../services/globals/functions';
import MapView from 'react-native-maps';
import ColorMode from '../components/ColorMode';
import { atomPhantomWalletPublicKey } from '../services/globals';


const Home = () => {
   const [phantomWalletPublicKey] = useAtom(atomPhantomWalletPublicKey);
   const [profile, setProfile] = useAtom(atomProfile);
   const [userNFTs, setUserNFTs] = useAtom(atomUserNFTs);
   const [SOCKET] = useAtom(atomSOCKET);
   const [showTab, setShowTab] = useState('Map');
   const [userLocation, setUserLocation] = useAtom(atomUserLocation);
   const [refreshLoc, setRefreshLoc] = useAtom(atomRefreshLoc);
   const mapRef = useRef<MapView>(null);

   useEffect(() => {
      fetchData();
      getInfoUser();
      getInfoNft();
   }, []);

   const fetchData = async () => {
      const location: any = await getUserLocation();
      setUserLocation(location);
      setRefreshLoc(true);
      if (mapRef.current) {
         mapRef.current.animateToRegion({
            latitude: location?.coords.latitude as number,
            longitude: location?.coords.longitude as number,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
         });
      };
   };

   const getInfoUser = async () => {
      try {
         const receivedInfos = await socketUserInfo(SOCKET);
         setProfile(receivedInfos);
      } catch (e) {
         console.error(e);
      }
   }
   const getInfoNft = async () => {
      try {
         const profileNFTs = await socketUserNFTs(SOCKET);
         setUserNFTs(profileNFTs);
      } catch (e) {
         console.error(e);
      }
   }

   useEffect(() => {
      console.log('profile', profile)
      console.log('NFT', userNFTs)
   }, [profile, userNFTs])

   return (
      <SafeAreaView className='h-full bg-zinc-900 flex-1 ' style={StyleSheet.absoluteFillObject}>
         {/* {title} */}
         <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Text style={{ alignSelf: 'flex-start' }} className='text-green-600 text-3xl font-bold'>Beenzer</Text>
            <View style={{ alignSelf: 'flex-end' }} >
               <ColorMode />
            </View>
         </View>
         <TouchableOpacity className='justify-center items-center' onPress={() => (fetchData(), setRefreshLoc(false))}>
            {userLocation && refreshLoc ? <View className='flex-row items-center justify-center mb-2'><Text className='text-gray-100 '>{userLocation.city}&nbsp;</Text>
               <ArrowPathIcon size={10} color='white' /></View > :
               <ActivityIndicator className=' bottom-1' color="white" />
            }
         </TouchableOpacity>
         {/* {tab bar} */}
         <View className='flex-row justify-around'>
            <TouchableOpacity className='' onPress={() => setShowTab('Map')}>
               <Text className='text-gray-100'>Map</Text>
            </TouchableOpacity>
            <TouchableOpacity className='' onPress={() => setShowTab('Feeds')}>
               <Text className='text-gray-100'>Feeds</Text>
            </TouchableOpacity>
         </View>
         {
            showTab === 'Feeds' &&
            <Feed />
         }
         {
            showTab === 'Map' &&
            <Map mapRef={mapRef} />
         }
         <Footer />
      </SafeAreaView >
   )
}


export default Home
