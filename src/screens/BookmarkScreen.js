import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native"
import { ActivityIndicator } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import { updateBusyChart } from '../components/BusyTimeBarChart'
import Bookmark from '../components/Bookmark.js';


export default function BookmarkScreen(props) {

    const navigation = useNavigation();

    const viewBookmarkDetails = (id) => {
        console.log(props.getBookmarks()
            .filter(bookmark => id == bookmark.id)[0]);
        props.setBookmarkDetailsElement(props.getBookmarks()
            .filter(bookmark => id == bookmark.id)[0]);

        updateBusyChart();
        navigation.navigate('BookmarkDetailsScreen');
    }

    const { t } = useTranslation();

    const deleteBookmark = (id) => {
        props.setBookmarks(props.getBookmarks().filter(bookmark => bookmark.id != id));
    }

    if (props.getBookmarks() == null) {
        return (
            <View style={{ justifyContent: "center", flex: 1 }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }
    if (!props.getBookmarks().length) {
        return (
            <View style={{ justifyContent: "center", flex: 1 }}>
                <Text style={{ textAlign: 'center', fontSize: 28, lineHeight: 50, fontStyle: 'italic' }}>{t('common:zeroBookmarksLabel')}</Text>
            </View>

        );
    }

    return (
        <View style={styles.bookmarkContainer}>
            {props.getBookmarks().map((bookmark) => {
                return (
                    <Bookmark
                        key={bookmark.id}
                        bookmark={bookmark}
                        deleteBookmark={deleteBookmark}
                        viewBookmarkDetails={viewBookmarkDetails}
                    />
                );
            })}
        </View >
    );
}

const styles = StyleSheet.create({
    bookmarkContainer:
    {
        marginVertical: 15,
    }
});