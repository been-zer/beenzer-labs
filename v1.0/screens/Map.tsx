import { View, Text, StyleSheet } from 'react-native'
import MapView from 'react-native-maps';
import { mapStyle } from '../services/globals/index';
import { useAtom } from 'jotai';
import { atomUserLocation } from '../services/globals';


const Map = ({ mapRef }: any) => {

   const [userLocation, setUserLocation] = useAtom(atomUserLocation);

   return (
      <View className='flex-1'>
         {
            userLocation && userLocation.coords ?
               <MapView
                  ref={mapRef}
                  customMapStyle={mapStyle}
                  showsUserLocation={true}
                  provider='google'
                  initialRegion={{
                     latitude: userLocation.coords.latitude,
                     longitude: userLocation.coords.longitude,
                     latitudeDelta: 0.05,
                     longitudeDelta: 0.05,
                  }}
                  style={styles.map}
               /> :
               <MapView style={styles.map} customMapStyle={mapStyle} provider='google' />
         }
      </View>
   )
}
const styles = StyleSheet.create({
   map: {
      ...StyleSheet.absoluteFillObject,
      height: '120%',
   }
});

export default Map;