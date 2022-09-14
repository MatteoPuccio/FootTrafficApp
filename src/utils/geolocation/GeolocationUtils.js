import React, { useState } from "react";
import { PermissionsAndroid } from "react-native";



export var grantedPermission = false;
export function setGrantedPermission(granted) { grantedPermission = granted; }

export const googleApiKey = 'AIzaSyATzcYuSDLgX6sMUW42esjsy94sJpxRmF4';

var location = {
    acquired: false,
    latLng: "0,0"
}

//get user permission to use location
export const getLocationPermission = async () => {
    if (grantedPermission) return true;
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'Crowding Tracker App',
                'message': 'Crowing Tracker wants access to your location'
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            setGrantedPermission(true);
            getCurrentLocation();
            return true;
        } else {
            setGrantedPermission(false);
            return false;
        }
    } catch (err) {
        console.warn(err)
    }

}


//update current location
const _getCurrentLocation = async () => {
    if (getLocationPermission()) {
        let options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };

        await navigator.geolocation.default.getCurrentPosition(
            (position) => {
                location.latLng = JSON.stringify(position.coords.latitude) + ',' + JSON.stringify(position.coords.longitude);
                location.acquired = true;
                console.log(location);
                console.log(JSON.stringify(location));
            },
            (error) => { console.error(error.message) },
            options
        );
    }
};

export const getCurrentLocation = async () => {
    await _getCurrentLocation();
    return location;
}

export const reverseGeocoding = async (data, latLng, displayMap) => {
    fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng='
        + latLng.lat + ',' + latLng.lng + '&key=' + googleApiKey, {
        method: 'GET',
    })
        .then((json) => json.json())
        .then((json) => {
            console.log(JSON.stringify(json));
            displayMap(data, latLng, json.plus_code.compound_code);
        });
}
