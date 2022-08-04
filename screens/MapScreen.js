import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Dimensions, PermissionsAndroid } from "react-native";
import Geolocation from 'react-native-geolocation-service';
import MapView, { Marker } from 'react-native-maps';
import { IconButton } from "react-native-paper";

import GooglePlacesInput from "../map_components/GooglePlacesInput";
import MarkerModel from "../model/MarkerModel";

export default function MapScreen() {
    const [latitudeDelta, longitudeDelta] = [0.000922, 0.00421];

    const [showMap, setShowMap] = useState(false);
    const [coords, setCoords] = useState({
        latitude: 0.0,
        longitude: 0.0,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta
    });
    const [grantedPermission, setGrantedPermission] = useState(false);
    const [selectedMarker, setSelectedMarker] = useState(new MarkerModel(null));

    //get user permission to use location
    const getLocationPermission = async () => {
        if (grantedPermission) return true;
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': 'Busy Place App',
                    'message': 'Busy Place App access to your location '
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                setGrantedPermission(true);
                return true;
            } else {
                setGrantedPermission(false);
                return false;
            }
        } catch (err) {
            console.warn(err)
        }

    }


    const displayMap = (data, location) => {
        setCoords({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta
        });
        console.log('Showing map...');
        console.log(data);
        setSelectedMarker(new MarkerModel(data));
        setShowMap(true);
    }

    return (
        <View style={styles.container}>
            {showMap ?
                [<MapView
                    zoomEnabled={true}
                    style={styles.map}
                    initialRegion={coords}
                    region={coords}
                    key='mapView'
                    onMarkerPress={() => console.log('marker pressed')}
                >
                    <Marker
                        title={selectedMarker.title}
                        coordinate={selectedMarker.coordinate}
                        description={selectedMarker.description}
                    />
                </MapView>,
                <View key='exitBttnView' style={styles.exitMapButtonContainer}>
                    <IconButton
                        style={styles.exitMapButton}
                        icon='exit-to-app'
                        size={38}
                        color='#2319e0'
                        onPress={() => { setShowMap(false) }}
                    />
                </View>]
                : <GooglePlacesInput
                    displayMap={displayMap}
                    style={styles.searchBar}
                />
            }
        </View >
    );
}



const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    },
    searchBar: {

    },
    exitMapButtonContainer: {
        position: 'absolute',
        alignSelf: 'flex-end'
    },
    exitMapButton: {
        //backgroundColor: '#cacbd5'
    }
});