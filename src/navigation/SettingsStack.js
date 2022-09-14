import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTranslation } from "react-i18next";
import { View } from "react-native";

import SettingsScreen from "../screens/SettingsScreen";
import LanguageSelectorScreen from "../screens/LanguageSelectorScreen";
import color from "../constants/color";
import { doLogout } from "../api/login";
import { useNavigation } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export function SettingsStack() {

    const { t } = useTranslation();

    return (
        <Stack.Navigator initialRouteName="SettingScreen">
            <Stack.Screen name="SettingsScreen"
                options={{
                    headerTitle: t('settings:settings'),
                    headerTintColor: color.mainColor,
                    headerBackVisible: false,
                }}
                children={() =>
                    <SettingsScreen />}
            />
            <Stack.Screen name="LanguageSelectorScreen"
                options={{
                    headerTitle: t('settings:languageSelector'),
                    headerTintColor: color.mainColor
                }}
                children={() =>
                    <LanguageSelectorScreen />}
            />
        </Stack.Navigator>
    )
}