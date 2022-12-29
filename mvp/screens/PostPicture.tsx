import { Alert, Button, StyleSheet, TouchableOpacity } from "react-native";
import { UserCoords } from "../Type";
import { useState, useCallback } from "react";
import MapView, { Marker, Callout, Circle } from "react-native-maps";
import { Image, View, ActivityIndicator, Text, SafeAreaView, TextInput } from 'react-native';
import { socketMint } from "../services/socket";
import Header from '../components/Header';
import { useEffect } from "react";
import * as Location from 'expo-location';
import bs58 from "bs58";
import {
  clusterApiUrl,
  Connection,
  Keypair,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import nacl from "tweetnacl";
import * as Linking from "expo-linking";
const NETWORK = clusterApiUrl("mainnet-beta");
const onSignAndSendTransactionRedirectLink = Linking.createURL("onSignAndSendTransaction");
const buildUrl = (path: string, params: URLSearchParams) =>
  `https://phantom.app/ul/v1/${path}?${params.toString()}`;
const decryptPayload = (data: string, nonce: string, sharedSecret?: Uint8Array
) => {
  if (!sharedSecret) throw new Error("missing shared secret");
  const decryptedData = nacl.box.open.after(
    bs58.decode(data),
    bs58.decode(nonce),
    sharedSecret
  );
  if (!decryptedData) {
    throw new Error("Unable to decrypt data");
  }
  return JSON.parse(Buffer.from(decryptedData).toString("utf8"));
};
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




const PostPicture = ({
  capturedImage,
  pictureLocation,
  publicKey,
  dappKeyPair,
  profile,
  setPosted,
  setPictureSaved,
  phantomWalletPublicKey,
  session,
  sharedSecret,
  deepLink,
  setDeepLink,
  transactionSuccess,
  setTransactionSuccess,
}: any) => {

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  //phantom stuff
  ///////////////////////////////////////////////////////////////////

  const connection = new Connection(NETWORK);
  const createTransferTransaction = async () => {
    if (!phantomWalletPublicKey)
      throw new Error("missing public key from user");
    let transaction = new Transaction().add(
      SystemProgram.transfer({
        fromPubkey: phantomWalletPublicKey,
        toPubkey: new PublicKey('BctLWb6Q9viYjeJ2gNCr4xkRHc91NyikRR1TWn1qGGYr'),
        lamports: Number(process.env.RECT_APP_MINT_COST)/1000000000, // 10000000 lamports = 0.01 SOL
      })
    );
    transaction.feePayer = phantomWalletPublicKey;
    const anyTransaction: any = transaction;
    anyTransaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    return transaction;
  };

  const signAndSendTransaction = async () => {
    const transaction = await createTransferTransaction();
    const serializedTransaction = transaction.serialize({
      requireAllSignatures: false,
    });
    const payload = {
      session,
      transaction: bs58.encode(serializedTransaction),
    };
    const [nonce, encryptedPayload] = encryptPayload(payload, sharedSecret);
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      nonce: bs58.encode(nonce),
      redirect_link: onSignAndSendTransactionRedirectLink,
      payload: bs58.encode(encryptedPayload),
    });
    const url = buildUrl("signAndSendTransaction", params);
    Linking.openURL(url);
  };

  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  ///////////////////////////////////////////////////////////////////
  const [text, setText] = useState("");
  const [city, setCity] = useState<string | null>("");
  const coordinates = {
    latitude: pictureLocation?.coords.latitude as number,
    longitude: pictureLocation?.coords.longitude as number,
  };
  const getCity = async () => {
    const cityObj = await Location.reverseGeocodeAsync(coordinates);
    setCity(cityObj[0].city);
  };
  getCity();

  useEffect(() => {
    if (transactionSuccess) {
      handleMint();
      setTransactionSuccess(false);
    }
  }, [transactionSuccess]);

  const handleMint = () => {
    setPosted(true);
    setPictureSaved(false);
    socketMint(
      Buffer.from(capturedImage.base64, "base64"),
      "image/png",
      publicKey,
      1,
      profile[0]._username_,
      text,
      city as string,
      coordinates.latitude,
      coordinates.longitude
    );
  };

  return (
    <>
      <SafeAreaView
        className="bg-zinc-800 flex-1"
        style={StyleSheet.absoluteFillObject}
      >
        {pictureLocation && city ? (
          <>
            <Header title="Home" />
            <View className="flex-1 content-start items-center top-5">
              <Text className="text-green-600 text-lg mb-2">DROPPING ZONE</Text>
              <MapView
                customMapStyle={mapStyle}
                className="flex-grow-2 mt-0"
                style={styles.map}
                showsUserLocation={true}
                provider="google"
                initialRegion={{

                  latitude: coordinates.latitude,
                  longitude: coordinates.longitude,
                  latitudeDelta: 0.04,
                  longitudeDelta: 0.04,
                }}
              >
                <Marker coordinate={coordinates} pinColor="green">
                  <Callout>
                    <Text>
                      <Image
                        source={{ uri: capturedImage.uri }}
                        style={styles.picture}
                      />
                      <Text>{text}</Text>
                    </Text>
                  </Callout>
                </Marker>
                <Circle center={coordinates} radius={1000} />
              </MapView>
              <View className="w-full items-center">
                <TextInput
                  style={styles.input}
                  blurOnSubmit={true}
                  placeholder={"Add a comment..."}
                  multiline={true}
                  onChangeText={(newText) => setText(newText)}
                  placeholderTextColor={"white"}
                />
              </View>
              <TouchableOpacity
                className="mt-2 w-52 bg-green-600  p-4 rounded-2xl mx-28"
                onPress={signAndSendTransaction}
              >
                <Text className="font-semibold text-center">
                  {" "}
                  Drop BeenZer + Mint NFT
                </Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <SafeAreaView className="items-center justify-center content-center">
            <ActivityIndicator
              className="self-center m-10"
              size="large"
              color="green"
            />
          </SafeAreaView>
        )}
      </SafeAreaView>
    </>
  );
};


const styles = StyleSheet.create({
  picture: {
    width: 100,
    height: 100,
    resizeMode: "cover"
  },
  map: {
    width: '100%',
    height: '40%',
    margintop: 20,
  },
  input: {
    borderColor: "gray",
    width: "100%",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 5,
    marginTop: 5,
    color: 'white'
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


export default PostPicture;