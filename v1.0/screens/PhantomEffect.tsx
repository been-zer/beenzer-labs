import { useEffect } from 'react'
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import nacl from "tweetnacl";
import { decryptPayload } from "../services/phantom/functions";
import * as Linking from "expo-linking";
import { PublicKey } from "@solana/web3.js";
import bs58 from "bs58";
import { atom, useAtom } from "jotai";
import { atomDappKeyPair, atomSharedSecret, atomSession, atomPhantomWalletPublicKey, atomUserNFTs, atomProfile, atomSOCKET } from "../services/global";
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import { Vibration } from 'react-native';
import { firstLogin } from "../services/socket/function";
import { socketConnection } from "../services/socket/connexion";

const PhantomEffect = ({ deepLink }: { deepLink: string }) => {

   const [dappKeyPair] = useAtom(atomDappKeyPair)
   const [sharedSecret, setSharedSecret] = useAtom(atomSharedSecret)
   const [session, setSession] = useAtom(atomSession)
   const [phantomWalletPublicKey, setPhantomWalletPublicKey] = useAtom(atomPhantomWalletPublicKey)
   const navigation = useNavigation<NavigationProp<ParamListBase>>();
   const [SOCKET] = useAtom(atomSOCKET);

   // handle inbounds links
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
         socketConnection(connectData.public_key, SOCKET);
         const getNewUserStatus = async () => {
            const newUser = await firstLogin(SOCKET);
            if (newUser) {
               navigation.navigate("Credentials");
            } else {
               navigation.navigate("Home");
            }
         }
         getNewUserStatus();
      }
   }, [deepLink]);

   return null;
};

export default PhantomEffect;
