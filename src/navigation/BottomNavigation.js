import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MapScreen from "../screens/MapScreen";
import { fetchBookmarks } from '../api/bookmarks';
import color from '../constants/color';
import { BookmarkStack } from './BookmarkStack';
import { SettingsStack } from './SettingsStack';

const Tab = createMaterialBottomTabNavigator();

class TabIcon extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <Icon
                name={this.props.name} color={this.props.color}
                size={26}
            />
        );
    }
}



export default function BottomNavigation(props) {

    const [bookmarks, setBookmarks] = useState(null);

    useEffect(() => {
        fetchBookmarks(setBookmarks);
    }, []);

    //function to pass to children to get updated non-static props
    const getBookmarks = () => { return bookmarks; };

    return (

        <Tab.Navigator
            initialRouteName="bookmarks"
            barStyle={styles.barStyle}
            labeled={false}
        >
            <Tab.Screen
                name="map"
                children={() =>
                    <MapScreen
                        getBookmarks={getBookmarks}
                        setBookmarks={setBookmarks}
                    />}

                options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon name="google-maps" color={color} focused={focused} />
                    ),
                }}

            />
            <Tab.Screen
                name="bookmarks"
                children={() =>
                    <BookmarkStack
                        getBookmarks={getBookmarks}
                        setBookmarks={setBookmarks}
                        bookmarks={bookmarks}
                    />
                }
                options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon name="bookmark" color={color} focused={focused} />
                    ),
                }}

            />
            <Tab.Screen
                name="settings"
                component={SettingsStack}
                options={{
                    tabBarLabel: 'Settings',
                    tabBarIcon: ({ focused, color }) => (
                        <TabIcon name="cog" color={color} focused={focused} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}


const styles = StyleSheet.create({
    barStyle: {
        backgroundColor: color.mainColor,
    }
});