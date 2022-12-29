import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, SafeAreaView, Image, TouchableOpacity } from "react-native"
import * as Location from 'expo-location';
import MapView, { Marker, Callout } from 'react-native-maps';
import Footer from '../components/Footer'
import { UserCoords } from '../Type';
import { NFT } from "../types/types";
import { MapPinIcon } from 'react-native-heroicons/outline';
import { EllipsisHorizontalCircleIcon } from 'react-native-heroicons/outline'
import { SOCKET } from "../services/socket";

const HomeScreen = () => {
  const [location, setLocation] = useState<UserCoords>();
  const [errorMsg, setErrorMsg] = useState("");
  const [allNFTsLocation, setAllNFTsLocation] = useState<NFT[]>([]);
  const [allNFTs, setAllNFTs] = useState<any>([]);
  const [userCity, setUserCity] = useState<string>("");


  useEffect(() => {
    SOCKET.emit("getAllNFTs", "please");
    SOCKET.on("allNFTs", (allNFTs: any) => {
      setAllNFTs(allNFTs);
    });
  }, [])



  useEffect(() => {
    allNFTs.forEach((nft: any) => {
      const allNFTsLocation: any = {
        title: nft._description,
        coordinates: {
          latitude: nft._latitude,
          longitude: nft._longitude,
        },
        asset: nft._asset,
        __id__: nft.__id__,
      };
      setAllNFTsLocation((prevState) => [...prevState, allNFTsLocation]);
    })
  }, [allNFTs])

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      let userLocation: UserCoords = await Location.getCurrentPositionAsync({});
      const coordinates = {
        latitude: location?.coords.latitude as number,
        longitude: location?.coords.longitude as number,
      };
      const getCity = async () => {
        const cityObj = await Location.reverseGeocodeAsync(coordinates);
        setUserCity(cityObj[0].city as string);
      };
      getCity();
      setLocation(userLocation);
    })();
  }, []);

  const handlePress = (e: any) => {
    console.log("longpress :", e);
  };





  return (
    <SafeAreaView
      className="bg-zinc-900 flex-1 h-screen"
      style={StyleSheet.absoluteFillObject}
    >
      <Text className="text-green-600 bottom-1 text-3xl font-bold text-center sticky justify-center ">
        BeenZer
      </Text>
      <TouchableOpacity className="absolute  top-14 right-5">
        <EllipsisHorizontalCircleIcon size={35} color="#30a24f" />
      </TouchableOpacity>
      <Text className="text-gray-100 sticky bottom-1 text-center text-sm font-medium">
        {userCity ? userCity : "Loading..."}
      </Text>
      <View className="left-32 bottom-6 fixed ">
        <MapPinIcon size={20} color="#ffffff" className="justify-center " />
      </View>
      <View className="flex-1 justify-center bottom-4 ">
        <MapView customMapStyle={mapStyle} style={styles.map} provider='google' />
        <ActivityIndicator size="large" color="green" />
        {location && allNFTsLocation.length ?
          (<>
            <MapView style={styles.map}
              customMapStyle={mapStyle}
              showsUserLocation={true}
              provider='google'
              onLongPress={handlePress}
              initialRegion={{
                latitude: location.coords.latitude as number,
                longitude: location.coords.longitude as number,
                latitudeDelta: 0.05,
                longitudeDelta: 0.05,
              }}>
              <>
                {allNFTsLocation.map((nft, index) => {
                  return <Marker coordinate={nft.coordinates} pinColor="green" key={index}
                  >
                    <Callout style={styles.callout}>
                      <Text>
                        <Image
                          source={{ uri: nft.asset }}
                          style={styles.picture} />
                        <Text className='text-white'>{nft.title}</Text>
                      </Text>
                    </Callout>
                  </Marker>
                })}
              </>
            </MapView>
          </>) : <></>}
      </View>
      <View className="top-8">
        <Footer />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
    height: '150%',
  },
  picture: {
    width: 100,
    height: 100,
    resizeMode: "cover"
  },
  callout: {
    backgroundColor: 'black',
    color: 'white'
  }
});
var mapStyle = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "elementType": "labels.icon",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#212121"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "administrative.country",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#9e9e9e"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "administrative.locality",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#bdbdbd"
      }
    ]
  },
  {
    "featureType": "poi",
    "stylers": [
      {
        "saturation": -55
      },
      {
        "lightness": -45
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#181818"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#1b1b1b"
      }
    ]
  },
  {
    "featureType": "road",
    "stylers": [
      {
        "color": "#00db0f"
      },
      {
        "saturation": -70
      },
      {
        "lightness": -25
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#2c2c2c"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8a8a8a"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#373737"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#3c3c3c"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#4e4e4e"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#616161"
      }
    ]
  },
  {
    "featureType": "transit",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#757575"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#000000"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#3d3d3d"
      }
    ]
  }
]



export default HomeScreen