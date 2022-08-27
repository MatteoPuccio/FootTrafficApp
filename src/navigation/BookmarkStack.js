import { createNativeStackNavigator } from "@react-navigation/native-stack";
import 'react-native-gesture-handler';
import React, { useEffect, useState } from "react";

import BookmarkScreen from "../screens/BookmarkScreen";
import BookmarkDetailsScreen from "../screens/BookmarkDetailsScreen";


const Stack = createNativeStackNavigator();

export function BookmarkStack(props) {

    const [bookmarkDetailsElement, setBookmarkDetailsElement] = useState(null);

    return (
        <Stack.Navigator initialRouteName="BookmarkScreen">
            <Stack.Screen name="BookmarkScreen"
                options={
                    {
                        headerShown: false,
                    }}
                children={() =>
                    <BookmarkScreen
                        getBookmarks={props.getBookmarks}
                        setBookmarks={props.setBookmarks}
                        accessToken={props.accessToken}
                        setBookmarkDetailsElement={setBookmarkDetailsElement}
                    />}
            />
            <Stack.Screen name="BookmarkDetailsScreen" children={() =>
                <BookmarkDetailsScreen
                    bookmark={bookmarkDetailsElement}
                />}
            />
        </Stack.Navigator>
    )
}