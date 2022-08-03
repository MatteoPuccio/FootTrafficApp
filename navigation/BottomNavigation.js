import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';

import HomeScreen from "../screens/HomeScreen";
import SettingsScreen from "../screens/SettingsScreen";
import MapScreen from "../screens/MapScreen";
import TopBar from './TopNavigation';


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

export default function BottomNavigation() {

    return (

        <NavigationContainer>
            <TopBar />
            <Tab.Navigator
                initialRouteName="home"
                barStyle={styles.barStyle}
                labeled={false}
            >
                <Tab.Screen
                    name="home"
                    component={HomeScreen}
                    options={{
                        tabBarLabel: 'Home',
                        tabBarIcon: ({ focused, color }) => (
                            <TabIcon name="home" color={color} focused={focused} />
                        ),

                    }}
                />
                <Tab.Screen
                    name="map"
                    component={MapScreen}
                    options={{
                        tabBarLabel: 'Map',
                        tabBarIcon: ({ focused, color }) => (
                            <TabIcon name="google-maps" color={color} focused={focused} />
                        ),
                    }}

                />
                <Tab.Screen
                    name="settings"
                    component={SettingsScreen}
                    options={{
                        tabBarLabel: 'Settings',
                        tabBarIcon: ({ focused, color }) => (
                            <TabIcon name="cog" color={color} focused={focused} />
                        ),
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}


const styles = StyleSheet.create({
    barStyle: {
        backgroundColor: '#2319e0',
    }
});