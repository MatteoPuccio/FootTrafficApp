import { createNativeStackNavigator } from "@react-navigation/native-stack";
import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";

import BookmarkScreen from "../screens/BookmarkScreen";
import BookmarkDetailsScreen from "../screens/BookmarkDetailsScreen";
import SetReminderScreen from "../screens/SetReminderScreen";
import color from "../constants/color";
import { useTranslation } from "react-i18next";


const Stack = createNativeStackNavigator();

export function BookmarkStack(props) {

    const { t } = useTranslation();

    const [bookmarkDetailsElement, setBookmarkDetailsElement] = useState(null);

    return (
        <Stack.Navigator initialRouteName="BookmarkScreen">
            <Stack.Screen name="BookmarkScreen"
                options={{
                    headerTintColor: color.mainColor,
                    headerTitle: t('common:bookmarkScreenLabel'),
                    headerBackVisible: false,
                }}
                children={() =>
                    <BookmarkScreen
                        getBookmarks={props.getBookmarks}
                        setBookmarks={props.setBookmarks}
                        accessToken={props.accessToken}
                        setBookmarkDetailsElement={setBookmarkDetailsElement}
                    />}
            />
            <Stack.Screen name="BookmarkDetailsScreen"
                options={{
                    headerTintColor: color.mainColor
                }}
                children={() =>
                    <BookmarkDetailsScreen
                        bookmark={bookmarkDetailsElement}
                        setBookmarks={props.setBookmarks}
                    />}
            />
            <Stack.Screen name="SetReminderScreen"
                options={{
                    headerTintColor: color.mainColor
                }}
                children={() =>
                    <SetReminderScreen
                        bookmark={bookmarkDetailsElement}
                    />
                }
            />
        </Stack.Navigator>
    )
}