import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import MapView from 'react-native-maps'
import { UserCoords } from '../Type'
import * as Location from 'expo-location';

type Props = {}


const handlePress = (e: any) => {
    console.log("longpress :", e)
}


const Map = (props: Props) => {
    const [location, setLocation] = useState<UserCoords>();
    const [errorMsg, setErrorMsg] = useState("");
    useEffect(() => {
        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Permission to access location was denied');
                return;
            }
            let result: UserCoords = await Location.getCurrentPositionAsync({});
            setLocation(result)
        })();
    }, []);

    return (
        <View style={StyleSheet.absoluteFillObject} className="rounded">
            <MapView style={styles.map} provider='google' />
            <ActivityIndicator size='small' color="black" />
            {location &&
                <MapView style={styles.map}
                    showsUserLocation={true}
                    provider='google'
                    onLongPress={handlePress}
                    initialRegion={{
                        latitude: location.coords.latitude as number,
                        longitude: location.coords.longitude as number,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    }} />}
        </View>
    )
}

export default Map

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 30,
        height: '130%'

    }
});

function useEffect(arg0: () => void, arg1: never[]) {
    throw new Error('Function not implemented.')
}


function setErrorMsg(arg0: string) {
    throw new Error('Function not implemented.')
}
