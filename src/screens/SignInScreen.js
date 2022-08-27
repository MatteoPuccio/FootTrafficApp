import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text, TouchableHighlight, Dimensions, Button } from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { doLogin, forgotPassword } from "../api/login";

export default function SignInScreen(props) {

    const [emailFieldText, setEmailFieldText] = useState(null);
    const [passwordText, setPasswordText] = useState(null);

    const { t } = useTranslation();

    const login = async () => {
        props.setAccessToken(doLogin({
            'email': emailFieldText,
            'password': passwordText,
        }));
    }

    return (
        <View style={styles.container}>
            <View>
                <Icon style={styles.iconStyle} color='black' size={60} name="account"></Icon>
                <Text style={styles.signInText}>{t('loginForm:signIn')}</Text>
                <Text style={styles.signInSubText}>to use the app</Text>
            </View>
            <TextInput
                style={styles.textInput}
                placeholder={t('loginForm:placeholderEmail')}
                onChangeText={newText => setEmailFieldText(newText)}
            />
            <TextInput
                style={styles.textInput}
                placeholder={t('loginForm:placeholderPassword')}
                onChangeText={newText => setPasswordText(newText)}
                secureTextEntry={true}
            />
            <View style={styles.buttonsContainer}>
                <TouchableHighlight underlayColor='#ececec' onPress={forgotPassword} style={styles.forgotPassword}>
                    <Text style={styles.forgotPassword}>{t('loginForm:forgotPassword')}</Text>
                </TouchableHighlight>
                <View style={styles.loginBttn}>
                    <Button title={t('loginForm:loginBttn')} onPress={login} />
                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        paddingTop: 80,
        height: Dimensions.get('window').height,
        backgroundColor: '#FFFFFF'
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
        marginTop: 10,
        marginLeft: 5,
        borderRadius: 3,
        color: '#2196f3',
        fontWeight: '600',
        fontSize: 15
    },
    loginBttn: {
        marginTop: 13,
        marginRight: 10
    }
});