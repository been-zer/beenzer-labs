import {
  Text,
  View,
  SafeAreaView,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Button
} from "react-native";
import { GradientText } from "./gradientText";
// import { LinearGradientText } from 'react-native-linear-gradient-text';
// import { LinearGradient } from "expo-linear-gradient";

import React, { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import bs58 from "bs58";
import nacl from "tweetnacl";
import * as Linking from "expo-linking";
import { UserCoords } from '../Type';
import * as Location from 'expo-location';
import Header from "../components/Header";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { LockClosedIcon, ArrowRightOnRectangleIcon, PencilSquareIcon } from "react-native-heroicons/solid";
import MapView, { Marker, Callout } from 'react-native-maps';
import EditProfile from "./EditProfile";
import CollectionScreen from "./CollectionScreen";
import { SOCKET } from "../services/socket";
import { NFT } from "../types/types";
// import getBalances from "../services/getBalances";
// get dimmensions of screen and use media queeries to  make the UI responsive
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import * as ImagePicker from 'expo-image-picker';


const Profile = ({ dappKeyPair, session, sharedSecret, deepLink, profile }: any) => {

  const [editProfile, setEditProfile] = useState(false);
  const [username, setUsername] = useState<string>(profile[0]._username_);
  const [description, setDescription] = useState<string>(profile[0]._description);
  const [avatar, setAvatar] = useState<string>(profile[0]._pfp);
  const [location, setLocation] = useState<UserCoords>();
  const [errorMsg, setErrorMsg] = useState("");
  const [showMore, setShowMore] = useState(false);
  const [allPicLocation, setAllPicLocation] = useState<any>([]);
  const [allNFTPicssLocation, setAllNFTPicssLocation] = useState<NFT[]>([]);

  // const [balances, setBalances] = useState({});

  // useEffect(() => {{ async () => {
  //   setBalances(await getBalances(profile[0].__pubkey__));
  // }}});

  const edit = () => setEditProfile(!editProfile)

  const navigation = useNavigation<NavigationProp<ParamListBase>>()
  useEffect(() => {
    if (!deepLink) return;

    const url = new URL(deepLink);
    const params = url.searchParams;

    if (params.get("errorCode")) {
      return;
    }

    if (/onDisconnect/.test(url.pathname)) {
      navigation.navigate("Login")
      console.log("disconnected")
    }
  }, [deepLink]);


  const buildUrl = (path: string, params: URLSearchParams) =>
    `https://phantom.app/ul/v1/${path}?${params.toString()}`;

  const onDisconnectRedirectLink = Linking.createURL("onDisconnect");

  const encryptPayload = (payload: any, sharedSecret?: Uint8Array) => {
    if (!sharedSecret) throw new Error("missing shared secret");

    const nonce = nacl.randomBytes(24);

    const encryptedPayload = nacl.box.after(
      Buffer.from(JSON.stringify(payload)),
      nonce,
      sharedSecret
    );

    return [nonce, encryptedPayload];
  };

  const disconnect = async () => {
    const payload = {
      session,
    };
    const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);

    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onDisconnectRedirectLink,
      payload: bs58.encode(encryptedPayload),
    });

    const url = buildUrl("disconnect", params);
    Linking.openURL(url);
  };

  useEffect(() => {
    SOCKET.emit("getUserNFTs", profile[0].__pubkey__);
    SOCKET.on("userNFTs", (allNFTs: any) => {
      setAllPicLocation(allNFTs);
    });
  }, [])

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      let location: UserCoords = await Location.getCurrentPositionAsync({});
      setLocation(location)
      console.log(location)
    })();
  }, []);

  useEffect(() => {
    allPicLocation.forEach((nft: any) => {
      const allNFTPicsLocation: any = {
        title: nft._description,
        coordinates: {
          latitude: nft._latitude,
          longitude: nft._longitude,
        },
        asset: nft._asset,
        __id__: nft.__id__,
      };
      setAllNFTPicssLocation((prevState) => [...prevState, allNFTPicsLocation]);
      console.log('kkkk', allNFTPicssLocation)
    })
  }, [allPicLocation])


  return (
    <>
      {!showMore ? (
        <SafeAreaView className="bg-zinc-900 h-screen">
          <ScrollView>
            <View className="flex flex-col justify-between">
              <View className='flex flex-row justify-between'>
                <Header title="Profile" />
                <View className="flex flex-row justify-end">
                  <TouchableOpacity
                    onPress={disconnect}
                    className="mt-4 mr-4"
                  >
                    <ArrowRightOnRectangleIcon
                      size={25}
                      color="#30a24f"
                      className="bg-sky-500/50 "
                    />
                    <Text className="text-gray-100 hover:text-white">Logout</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* <View className="flex flex-col items-center">
                <Text>
                  {balances}
                </Text>
              </View> */}
              {!editProfile ? (
                <>
                  <View className='flex flex-row justify-center items-end'>
                    <View className="'flex flex-row justify-center items-end'">
                      <Image className=" h-28 w-28 rounded-full mb-2" source={{ uri: avatar }} />
                      {/* <Image className=" h-28 w-28 rounded-full mb-2" source={require("../assets/newUser.png")} /> */}

                    </View>
                    <TouchableOpacity
                      className="  "
                      onPress={edit}
                    >
                      <PencilSquareIcon size={18} color="#30a24f" />
                    </TouchableOpacity>
                  </View>
                  <View className="flex flex-col items-center">
                    <Text className=" text-white text-6xl uppercase font-extrabold mb-2 p-4">
                      {username}
                    </Text>
                    <GradientText text={description || "No description yet :("} className="uppercase font-extrabold mb-2" />
                  </View>

                  {location && allNFTPicssLocation.length ? (
                    <>
                      <MapView
                        customMapStyle={mapStyle}
                        style={styles.map}
                        showsUserLocation={true}
                        provider="google"
                        initialRegion={{
                          latitude: location.coords.latitude as number,
                          longitude: location.coords.longitude as number,
                          latitudeDelta: 0.05,
                          longitudeDelta: 0.05,
                        }}>
                        <>
                          {allNFTPicssLocation.map((nft, index) => {
                            return <Marker coordinate={nft.coordinates} pinColor="green"
                              key={index}
                            >
                              <Callout>
                                <Text>
                                  <Image
                                    source={{ uri: nft.asset }}
                                    style={styles.picture} />
                                  <Text>{nft.title}</Text>
                                </Text>
                              </Callout>
                            </Marker>
                          })}
                        </>
                      </MapView>

                    </>
                  )

                    : (
                      <ActivityIndicator className="mt-5" size="large" color="green" />)}
                  <TouchableOpacity
                    className=" mx-16 mt-3 shadow-xl shadow-white p-2 rounded-2xl border border-green-500"
                    onPress={() => setShowMore(!showMore)}
                  >
                    <Text className="m-2 font-bold text-2xl text-center  text-green-500">
                      Show full collection
                    </Text>
                  </TouchableOpacity>
                </>
              ) : (
                <EditProfile
                  setEditProfile={setEditProfile}
                  username={username}
                  setUsername={setUsername}
                  profile={profile}
                  description={description}
                  setDescription={setDescription}
                />
              )}

            </View>
          </ScrollView>
          <View >
            <Footer />
          </View>
        </SafeAreaView>) : (
        <CollectionScreen profile={profile} setAvatar={setAvatar} avatar={avatar} />)
      }
    </>
  )
}


const styles = StyleSheet.create({
  map: {
    borderRadius: 40,
    height: '30%',
    margin: 20,
  },
  picture: {
    width: 100,
    height: 100,
    resizeMode: "cover"
  },

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

export default Profile