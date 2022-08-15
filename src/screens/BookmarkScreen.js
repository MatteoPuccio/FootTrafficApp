import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native"
import { ActivityIndicator } from "react-native-paper";

import Bookmark from '../components/Bookmark.js';
import { fetchBookmarks } from "../api/bookmarks.js";
import { useTranslation } from "react-i18next";
import { bookmarks } from "../api/bookmarks.js";

export default function BookmarkScreen(props) {


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
    console.log("BookmarkScreen bookmarks: " + JSON.stringify(props.getBookmarks()));
    return (
        <View style={styles.bookmarkContainer}>
            {props.getBookmarks().map((bookmark) => {
                return (
                    <Bookmark key={bookmark.id} bookmark={bookmark} deleteBookmark={deleteBookmark} />
                );
            })}
        </View >
    );
}

const styles = StyleSheet.create({
    bookmarkContainer:
    {
        marginVertical: 15,
        backgroundColor: 'white'
    }
});