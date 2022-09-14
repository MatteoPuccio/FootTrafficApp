import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Dimensions } from "react-native";
import MapView, { Callout, Marker } from 'react-native-maps';
import { ActivityIndicator, IconButton } from "react-native-paper";

import GooglePlacesInput from "../components/GooglePlacesInput";
import MarkerModel from "../model/MarkerModel";
import {
    getCurrentLocation,
    location
} from "../utils/geolocation/GeolocationUtils"
import MarkerPopup from "../components/MarkerPopup";



navigator.geolocation = require('react-native-geolocation-service');

export default function MapScreen(props) {
    const [latitudeDelta, longitudeDelta] = [0.000922, 0.00421];
    const [coords, setCoords] = useState({
        latitude: 0.0,
        longitude: 0.0,
        latitudeDelta: latitudeDelta,
        longitudeDelta: longitudeDelta
    });

    const [userLocation, setUserLocation] = useState(location);

    const [selectedMarker, setSelectedMarker] = useState(new MarkerModel(null));

    const [showPopup, setShowPopup] = useState(false);
    const [showMap, setShowMap] = useState(false);

    useEffect(() => {
        const _setUserLocation = async () => {
            const _location = await getCurrentLocation();
            setUserLocation(_location);
        }

        _setUserLocation();
    }, []);

    const displayMap = (_data, _location, address) => {
        console.log(JSON.stringify(_data) + " " + JSON.stringify(_location));
        setCoords({
            latitude: _location.lat,
            longitude: _location.lng,
            latitudeDelta: latitudeDelta,
            longitudeDelta: longitudeDelta,
        });
        console.log(_data);
        _data.geometry = {
            location: _location,
        };
        _data.address = address;
        setSelectedMarker(new MarkerModel(_data));
        setShowMap(true);
    }

    const markerPress = () => {
        setShowPopup(!showPopup);
    }

    if (userLocation == null) {
        return (
            <View style={{ justifyContent: "center", flex: 1 }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    console.log(JSON.stringify(userLocation));
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
                    <Marker coordinate={selectedMarker.coordinate} onPress={markerPress} />
                </MapView>,
                <View key='exitBttnView' style={styles.exitMapButtonContainer}>
                    <IconButton
                        style={styles.exitMapButton}
                        icon='exit-to-app'
                        size={38}
                        color='#2319e0'
                        onPress={() => { setShowMap(false) }}
                    />
                </View>,
                <MarkerPopup
                    key='markerPopup'
                    marker={selectedMarker}
                    show={showPopup}
                    setShow={setShowMap}
                    setBookmarks={props.setBookmarks}
                    getBookmarks={props.getBookmarks}
                />
                ]
                : <GooglePlacesInput
                    displayMap={displayMap}
                    location={userLocation}
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
    exitMapButtonContainer: {
        position: 'absolute',
        alignSelf: 'flex-end'
    },
    exitMapButton: {
        backgroundColor: 'white',
        borderColor: 'rgba(0,0,0,0.3)',
        borderWidth: 1,
        elevation: 5,
    },
});