import React from "react";
import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { useTranslation } from "react-i18next";

export const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'it', label: 'Italiano' }
];

export default function LanguageSelectorScreen(props) {

    const { t, i18n } = useTranslation();
    const selectedLanguageCode = i18n.language;

    const setLanguage = code => {
        return i18n.changeLanguage(code);
    };

    return (
        <View style={styles.container}>

            {LANGUAGES.map(language => {
                const selectedLanguage = language.code === selectedLanguageCode;

                return (

                    <TouchableHighlight
                        key={language.code}
                        disabled={selectedLanguage}
                        onPress={() => setLanguage(language.code)}
                    >
                        <View style={styles.langContainer}>
                            <Text
                                style={[selectedLanguage ? styles.selectedText : styles.text]}
                            >
                                {language.label}
                            </Text>
                        </View>
                    </TouchableHighlight>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    langContainer: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    text: {
        fontSize: 18,
        paddingVertical: 4
    },
    selectedText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'black',
        paddingVertical: 4
    },
    languageIcon: {
        position: "absolute",
        margin: 0,
        right: 10,
    }
});