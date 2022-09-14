import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import ConfirmEmailScreen from "../screens/ConfirmEmailScreen";
import RegistrationScreen from "../screens/RegistrationScreen";
import SignInScreen from "../screens/SignInScreen";

export default function AuthenticationStack(props) {

    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator>
            <Stack.Screen name='SignInScreen'
                options={{ headerShown: false }}
                children={() =>
                    <SignInScreen />
                }
            />
            <Stack.Screen name='RegistrationScreen'
                options={{ headerShown: false }}
                children={() =>
                    <RegistrationScreen />
                }
            />
            <Stack.Screen name='ConfirmEmailScreen'
                options={{ headerShown: false }}
                children={() =>
                    <ConfirmEmailScreen />
                }
            />
        </Stack.Navigator>
    );

};