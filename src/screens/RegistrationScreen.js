import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text, TouchableHighlight, Dimensions, Button, ActivityIndicator, Pressable } from "react-native";
import { IconButton, TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { doLogin, doLoginToken, doSignUp, forgotPassword } from "../api/login";
import color from "../constants/color";
import { getItemEncrypted, validateEmail } from "../utils/common";



export default function RegistrationScreen(props) {

    const { t, i18n } = useTranslation();

    const navigation = useNavigation();

    const [registrationState, setRegistrationState] = useState({});

    const [emailFieldText, setEmailFieldText] = useState('');
    const [passwordText, setPasswordText] = useState('');
    const [repeatPasswordText, setRepeatPasswordText] = useState('');

    useEffect(() => {

    }, []);

    const register = async () => {

        if (!emailFieldText.length || !passwordText.length || !repeatPasswordText.length)
            setRegistrationState({ emptyFields: true })
        else if (!validateEmail(emailFieldText))
            setRegistrationState({ invalidEmail: true })
        else if (repeatPasswordText != passwordText)
            setRegistrationState({ passwordMismatch: true })

        else {
            setRegistrationState({ loading: true });

            let _registrationState = await doSignUp({
                email: emailFieldText,
                password: passwordText,
                locale: i18n.language,
            });

            setRegistrationState(_registrationState);     //this is necessary because setState is asynchronous
            setEmailFieldText(null);
            setPasswordText(null);
            if (_registrationState.successful || _registrationState.emailNotConfirmed)
                navigation.navigate("ConfirmEmailScreen");
        }
    }

    if (registrationState.hasOwnProperty("loading")) {
        return <ActivityIndicator size={"large"}></ActivityIndicator>
    }

    return (
        <View style={styles.container}>
            <IconButton
                style={{ position: "absolute" }}
                size={34} color={color.mainColor}
                icon={'chevron-left'}
                onPress={() => navigation.navigate('SignInScreen')}
            />
            <View>
                <Icon style={styles.iconStyle} color='black' size={60} name="account"></Icon>
                <Text style={styles.signInText}>{t('loginForm:signUp')}</Text>
            </View>
            <TextInput
                style={styles.textInput}
                placeholder={t('loginForm:placeholderEmail')}
                onChangeText={newText => setEmailFieldText(newText)}
                error={registrationState.emptyFields || registrationState.invalidEmail}
            />
            {
                registrationState.invalidEmail && <Text style={styles.subText}>{t('loginForm:invalidEmail')}</Text>
            }
            <TextInput
                style={styles.textInput}
                placeholder={t('loginForm:placeholderPassword')}
                onChangeText={newText => setPasswordText(newText)}
                secureTextEntry={true}
                error={registrationState.emptyFields}

            />
            <TextInput
                style={styles.textInput}
                placeholder={t('loginForm:placeholderPasswordRepeat')}
                onChangeText={newText => setRepeatPasswordText(newText)}
                secureTextEntry={true}
                error={registrationState.emptyFields}
            />
            {
                registrationState.passwordMismatch &&
                <View style={styles.subLabel}>
                    <Icon size={20} name="alert-circle" color={color.dangerousAction}></Icon>
                    <Text style={styles.subText}>{t('loginForm:passwordMismatch')}</Text>
                </View>
            }
            {
                registrationState.emptyFields &&
                <View style={styles.subLabel}>
                    <Icon size={20} name="alert-circle" color={color.dangerousAction}></Icon>
                    <Text style={styles.subText}>{t('loginForm:emptyFields')}</Text>
                </View>
            }
            <View style={styles.loginBttn}>
                <Button title={t('loginForm:signUpBttn')} onPress={register} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        height: Dimensions.get('window').height,
        backgroundColor: '#FFFFFF',
    },
    textInput: {
        borderRadius: 3,
        marginVertical: 5,
        backgroundColor: 'white',

    },
    buttonsContainer: {
        flexDirection: "row",
        justifyContent: 'space-between',
    },
    iconStyle: {
        alignSelf: 'center'
    },
    signInText: {
        fontSize: 28,
        color: 'black',
        marginBottom: 10,
        textAlign: "center"
    },
    signInSubText: {
        fontSize: 17,
        color: 'black',
        marginBottom: 30,
        textAlign: "center"
    },
    forgotPassword: {
        marginTop: 5,
        marginLeft: 5,
        borderRadius: 3,
        fontWeight: '600',
        fontSize: 15
    },
    loginBttn: {
        marginTop: 13,
        paddingHorizontal: 80,
    },
    subText: {
        marginLeft: 10,
        color: color.dangerousAction,
        fontSize: 14,
    },
});
