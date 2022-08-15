import React, { useEffect } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geocoder from 'react-native-geocoding';
import { location } from '../utils/geolocation/GeolocationUtils';
import { useTranslation } from 'react-i18next';


navigator.geolocation = require('react-native-geolocation-service');

Geocoder.init('AIzaSyATzcYuSDLgX6sMUW42esjsy94sJpxRmF4', { language: 'it' });

function geocoderQuery(data, displayMapFunc) {
    Geocoder.from(data.description)
        .then(json => {
            var location = json.results[0].geometry.location;
            console.log(location);
            displayMapFunc(data, location);
        })
        .catch(error => console.warn(error));
}

const GooglePlacesInput = (props) => {
    const { t } = useTranslation();

    return (
        <GooglePlacesAutocomplete
            placeholder={t('common:googlePlaceInputSearchPlaceholder')}
            onPress={(data, details = null) => {
                // on press, show map
                console.log(JSON.stringify(data));

                if (data.geometry == undefined) {
                    //geocoder query for places without address
                    geocoderQuery(data, props.displayMap);
                } else {
                    props.displayMap(data, data.geometry.location);
                }

            }}
            onFail={(e) => console.log(e)}
            onTimeout={(e) => console.log(e)}
            query={{
                location: location.latLng,
                key: 'AIzaSyATzcYuSDLgX6sMUW42esjsy94sJpxRmF4',
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