import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Text, Dimensions } from "react-native";
import { IconButton } from "react-native-paper";
import { addBookmark } from "../api/bookmarks";

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
            'longitude': props.marker.coordinate.longitude
        };
        addBookmark(bookmark, props.setBookmarks);

        //props.setShow(false);
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
            <Text style={styles.title}>{'\n' + props.marker.title}</Text>
            <IconButton
                color="#ea3535"
                style={styles.icon}
                size={50}
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
    },
    title: {
        textAlign: "center",
        fontSize: 24
    }, icon: {
        alignSelf: "center",
    }
});