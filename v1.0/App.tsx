import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView, StatusBar, View } from 'react-native';
import Login from './screens/Login';
import Home from './screens/Home';
import Credentials from './screens/Credentials';
import BeenzerMenu from './screens/BeenzerMenu';
import { atomDarkModeOn, atomDarkMode, atomLightMode } from './services/darkmode';
import { useAtom } from 'jotai';
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
  const [lightkMode, setLightMode] = useAtom(atomLightMode);

  return (
    <SafeAreaView className={`${darkModeOn ? `bg-${darkMode}` : `bg-${lightkMode}`} flex-1`}>
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
              headerTintColor: `${darkModeOn ? `bg-${darkMode}` : `bg-${lightkMode}`}`,
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
        </Stack.Navigator>
      </NavigationContainer >
    </SafeAreaView>
  );
}
