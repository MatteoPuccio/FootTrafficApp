import React, { useEffect } from "react";
import { View, StyleSheet, Button } from "react-native";

export function Callout(props) {
    return (
        <View style={[styles.callout, { height: props.size, width: props.size }]}>
            <CalloutTriangle size={props.size / 6} direction={props.direction}>
                <Text>{props.text}</Text>
            </CalloutTriangle>
        </View>
    )
}

function CalloutTriangle(props) {
    let topWidth, rightWidth, bottomWidth, leftWidth;
    useEffect(() => {
        switch (props.direction) {
            case 'up':
                topWidth = 0;
                rightWidth = props.size / 2;
                bottomWidth = props.size;
                leftWidth = props.size / 2;
                break;
            case 'down':
                topWidth = props.size;
                rightWidth = props.size / 2;
                bottomWidth = 0;
                leftWidth = props.size / 2;
                break;
            case 'left':
                topWidth = props.size / 2;
                rightWidth = props.size;
                bottomWidth = props.size / 2;
                leftWidth = 0;
                break;
            case 'right':
                topWidth = props.size / 2;
                rightWidth = 0;
                bottomWidth = props.size / 2;
                leftWidth = props.size;
                break;
            default:
                topWidth = props.size;
                rightWidth = props.size / 2;
                bottomWidth = 0;
                leftWidth = props.size / 2;
                break;
        }
    }, []);

    <View style={[styles.calloutTriangle,
    {
        height: props.size,
        width: props.size,
        borderTopWidth: topWidth,
        borderRightWidth: rightWidth,
        borderBottomWidth: bottomWidth,
        borderLeftWidth: leftWidth,
    }
    ]}>

    </View>
}

const styles = StyleSheet.create({
    callout: {
        opacity: 80,
        backgroundColor: 'white'
    },
    calloutTriangle: {
        opacity: 80,
        backgroundColor: 'white',
        position: 'absolute',
    }
});