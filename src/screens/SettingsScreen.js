import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native"
import { doLogout } from "../api/login";
import color from "../constants/color";
import { LANGUAGES } from "./LanguageSelectorScreen";

export default function SettingsScreen(props) {

    const { t, i18n } = useTranslation();

    const navigation = useNavigation();

    const logout = () => {
        doLogout();
        navigation.navigate("SignInScreen");
    }

    return (
        <View style={styles.container}>
            <TouchableHighlight
                onPress={() => { navigation.navigate("LanguageSelectorScreen") }}
            >
                <View style={styles.item}>
                    <Text style={styles.settingTitle}>{t('settings:languageSelector')}</Text>
                    <Text style={styles.selectedSetting}>{LANGUAGES.filter((lang) => lang.code == i18n.language)[0].label}</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight onPress={logout}>
                <View style={styles.item}>
                    <Text style={styles.logoutTitle}>{t('settings:logoutLabel')}</Text>
                </View>
            </TouchableHighlight>
        </View >
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    item: {
        alignContent: "center",
        backgroundColor: 'white',
        paddingVertical: 20,
        paddingHorizontal: 30,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    settingTitle: {
        color: 'black',
        fontSize: 17,
    },
    logoutTitle: {
        color: color.dangerousAction,
        fontSize: 18,
        fontWeight: "600",
    }
});