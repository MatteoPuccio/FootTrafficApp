import React from "react";
import { View, StyleSheet } from "react-native"
import Selector from "../components/LanguageSelector";

export default function SettingsScreen() {
    return (
        <View style={styles.container}>
            <Selector />

        </View>
    );
}


const styles = StyleSheet.create({
    container: {

    }
});