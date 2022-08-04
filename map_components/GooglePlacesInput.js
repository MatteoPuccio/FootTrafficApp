import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { SafeAreaView, ScrollView } from 'react-native';
import Geocoder from 'react-native-geocoding';

navigator.geolocation = require('react-native-geolocation-service');

Geocoder.init('AIzaSyATzcYuSDLgX6sMUW42esjsy94sJpxRmF4', { language: 'it' });

function geocoderQuery(data, displayMapFunc) {
    Geocoder.from(data.description)
        .then(json => {
            var location = json.results[0].geometry.location;
            console.log(location);
            data.ge
            displayMapFunc(data, location);
        })
        .catch(error => console.warn(error));
}

const GooglePlacesInput = (props) => {
    return (
        <GooglePlacesAutocomplete
            styles={props.style}
            placeholder='Search'
            onPress={(data, details = null) => {
                // on press, show map
                console.log(data);
                typeof (data.geometry.location) === 'undefined' ? props.displayMap(data, data.geometry.location) :
                    location = geocoderQuery(data, props.displayMap);
            }}
            onFail={(e) => console.log(e)}
            onTimeout={(e) => console.log(e)}
            query={{
                key: 'AIzaSyATzcYuSDLgX6sMUW42esjsy94sJpxRmF4',
                language: 'it',
            }}
            currentLocation={true}
            currentLocationLabel='Vicino a te'
            enablePoweredByContainer={false}
        />
    );
};

export default GooglePlacesInput;