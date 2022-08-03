import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

export default class GooglePlacesInput extends React.Component {

    render() {
        return (
            <GooglePlacesAutocomplete
                styles={this.props.style}
                placeholder='Search'
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details);
                }}
                query={{
                    key: 'AIzaSyDRAHy5tGdrg4heHZC-NiUGZZYPuIcW1Z8',
                    language: 'en',
                }}
            />
        );
    }
};