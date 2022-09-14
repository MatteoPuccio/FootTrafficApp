import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native"
import { ActivityIndicator } from "react-native-paper";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import { updateBusyChart } from '../components/BusyTimeBarChart'
import Bookmark from '../components/Bookmark.js';
import { ScrollView } from "react-native-gesture-handler";


export default function BookmarkScreen(props) {

    const [prevState, setPrevState] = useState(null);

    useEffect(() => {
        //force rerender if prev bookmarks are different
        let bookmarks = props.getBookmarks();

        if (bookmarks != prevState) {
            setPrevState(bookmarks);
        }
    }, [props.getBookmarks()])

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
        <ScrollView>
            {props.getBookmarks().map((bookmark) =>
                <Bookmark
                    key={bookmark.id + bookmark.name}
                    bookmark={bookmark}
                    deleteBookmark={deleteBookmark}
                    viewBookmarkDetails={viewBookmarkDetails}
                />
            )}
        </ScrollView >
    );
}
