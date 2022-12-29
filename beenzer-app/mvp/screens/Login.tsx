import { Image, TouchableOpacity, View } from "react-native";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { Buffer } from "buffer";
import { Text } from "react-native";
global.Buffer = global.Buffer || Buffer;
import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import * as Linking from "expo-linking";
import nacl from "tweetnacl";
import bs58 from "bs58";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
} from "@solana/web3.js";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SOCKET, socketConnection } from "../services/socket";
import { LinearGradient } from "expo-linear-gradient";

const NETWORK = clusterApiUrl("mainnet-beta");
const onConnectRedirectLink = Linking.createURL("onConnect");
// use redux to assign public key to user and store it in the redux store

const buildUrl = (path: string, params: URLSearchParams) =>
  `https://phantom.app/ul/v1/${path}?${params.toString()}`;

const decryptPayload = (data: string, nonce: string, sharedSecret?: Uint8Array) => {
  if (!sharedSecret) throw new Error("missing shared secret");

  const decryptedData = nacl.box.open.after(bs58.decode(data), bs58.decode(nonce), sharedSecret);
  if (!decryptedData) {
    throw new Error("Unable to decrypt data");
  }
  return JSON.parse(Buffer.from(decryptedData).toString("utf8"));
};
//use Redux to store and access the user's public key
const mapStateToProps = (state: any) => {
  return {
    publicKey: state.user.publicKey,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setPublicKey: (publicKey: string) => dispatch({ type: "SET_PUBLIC_KEY", payload: publicKey }),
  };
};

const Login = ({
  dappKeyPair,
  setSession,
  setSharedSecret,
  sharedSecret,
  deepLink,
  setDeepLink,
  setPublicKey,
  setProfile,
  phantomWalletPublicKey,
  setPhantomWalletPublicKey,
  logs,
  setLogs,
  setUserNFTs,
  setTransactionSuccess,
}: any) => {
  const scrollViewRef = useRef<any>(null);
  const connection = new Connection(NETWORK);
  const [isLogin, setIsLogin] = useState(false);
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  useEffect(() => {
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setDeepLink(initialUrl);
      }
    })();
    Linking.addEventListener("url", handleDeepLink);
    return () => {
      Linking.removeEventListener("url", handleDeepLink);
    };
  }, []);

  // When a "url" event occurs, track the url
  const handleDeepLink = ({ url }: Linking.EventType) => {
    setDeepLink(url);
  };

  useEffect(() => {
    if (!deepLink) return;

    const url = new URL(deepLink);
    const params = url.searchParams;
    if (params.get("errorCode")) {
      return;
    }

    if (/onConnect/.test(url.pathname)) {
      const sharedSecretDapp = nacl.box.before(
        bs58.decode(params.get("phantom_encryption_public_key")!),
        dappKeyPair.secretKey
      );

      const connectData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecretDapp
      );

      setSharedSecret(sharedSecretDapp);
      setSession(connectData.session);
      setPhantomWalletPublicKey(new PublicKey(connectData.public_key));
      setPublicKey(connectData.public_key);
      setIsLogin(!isLogin);
      // use mapStateToProps to access the user's public key
      // use mapDispatchToProps to assign the user's public key to the redux store
      // use redux to assign public key to user and store it in the redux store
      // use redux to store and access the user's public key

      socketConnection(connectData.public_key);

      SOCKET.on("isNewUser", (data) => {
        console.log("isNewUser", data);
        if (data) {
          navigation.navigate("Credentials");
        } else {
          SOCKET.on("userNFTs", (data) => {
            setUserNFTs(data);
          });
          SOCKET.on("userInfo", (userInfo) => {
            setProfile(userInfo);
          });
          navigation.navigate("Home");
        }
      });
      // fetch('https://beenzer-server.onrender.com').then((response) => response.text() ).then(response => console.log(response)).catch(error => { console.log(error) });
    }
    if (/onDisconnect/.test(url.pathname)) {
      navigation.navigate("Login");
      console.log("disconnected");
    }
    if (/onSignAndSendTransaction/.test(url.pathname)) {
      const signAndSendTransactionData = decryptPayload(params.get("data")!, params.get("nonce")!, sharedSecret);
      console.log('signAndSendTransactionData', signAndSendTransactionData)
      setTransactionSuccess(true)
    }
  }, [deepLink]);

  const connect = async () => {
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      cluster: "mainnet-beta",
      app_url: "https://phantom.app",
      redirect_link: onConnectRedirectLink,
    });

    const url = buildUrl("connect", params);
    Linking.openURL(url);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, [navigation]);

  return (
    <SafeAreaView className="flex-1 bg-zinc-900 h-screen pt-8">
      <View>
        <View className="bottom-24 left-2">
          <Image
            className="absolute shadow-md mt-32 h-96 w-96 shadow-green-500 "
            source={require("../assets/New_Artwork_e.png")}
          />
        </View>
        <Text
          style={{ fontFamily: "Avenir-Black" }}
          className="text-6xl uppercase top-72 text-green-500 font-extrabold text-center p-6"
        >
          Beenzer
        </Text>
        <TouchableOpacity
          className="z-99 top-16 mx-16 mt-80 shadow-xl p-4 rounded-2xl border border-white"
          onPress={connect}
        >
          <Image
            className="absolute w-8 h-8 left-4 top-2"
            resizeMode="contain"
            source={require("../assets/phantom.png")}
          />
          <Text className="font-semibold text-center ml-8 text-white">
            {" "}
            Login with Phantom{" "}
          </Text>
        </TouchableOpacity>
        <Text
          style={{ fontFamily: "Avenir-Black" }}
          className="mt-12 mx-14 top-16 text-green-500 font-medium text-center"
        >
          Welcome to BeenZer, the first fully decentralized social app where
          you OWN your content. Drop your stories in the map forever minting
          them and sell your NFTs in the marketplaces.
        </Text>
      </View>
    </SafeAreaView >
  );
};

export default Login;
