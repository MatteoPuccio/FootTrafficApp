import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { View, StyleSheet, Text, TouchableHighlight, Dimensions, Button, ActivityIndicator, Pressable } from "react-native";
import { TextInput } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { doLogin, doLoginToken, forgotPassword } from "../api/login";
import color from "../constants/color";
import { getItemEncrypted } from "../utils/common";



export default function SignInScreen(props) {

    const navigation = useNavigation();

    const [loginState, setLoginState] = useState({});

    const [emailFieldText, setEmailFieldText] = useState('');
    const [passwordText, setPasswordText] = useState('');

    useEffect(() => {

        const tryLoginWithToken = async () => {
            console.log(await getItemEncrypted('@registration_in_progress'));
            await doLoginToken();

            let token = await getItemEncrypted('@access_token');

            console.log(token);

            if (token != null)
                navigation.navigate("BottomNavigation");
        }

        tryLoginWithToken();
    }, []);



    const { t } = useTranslation();

    const login = async () => {
        if (!emailFieldText.length || !passwordText.length) {
            setLoginState({ emptyFields: true })
            return;
        }

        setLoginState({ loading: true });

        let _loginState = (await doLogin({
            'email': emailFieldText,
            'password': passwordText,
        }));

        setLoginState(_loginState);     //this is necessary because setState is asynchronous
        setEmailFieldText(null);
        setPasswordText(null);
        if (_loginState.successful)
            navigation.navigate("BottomNavigation");
    }

    if (loginState.hasOwnProperty("loading")) {
        return <ActivityIndicator size={"large"}></ActivityIndicator>
    }

    return (
        <View style={styles.container}>
            <View>
                <Icon style={styles.iconStyle} color='black' size={60} name="account"></Icon>
                <Text style={styles.signInText}>{t('loginForm:signIn')}</Text>
                <Text style={styles.signInSubText}>{t('loginForm:signInSubText')}</Text>
            </View>
            <TextInput
                style={styles.textInput}
                error={loginState.userNotFound || loginState.emptyFields}
                placeholder={t('loginForm:placeholderEmail')}
                onChangeText={newText => setEmailFieldText(newText)}
            />
            {
                loginState.userNotFound && <Text style={styles.subText}>{t('loginForm:userNotFound')}</Text>
            }

            <TextInput
                style={styles.textInput}
                placeholder={t('loginForm:placeholderPassword')}
                onChangeText={newText => setPasswordText(newText)}
                error={loginState.userNotFound || loginState.wrongPassword || loginState.emptyFields}
                secureTextEntry={true}
            />
            {
                loginState.wrongPassword && <Text style={styles.subText}>{t('loginForm:wrongPassword')}</Text>
            }
            {
                loginState.emptyFields && <Text style={styles.subText}>{t('loginForm:emptyFields')}</Text>
            }
            <View style={styles.buttonsContainer}>
                <TouchableHighlight underlayColor='#ececec' onPress={forgotPassword} style={styles.forgotPassword}>
                    <Text style={{ color: '#2196f3' }}>{t('loginForm:forgotPassword')}</Text>
                </TouchableHighlight>
            </View>
            <View style={styles.loginBttn}>
                <Button title={t('loginForm:loginBttn')} onPress={login} />
            </View>
            <View style={{ flexDirection: "row", justifyContent: 'center', marginTop: 15 }}>
                <Text>{t('loginForm:noAccountLabel')} </Text>
                <TouchableHighlight
                    underlayColor='#ececec'
                    onPress={() => navigation.navigate("RegistrationScreen")}>
                    <Text style={{ color: color.mainColor }}>{t('loginForm:signUpLabel')}</Text>
                </TouchableHighlight>
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