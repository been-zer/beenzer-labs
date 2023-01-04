import { View, Text, TextInput, SafeAreaView, TouchableOpacity, Alert, Animated } from 'react-native'
import { useState, useRef } from 'react'
import { NavigationProp, ParamListBase, useNavigation } from "@react-navigation/native";
import OpenURLButton from '../components/OpenURLButton'
import { fadeIn } from '../services/global/functions';
import { useAtom } from 'jotai'
import { atomDarkModeOn, atomDarkMode, atomLightMode } from '../services/darkmode'
import { checkUsernameAvailability, handleNewUserCreated } from '../services/socket/function'
import { CheckCircleIcon, XCircleIcon } from 'react-native-heroicons/outline'
import { atomSOCKET } from '../services/global/index';


const Credentials = () => {
   const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
   const [darkMode, setDarkMode] = useAtom(atomDarkMode);
   const [lightkMode, setLightMode] = useAtom(atomLightMode);
   const navigation = useNavigation<NavigationProp<ParamListBase>>()
   const [buttonInactive, setButtonInactive] = useState(true)
   const [username, setUsername] = useState('')
   const [errorText, setErrorText] = useState('')
   const regex = new RegExp(/(\s*([\0\b\'\"\n\r\t\%\_\\]*\s*(((select\s*.+\s*from\s*.+)|(insert\s*.+\s*into\s*.+)|(update\s*.+\s*set\s*.+)|(delete\s*.+\s*from\s*.+)|(drop\s*.+)|(truncate\s*.+)|(alter\s*.+)|(exec\s*.+)|(\s*(all|any|not|and|between|in|like|or|some|contains|containsall|containskey)\s*.+[\=\>\<=\!\~]+.+)|(let\s+.+[\=]\s*.*)|(begin\s*.*\s*end)|(\s*[\/\*]+\s*.*\s*[\*\/]+)|(\s*(\-\-)\s*.*\s+)|(\s*(contains|containsall|containskey)\s+.*)))(\s*[\;]\s*)*)+)/i)
   const phantomURL = 'https://phantom.app/ul/'
   const fadeAnim = useRef(new Animated.Value(0)).current;
   const [usernameAvailable, setUsernameAvailable] = useState(false)
   const [SOCKET] = useAtom(atomSOCKET);

   const handleUsername = (text: string) => {
      if (text.includes(' ')) {
         setErrorText("No spaces allowed 🥲");
         setButtonInactive(true);
         setUsernameAvailable(false);
      } else if (text.match(regex)) {
         Alert.alert('No SQL injection please 🤓');
         setButtonInactive(true);
         setUsernameAvailable(false);
      } else if (text.length < 3) {
         setErrorText("Minimum 3 letters please 🥲");
         setButtonInactive(true);
         setUsernameAvailable(false);
      } else {
         setErrorText("");
         setUsername(text);
         const check = async () => {
            const availability: boolean = await checkUsernameAvailability(text, false, SOCKET)
            setUsernameAvailable(availability);
            if (availability) {
               setButtonInactive(false);
            } else {
               setButtonInactive(true);
               setErrorText("Username already taken 🥲");
            }
         }
         check();
      }
   }

   const handleLogin = async (username: string) => {
      const usernameAvailable = await checkUsernameAvailability(username, true, SOCKET);
      if (usernameAvailable) {
         const userCreated = await handleNewUserCreated(SOCKET);
         if (userCreated) {
            navigation.navigate("Home");
         }
      }
   };

   fadeIn(fadeAnim)

   return (
      <SafeAreaView className={`h-full bg-${darkModeOn ? darkMode : lightkMode} flex-1 items-center`}  >
         <Animated.View style={{ opacity: fadeAnim }}>
            <View>
               <Text className="text-center my-5 text-green-600 font-bold text-4xl">Welcome </Text>
               <Text className="text-center my-2 text-green-600 font-bold text-4xl"> to Beenzer</Text>
            </View>
         </Animated.View>
         <View className={`border-2 justify-between border-green-600 flex-row rounded-lg w-80 h-18 my-4 p-3`}>
            <TextInput
               className={`text-${darkModeOn ? lightkMode : darkMode} flex-1`}
               placeholder="Username"
               placeholderTextColor="gray"
               onChangeText={handleUsername}
               keyboardAppearance={darkModeOn ? 'dark' : 'light'}
               returnKeyType='previous'
            />
            <View>
               {usernameAvailable ? (<CheckCircleIcon color='green' />) : (<XCircleIcon color='red' />)}
            </View>
         </View>
         {
            errorText &&
            <Text className='text-red-600 my-2'>
               {errorText}
            </Text>
         }
         {
            username && !errorText && usernameAvailable &&
            <View className='flex justify-center w-80'>
               < Text className='text-green-600 text-center'>
                  This looks good! Welcome to the community {username} 🥳
               </Text>
            </View>
         }
         <TouchableOpacity
            className={buttonInactive ? "bg-green-600 rounded-lg w-80 h-10 my-4 p-3 opacity-50" : "bg-green-600 rounded-lg w-80 h-10 my-4 p-3"}
            onPress={() => handleLogin(username)}
            disabled={buttonInactive}
         >
            <Text className="font-semibold text-center text-white">
               🚀 Let's go 🚀
            </Text>
         </TouchableOpacity>
         <View>
            <Text className={`text-${darkModeOn ? lightkMode : darkMode} text-center my-4`}>
               Or
            </Text>
         </View>
         <OpenURLButton url={phantomURL}>
            Change my wallet
         </OpenURLButton>
      </SafeAreaView >
   );
}

export default Credentials;