import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useTranslation } from "react-i18next";
import Icon from 'react-native-vector-icons/Ionicons';
import { IconButton } from "react-native-paper";

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'it', label: 'Italiano' }
];

export default function Selector(props) {
    const { t, i18n } = useTranslation();
    const selectedLanguageCode = i18n.language;

    const setLanguage = code => {
        return i18n.changeLanguage(code);
    };

    return (
        <View style={styles.container}>
            <View style={styles.row}>
                <IconButton style={styles.backButton} icon={'arrow-left'} />
                <Text style={styles.title}>{t('settings:languageSelector')}</Text>
                <Icon style={styles.languageIcon} color='#444' size={28} name='language' />
            </View>
            {LANGUAGES.map(language => {
                const selectedLanguage = language.code === selectedLanguageCode;

                return (
                    <Pressable
                        key={language.code}
                        style={styles.buttonContainer}
                        disabled={selectedLanguage}
                        onPress={() => setLanguage(language.code)}
                    >
                        <Text
                            style={[selectedLanguage ? styles.selectedText : styles.text]}
                        >
                            {language.label}
                        </Text>
                    </Pressable>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 15,
        paddingHorizontal: 8
    },
    row: {
    },
    title: {
        color: '#444',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center'
    },
    buttonContainer: {
        marginTop: 10
    },
    text: {
        fontSize: 18,
        color: '#000',
        paddingVertical: 4
    },
    selectedText: {
        fontSize: 18,
        fontWeight: '600',
        color: 'tomato',
        paddingVertical: 4
    },
    backButton: {
        position: "absolute",
        margin: 0,
        left: 10
    },
    languageIcon: {
        position: "absolute",
        margin: 0,
        right: 10,
    }
});