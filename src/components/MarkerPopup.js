import React, { useEffect, useRef } from "react";
import { Animated, StyleSheet, Text, Dimensions } from "react-native";
import { IconButton } from "react-native-paper";
import { addBookmark } from "../api/bookmarks";
import color from "../constants/color";

export default function MarkerPopup(props) {

    const calloutHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (props.show) {
            Animated.spring(calloutHeight, {
                toValue: 150,
                duration: 500,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(calloutHeight, {
                toValue: 0,
                duration: 300,
                useNativeDriver: false
            }).start();
        }
    }, [props.show]);

    const bookmarkLocation = () => {
        let bookmark = {
            'name': props.marker.title,
            'latitude': props.marker.coordinate.latitude,
            'longitude': props.marker.coordinate.longitude,
            'address': props.marker.address,
        };
        console.log(bookmark);
        addBookmark(bookmark, props.setBookmarks);

        props.setShow(false);
    }

    return (
        <Animated.View
            style={[
                styles.callout,
                {
                    height: calloutHeight
                }
            ]}
        >
            <Text style={styles.title}>{'\n' + (props.marker.title).toUpperCase()}</Text>
            <IconButton
                color="white"
                style={styles.icon}
                size={40}
                icon='bookmark-plus'
                onPress={bookmarkLocation}
            />
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    callout: {
        position: 'absolute',
        backgroundColor: 'white',
        bottom: 15,
        height: 0,
        width: Dimensions.get('window').width - 30,
        alignSelf: "center",
        borderRadius: 8,
        borderTopWidth: 0.5,
        borderRightWidth: 0.5,
        borderLeftWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.1)'
    },
    title: {
        textAlign: "center",
        fontSize: 24,
        color: 'black',
        fontWeight: "500"
    },
    icon: {
        alignSelf: "center",
        borderWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.2)',
        elevation: 3,
        backgroundColor: '#ea3535'
    }
});