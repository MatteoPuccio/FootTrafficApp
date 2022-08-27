import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function Bookmark(props) {

    return (
        <View style={styles.container}>
            <View style={styles.bookmarkIcon}>
                <Icon size={48} name='bookmark' color={'#e80005'} />
            </View>
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 10,
            }}>
                <Text style={styles.name}>{props.bookmark.name}</Text>
                <TouchableHighlight
                    style={{ borderRadius: 50 }}
                    onPress={() => props.viewBookmarkDetails(props.bookmark.id)}>
                    <View style={{ backgroundColor: "#fff" }}>
                        <Icon size={30} name='chevron-right'></Icon>
                    </View>
                </TouchableHighlight>
            </View>
        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 20,
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
});

