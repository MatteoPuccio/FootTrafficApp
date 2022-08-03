import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Dimensions, PermissionsAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import MapView from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GooglePlacesInput from "../map_components/GooglePlacesInput";

export default function MapScreen() {
    const [showMap, setShowMap] = useState(false);
    const [coords, setCoords] = useState({
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });

    const getLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Busy Place App',
                    'message': 'Busy Place App access to your location '
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return true;
            } else {
                return false;
            }
        } catch (err) {
            console.warn(err)
        }

    }

    const getLocation = () => {
        if (getLocationPermission()) {
            Geolocation.getCurrentPosition(
                (position) => {
                    console.log(position);
                    setCoords({
                        latitude: position.coords.latitude,
                        longitude: position.coords.longitude,
                        latitudeDelta: coords.latitudeDelta,
                        longitudeDelta: coords.latitudeDelta,
                    });

                },
                (error) => {
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
    }

    const displayMap = () => {
        console.log("display");
        getLocation();
        setShowMap(true);
    }

    return (
        <View style={styles.container}>
            {showMap ?
                <MapView
                    zoomEnabled={true}
                    style={styles.map}
                    region={coords}
                    key='mapView' />
                : <GooglePlacesInput
                    style={styles.searchBar}
                    key='mapInput' />
            }
        </View >
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        height: Dimensions.get('window').height - 50,
        width: Dimensions.get('window').width
    },
    searchBar: {
        position: 'sticky',
    }
});