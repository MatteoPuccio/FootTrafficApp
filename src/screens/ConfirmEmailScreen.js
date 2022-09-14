import { useNavigation } from "@react-navigation/native";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, Pressable, Text, TouchableHighlight } from "react-native";
import { ActivityIndicator, TextInput } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { doConfirmEmail, resendRegistrationEmail } from "../api/login";
import color from "../constants/color";
import { deleteItemEncrypted } from "../utils/common";


export default function ConfirmEmailScreen(props) {

    const TOKEN_LENGTH = 8;
    const codeDigitsArray = new Array(TOKEN_LENGTH).fill(0);
    const ref = useRef(null);

    const { t, i18n } = useTranslation();

    const navigator = useNavigation();

    const [token, setToken] = useState('');
    const [formState, setFormState] = useState({});
    const [containerIsFocused, setContainerIsFocused] = useState(false);

    const toDigitInput = (_value, idx) => {
        const emptyInputChar = '  ';
        const digit = token[idx] || emptyInputChar;

        const isCurrentDigit = idx === token.length;
        const isLastDigit = idx === TOKEN_LENGTH - 1;
        const isCodeFull = token.length === TOKEN_LENGTH;

        const isFocused = isCurrentDigit || (isLastDigit && isCodeFull);


        const containerStyle =
            containerIsFocused && isFocused
                ? { ...styles.inputContainer, ...styles.inputContainerFocused }
                : formState.wrongCode ? { ...styles.inputContainer, color: color.dangerousAction }
                    : styles.inputContainer;

        return (
            <View key={idx} style={containerStyle}>
                <Text style={{ fontSize: 24 }}>{digit}</Text>
            </View>
        );
    };

    const confirmEmail = async () => {
        setContainerIsFocused(false);
        if (token == '')
            setFormState({ empty: true })
        else {
            setFormState({ loading: true });

            let _formState = await doConfirmEmail({ token: token, locale: i18n.language })

            setFormState(_formState);
            setToken('');

            if (_formState.successful) {
                deleteItemEncrypted('@registration_in_progress');
                navigator.navigate("SignInScreen")
            }
        }
    }


    if (formState.loading) {
        return <ActivityIndicator size={'large'} color={color.mainColor} />
    }

    return (

        <View style={styles.container}>

            <View style={styles.labelContainer}>
                <Text style={{ fontSize: 30, color: 'black' }}>{t('loginForm:almostThereLabel')}</Text>
                <Text style={{ marginTop: 50, fontSize: 22, color: 'black' }}>{t('loginForm:almostThereSubLabel')}</Text>

            </View>

            <Pressable style={styles.inputsContainer} onPress={() => {
                setContainerIsFocused(true);
                ref.current.focus();
            }}>
                {codeDigitsArray.map(toDigitInput)}
            </Pressable>
            <TextInput
                ref={ref}
                style={styles.codeInput}
                error={formState.empty || formState.wrongCode || formState.expiredCode}
                keyboardType='number-pad'
                maxLength={TOKEN_LENGTH}
                returnKeyType="done"
                textContentType="oneTimeCode"
                onChangeText={setToken}
                onSubmitEditing={confirmEmail}
            />
            {
                formState.wrongCode &&
                <View style={styles.subLabel}>
                    <Icon size={20} name="alert-circle" color={color.dangerousAction}></Icon>
                    <Text style={{ color: color.dangerousAction }}>{t('loginForm:wrongCode')}</Text>
                </View>
            }
            {
                formState.expiredCode &&
                <View style={styles.subLabel}>
                    <Icon size={20} name="alert-circle" color={color.dangerousAction}></Icon>
                    <Text style={{ color: color.dangerousAction }}>{t('loginForm:confirmationEmailWarning')}</Text>
                </View>
            }
            {
                formState.emailSentAgain &&
                <View style={styles.subLabel}>
                    <Icon size={20} name="alert-circle" color={color.mainColorInactive}></Icon>
                    <Text style={{ color: color.mainColorInactive }}>{t('loginForm:emailSentAgain')}</Text>
                </View>
            }

            <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: 15 }}>
                <TouchableHighlight
                    underlayColor='#ececec'
                    onPress={() => {
                        setFormState({ emailSentAgain: true })
                        resendRegistrationEmail()
                    }}>
                    <Text style={{ color: color.mainColor }}>{t('loginForm:noEmail')}</Text>
                </TouchableHighlight>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    codeInput: {
        position: "absolute",
        height: 0,
        width: 0,
        opacity: 0
    },
    inputContainer: {
        borderColor: color.inactive,
        borderWidth: 2,
        borderRadius: 4,
        paddingHorizontal: 10,
        paddingVertical: 15,
        marginHorizontal: 3
    },
    inputContainerFocused: {
        borderColor: color.mainColor
    },
    inputsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    labelContainer: {
        marginTop: 50,
        marginBottom: 150,
        alignItems: 'center'
    },
    subLabel: {
        marginTop: 10,
        flexDirection: "row"
    }
})