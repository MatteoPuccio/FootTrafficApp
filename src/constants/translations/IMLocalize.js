import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RNLocalize from 'react-native-localize';

import en from "./en";
import it from "./it";

const LANGUAGES = {
    en,
    it
};

const LANG_CODES = Object.keys(LANGUAGES);

const LANGUAGE_DETECTOR = {
    type: 'languageDetector',
    async: true,
    detect: callback => {
        AsyncStorage.getItem('user-language', (err, language) => {
            // if error fetching stored data or no language was stored
            // display errors when in DEV mode as console statements
            if (err || !language) {
                if (err) {
                    console.log('Error fetching Languages from asyncstorage ', err);
                }
                const findBestAvailableLanguage =
                    RNLocalize.findBestAvailableLanguage(LANG_CODES);

                callback(findBestAvailableLanguage.languageTag || 'en');
                return;
            }
            callback(language);
        });
    },
    init: () => { },
    cacheUserLanguage: language => {
        AsyncStorage.setItem('user-language', language);
    }
};

i18n.use(LANGUAGE_DETECTOR) // detect language
    .use(initReactI18next)
    .init({
        // set options
        compatibilityJSON: 'v3',
        resources: LANGUAGES,
        react: {
            useSuspense: false
        },
        interpolation: {
            escapeValue: false
        }
    });
