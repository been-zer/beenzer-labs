/* eslint-disable react/display-name */

import Login from "./screens/Login"
import { NavigationContainer, NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from "./screens/HomeScreen"
import React, { useLayoutEffect, useState } from "react"
import Profile from "./screens/Profile"
import Messages from "./screens/Messages"
import Friends from "./screens/Friends"
import nacl from "tweetnacl";
import AddPicture from "./screens/AddPicture";
import MessageScreen from "./screens/MessageScreen";
import Credentials from "./screens/Credentials";
import FriendProfile from "./screens/FriendProfile";
import AddMessageScreen from "./screens/AddMessageScreen";
import { PublicKey } from "@solana/web3.js";


const Stack = createNativeStackNavigator();


export default function App() {
  const [publicKey, setPublicKey] = useState<any>("");
  const [session, setSession] = useState<string>();
  const [sharedSecret, setSharedSecret] = useState<Uint8Array>();
  const [dappKeyPair] = useState(nacl.box.keyPair());
  const [deepLink, setDeepLink] = useState<string>("");
  const [profile, setProfile] = useState<any>();
  const [phantomWalletPublicKey, setPhantomWalletPublicKey] = useState<PublicKey>();
  const [logs, setLogs] = useState<string[]>([]);
  const [userNFTS, setUserNFTs] = useState<any>([]);
  const [transactionSuccess, setTransactionSuccess] = useState<boolean>(false);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login">
          {(props) => (
            <Login
              {...props}
              setSession={setSession}
              setSharedSecret={setSharedSecret}
              dappKeyPair={dappKeyPair}
              deepLink={deepLink}
              setDeepLink={setDeepLink}
              setPublicKey={setPublicKey}
              setProfile={setProfile}
              phantomWalletPublicKey={phantomWalletPublicKey}
              setPhantomWalletPublicKey={setPhantomWalletPublicKey}
              logs={logs}
              setLogs={setLogs}
              setUserNFTs={setUserNFTs}
              sharedSecret={sharedSecret}
              setTransactionSuccess={setTransactionSuccess}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Credentials" options={{ headerShown: false }}>
          {(props) => <Credentials {...props} setProfile={setProfile} />}
        </Stack.Screen>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Friends"
          component={Friends}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Messages"
          options={{ headerShown: false }} >
          {(props) => <Messages
          {...props}
          publicKey={publicKey}/>}
        </Stack.Screen>

        <Stack.Screen name="Profile" options={{ headerShown: false }}>
          {(props) => (
            <Profile
              {...props}
              session={session}
              sharedSecret={sharedSecret}
              dappKeyPair={dappKeyPair}
              deepLink={deepLink}
              setDeepLink={setDeepLink}
              profile={profile}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="AddPicture" options={{ headerShown: false }}>
          {(props) => (
            <AddPicture
              {...props}
              publicKey={publicKey}
              dappKeyPair={dappKeyPair}
              profile={profile}
              phantomWalletPublicKey={phantomWalletPublicKey}
              session={session}
              sharedSecret={sharedSecret}
              deepLink={deepLink}
              setDeepLink={setDeepLink}
              transactionSuccess={transactionSuccess}
              setTransactionSuccess={setTransactionSuccess}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="MessageScreen"
          options={{ headerShown: false }}>
          {(props) => <MessageScreen
          {...props}
          publicKey={publicKey}/>}
        </Stack.Screen>
        <Stack.Screen
          name="FriendProfile"
          options={{ headerShown: false }} >
          {(props) => <FriendProfile
          {...props}
          publicKey={publicKey}/>}
        </Stack.Screen>
        <Stack.Screen
          name="AddMessageScreen"
          component={AddMessageScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}



