import React, { useEffect, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import { getCurrentLocation, reverseGeocoding } from '../utils/geolocation/GeolocationUtils';
import { useTranslation } from 'react-i18next';
import { googleApiKey } from '../utils/geolocation/GeolocationUtils'

navigator.geolocation = require('react-native-geolocation-service');

Geocoder.init(googleApiKey, { language: 'it' });

function geocoderQuery(data, displayMapFunc) {
    console.log(data);
    Geocoder.from(data.description)
        .then(json => {

            var location = json.results[0].geometry.location;
            if (data.vicinity == undefined)
                reverseGeocoding(data, location, displayMapFunc);
            else
                displayMapFunc(data, location, data.vicinity);
        })
        .catch(error => console.warn(error));
}



const GooglePlacesInput = (props) => {
    const { t } = useTranslation();

    const [location, setLocation] = useState({ latLng: "0,0" })

    const setLocationState = async () => {
        setLocation(await getCurrentLocation());
    }

    useEffect(() => {
        setLocationState();
    }, [])

    return (
        <GooglePlacesAutocomplete
            placeholder={t('common:googlePlaceInputSearchPlaceholder')}
            onPress={(data, details = null) => {
                console.log(JSON.stringify(data));
                if (data.geometry == undefined) {
                    //geocoder query for places without address
                    geocoderQuery(data, props.displayMap);
                } else {
                    props.displayMap(data, data.geometry.location, data.vicinity);
                }

            }}
            onFail={(e) => console.log(e)}
            onTimeout={(e) => console.log(e)}
            query={{
                location: location.latLng,
                key: googleApiKey,
                language: 'it',
                type: 'establishment',
                rankby: 'distance',
                radius: 1000
            }}
            currentLocation={true}
            currentLocationLabel={t('common:currentLocationLabel')}
            enablePoweredByContainer={false}
        />
    );
};

export default GooglePlacesInput;