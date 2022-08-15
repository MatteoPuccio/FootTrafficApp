import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Button } from 'react-native';
import { IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { doRemoveBookmark } from "../api/bookmarks";

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
                toValue: 50,
                duration: 100,
                useNativeDriver: false
            }).start();
            Animated.timing(iconRotationValue, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true
            }).start();
        } else {
            Animated.spring(descriptionAnimation, {
                toValue: 0,
                duration: 100,
                useNativeDriver: false
            }).start();
            Animated.timing(iconRotationValue, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            }).start();
        }
        setExpanded(!expanded);
    }

    const removeBookmark = () => {
        props.deleteBookmark(props.bookmark.id)
        doRemoveBookmark(props.bookmark.name)
    }

    const iconRotation = iconRotationValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    return (
        <View style={styles.container}>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 15
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
                style={[styles.description, { height: descriptionAnimation }]}>
                {expanded &&
                    <View>
                        <BusyTimeGraph />
                        [
                        <IconButton
                            key='deleteBookmarkBttn'
                            icon='bookmark-remove'
                            color="tomato"
                            size={36}
                            onPress={removeBookmark}
                        />
                        ]
                    </View>
                }
            </Animated.View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
        borderRadius: 7,
    },
    name: {
        marginTop: 4,
        textAlign: 'center',
    },
    description: {
        flexDirection: 'row',
    }
});

