import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar, View } from 'react-native';
import Login from './screens/Login';
import Home from './screens/Home';
import Credentials from './screens/Credentials';
import BeenzerMenu from './screens/BeenzerMenu';
import PostBeenzer from './screens/PostBeenzer';
import { atomDarkModeOn, atomDarkMode, atomLightMode } from './services/globals/darkmode';
import { useAtom } from 'jotai';
import Picture from './screens/Picture';
import NFTCreation from './screens/NFTCreation';

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
    <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-${lightMode}`} flex-1`}>
      <StatusBar barStyle={darkModeOn ? 'light-content' : 'dark-content'} />
      < NavigationContainer >
        <Stack.Navigator
        >
          <Stack.Screen name="Login" component={Login} options={{
            headerShown: false,
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
            }}
          />
          <Stack.Screen name="Home" component={Home} options={{
            headerShown: false,
          }} />
          <Stack.Screen name="BeenzerMenu" component={BeenzerMenu} options={{
            headerShown: true,
            headerTitle: 'New Beenzer',
            headerTransparent: true,
            headerTintColor: 'white',
            headerBackVisible: false,
          }} />
          <Stack.Screen name="Picture" component={Picture} options={{
            headerTitle: '',
            headerTransparent: true,
            headerTintColor: 'white',
            headerBackTitle: '',
            headerBackVisible: true,
          }} />
          <Stack.Screen name="NFTCreation" component={NFTCreation} options={{
            headerTitle: 'BEENZER in creation',
            headerTransparent: true,
            headerBackVisible: false,
            headerTintColor: 'white',
          }} />
        </Stack.Navigator>
      </NavigationContainer >
    </SafeAreaView>
  );
}
