import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Button } from 'react-native';
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import { doRemoveBookmark } from "../api/bookmarks";
import { BusyTimeBarChart } from "./BusyTimeBarChart";
import color from "../constants/color";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



export default function Bookmark(props) {

    const [expanded, setExpanded] = useState(false);

    //rotate arrow icon and collapse/expand card
    const descriptionAnimation = useRef(new Animated.Value(0)).current;
    const iconRotationValue = useRef(new Animated.Value(0)).current;

    //animated icon button
    const AnimatedIcon = Animated.createAnimatedComponent(Icon);

    const expand = () => {
        if (!expanded) {
            Animated.spring(descriptionAnimation, {
                toValue: 60,
                duration: 30,
                useNativeDriver: false,
                friction: 10,
            }).start();
            Animated.timing(iconRotationValue, {
                toValue: 1,
                duration: 100,
                useNativeDriver: true
            }).start();
        } else {
            Animated.spring(descriptionAnimation, {
                toValue: 0,
                duration: 30,
                useNativeDriver: false
            }).start();
            Animated.timing(iconRotationValue, {
                toValue: 0,
                duration: 100,
                useNativeDriver: true
            }).start();
        }
        setExpanded(!expanded);
    }

    const removeBookmark = () => {
        props.deleteBookmark(props.bookmark.id)
        doRemoveBookmark(props.bookmark.name)
    }

    const examineBookmark = () => {

    }

    const iconRotation = iconRotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View style={styles.container}>
            <View style={styles.bookmarkIcon}>
                <Icon size={48} name='bookmark' color={'#e80005'} />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15,
            }}>
                <Text style={styles.name}>{props.bookmark.name}</Text>
                <AnimatedIcon
                    onPress={expand}
                    name='chevron-down'
                    style={[styles.icon, { transform: [{ rotate: iconRotation }] }]}
                    size={24}
                />
            </View>
            <Animated.View
                style={{ height: descriptionAnimation }}>
                {expanded &&
                    <View style={styles.description}>
                        <IconButton
                            style={{ marginTop: 20 }}
                            key='examineBookmarkBttn'
                            icon='map-search'
                            color='#2319e0'
                            size={36}
                            onPress={examineBookmark}
                        />
                        <IconButton
                            style={{ marginTop: 20 }}
                            key='deleteBookmarkBttn'
                            icon='bookmark-remove'
                            color="tomato"
                            size={36}
                            onPress={removeBookmark}
                        />
                    </View>
                }
            </Animated.View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        backgroundColor: 'white',
        marginBottom: 15,
        marginHorizontal: 10,
        borderRadius: 5,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 0.6,
        elevation: 2
    },
    bookmarkIcon: {
        position: 'absolute',
        left: 280,
        top: -2,
        transform: [{ scaleY: 1.4 }],
    },
    name: {
        fontSize: 20,
        color: 'black'
    },
    description: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    }
});

