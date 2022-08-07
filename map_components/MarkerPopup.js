import React, { useEffect, useRef } from "react";
import { Animated, View, StyleSheet, Text, Dimensions } from "react-native";
import { IconButton } from "react-native-paper";

export default function MarkerPopup(props) {

    const calloutHeight = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (props.show) {
            Animated.timing(calloutHeight, {
                toValue: 150,
                duration: 500,
                useNativeDriver: false
            }).start();
        } else {
            Animated.timing(calloutHeight, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }).start();
        }
    }, [props.show]);

    return (
        <Animated.View
            style={[
                props.show ? styles.callout : styles.hidden,
                {
                    height: calloutHeight
                }
            ]}
        >
            <Text style={styles.title}>{'\n' + props.title}</Text>
            <IconButton color="#ea3535" style={styles.icon} size={50} icon='bookmark-plus'></IconButton>

        </Animated.View>
    );
}

const styles = StyleSheet.create({
    callout: {
        position: 'absolute',
        backgroundColor: 'white',
        bottom: 0,
        height: 150,
        width: Dimensions.get('window').width - 30,
        alignSelf: "center",
        borderRadius: 8,
    },
    hidden: {
        height: 0
    },
    title: {
        textAlign: "center",
        fontSize: 24
    }, icon: {
        alignSelf: "center",
    }
});