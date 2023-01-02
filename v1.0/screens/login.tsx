import { Image, TouchableOpacity, View, SafeAreaView, Text, Vibration, Animated } from "react-native";
import { useEffect, useLayoutEffect, useRef } from "react";
import { connect } from "../services/phantomLogin";
import * as Linking from "expo-linking";
import { useAtom } from "jotai";
import { atomDeepLink, atomDappKeyPair } from "../global";
import PhantomEffect from "../screens/PhantomEffect";
import { useNavigation } from "@react-navigation/native";
import { atomDarkModeOn, atomDarkMode, atomLightMode, useSwipe } from "../services/darkmode";
import { fadeIn } from "../services/Functions";

const Login = () => {

   const [deepLink, setDeepLink] = useAtom(atomDeepLink)
   const [dappKeyPair] = useAtom(atomDappKeyPair)
   const navigation = useNavigation();
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightMode, setLightMode] = useAtom(atomLightMode);
   const fadeAnim = useRef(new Animated.Value(0)).current;
   const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)

   function onSwipeLeft() {
      setDarkModeOn(!darkModeOn)

      Vibration.vibrate();
   }
   function onSwipeRight() {
      setDarkModeOn(!darkModeOn)
      Vibration.vibrate();
   }

   const handleLogin = () => {
      connect(dappKeyPair);
      Vibration.vibrate();
   };

   useEffect(() => {
      (async () => {
         const initialUrl = await Linking.getInitialURL();
         if (initialUrl) {
            setDeepLink(initialUrl);
         }
      })();
      const listener = Linking.addEventListener('url', handleDeepLink);
      return () => {
         listener.remove();
      };
   }, []);

   const handleDeepLink = ({ url }: Linking.EventType) => {
      setDeepLink(url);
   };

   fadeIn(fadeAnim)

   return (
      <>
         <View onTouchStart={onTouchStart} onTouchEnd={onTouchEnd} className={`${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`} flex-1`}
         >
            <View className="bottom-24 left-2">
               <Image
                  className="absolute shadow-md mt-32 h-96 w-96 shadow-green-500 "
                  source={require("../assets/New_Artwork_e.png")}
               />
            </View>
            <Animated.View style={{ opacity: fadeAnim }}>
               <Text
                  style={{ fontFamily: "Avenir-Black" }}
                  className="text-6xl uppercase top-72 text-green-500 font-extrabold text-center p-6"
               >
                  Beenzer
               </Text>
            </Animated.View>
            <View>
               <Animated.View style={{ opacity: fadeAnim }}>
                  <TouchableOpacity
                     className={`border border-${darkModeOn ? lightMode : darkMode} border-z-99 top-16 mx-16 mt-80 shadow-xl p-4 rounded-2xl`}
                     onPress={handleLogin}>
                     <Image
                        className="absolute w-8 h-8 left-4 top-2"
                        resizeMode="contain"
                        source={require("../assets/phantom.png")}
                     />
                     <Text className={`font-semibold text-center ml-8 text-${darkModeOn ? lightMode : darkMode}`}>
                        {" "}
                        Login with Phantom{" "}
                     </Text>
                  </TouchableOpacity>
               </Animated.View>
            </View>
            <Text
               style={{ fontFamily: "Avenir-Black" }}
               className="mt-12 mx-14 top-16 text-green-500 font-medium text-center"
            >
               Welcome to BeenZer, the first fully decentralized social app where
               you OWN your content. Drop your stories in the map forever minting
               them and sell your NFTs in the marketplaces.
            </Text>
         </View>
         <PhantomEffect deepLink={deepLink} />
      </>
   );
};

export default Login;
