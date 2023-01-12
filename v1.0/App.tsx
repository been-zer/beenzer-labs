import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar, View, Text } from 'react-native';
import Login from './screens/Login';
import Home from './screens/Home';
import Credentials from './screens/Credentials';
import BeenzerMenu from './screens/BeenzerMenu';
import PostBeenzer from './screens/PostBeenzer';
import { atomDarkModeOn, atomDarkMode, atomLightMode } from './services/globals/darkmode';
import { useAtom } from 'jotai';
import Picture from './screens/Picture';
import NFTCreation from './screens/NFTCreation';
import Profile from './screens/Profile';
import Logout from './screens/Logout';
import EditProfile from './screens/EditProfile';
import Notifications from './screens/Notifications';

const Stack = createNativeStackNavigator();

const headerHide = {
  headerShown: false,
  // presentation: 'modal',
  // animationTypeForReplace: 'push',
  // animation: 'slide_from_right',
};

export default function App() {

  const [darkModeOn, setDarkModeOn] = useAtom(atomDarkModeOn);
  const [darkMode, setDarkMode] = useAtom(atomDarkMode);
  const [lightMode, setLightMode] = useAtom(atomLightMode);

  return (
    <View className={`${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`} flex-1`}>
      <StatusBar barStyle={darkModeOn ? 'light-content' : 'dark-content'} />
      < NavigationContainer >
        <Stack.Navigator
        >
          <Stack.Screen name="Login" component={Login} options={{
            headerShown: false,
            animation: 'none',
          }} />
          <Stack.Screen
            name="Credentials"
            component={Credentials}
            options={{
              headerShown: true,
              headerTitle: 'Sign Up',
              headerTransparent: true,
              headerTintColor: `${darkModeOn ? `${lightMode}` : `${darkMode}`}`,
              headerBackTitle: 'Back',
              headerBackTitleVisible: false,
              animation: 'none',
            }}
          />
          <Stack.Screen name="Home" component={Home} options={{
            headerShown: false,
            animation: 'none',
          }} />
          <Stack.Screen name="BeenzerMenu" component={BeenzerMenu} options={{
            headerShown: true,
            headerTitle: 'New Beenzer',
            headerTransparent: true,
            headerTintColor: 'white',
            headerBackVisible: false,
            animation: 'none',

          }} />
          <Stack.Screen name="Picture" component={Picture} options={{
            headerTitle: '',
            headerTransparent: true,
            headerTintColor: 'white',
            headerBackTitle: '',
            headerBackVisible: true,
            headerBackButtonMenuEnabled: true,
            animation: 'none',
          }} />
          <Stack.Screen name="NFTCreation" component={NFTCreation} options={{
            headerTitle: 'BEENZER in creation',
            headerTransparent: true,
            headerBackVisible: false,
            headerTintColor: 'white',
            animation: 'none',
          }} />
          <Stack.Screen name="Profile" component={Profile} options={{
            headerTitle: 'Profile',
            headerTransparent: true,
            headerBackVisible: false,
            headerTintColor: 'white',
            headerRight: () => (<Logout />),
            animation: 'none',
          }} />
          <Stack.Screen name="EditProfile" component={EditProfile} options={{
            headerTitle: 'Edit Profile',
            headerTransparent: true,
            headerBackVisible: true,
            headerTintColor: 'white',
            animation: 'none',
          }} />
          <Stack.Screen name="PostBeenzer" component={PostBeenzer} options={{ animation: 'none', }} />
          <Stack.Screen name="Notifications" component={Notifications} options={{
            headerShown: false,
            animation: 'none',
          }} />
        </Stack.Navigator>
      </NavigationContainer >
    </View>
  );
}
