import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View, Text, Switch, TouchableHighlight } from "react-native";
import { Button } from "react-native-paper";
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import messaging from '@react-native-firebase/messaging';


import { getReminder, saveReminder } from "../api/bookmarks";

export default function SetReminderScreen(props) {

    const { t, i18n } = useTranslation();

    const navigation = useNavigation();

    const [reminder, setReminder] = useState({
        "enabled": false,
        "timestamp": new Date(new Date().getTime() + (1000 * 60 * 60 * 3))
    });

    useEffect(() => {
        navigation.setOptions({ headerTitle: props.bookmark.name });
        getReminder(props.bookmark, setReminder);
    }, [props.bookmark]);

    const showTimePicker = (type) => {
        DateTimePickerAndroid.open({
            value: reminder.timestamp,
            onChange: (event, selectedDate) => {
                setReminder({
                    "enabled": reminder.enabled,
                    "timestamp": selectedDate
                });
            },
            mode: type,
            is24Hour: true,
        });
    }

    const cancelEdit = () => {
        navigation.navigate("BookmarkDetailsScreen");
    }

    const saveEdit = () => {
        messaging().getToken().then((token) => {
            reminder.tokenFCM = token;
            reminder.language = i18n.language;

            //convert date to utc
            reminder.timestamp = new Date(Date.UTC(reminder.timestamp.getUTCFullYear(), reminder.timestamp.getUTCMonth(),
                reminder.timestamp.getUTCDate(), reminder.timestamp.getUTCHours(),
                reminder.timestamp.getUTCMinutes(), reminder.timestamp.getUTCSeconds()));
            saveReminder(props.bookmark, reminder);
            navigation.navigate("BookmarkDetailsScreen");
        });

    }

    return (
        <View style={styles.container}>
            <View style={styles.activateReminderContainer}>
                <Text style={styles.activateReminderText}>{t('reminder:activateReminderLabel')}</Text>
                <Switch
                    value={reminder.enabled}
                    onValueChange={() => setReminder({
                        timestamp: reminder.timestamp,
                        enabled: !reminder.enabled
                    })}
                    thumbColor={reminder.enabled ? '#2196f3' : "white"}
                    trackColor={{ false: "#767577", true: "#90caf9" }}
                />
            </View>

            <TouchableHighlight onPress={() => showTimePicker('time')}>
                <View style={styles.itemContainer}>
                    <Text style={styles.activateReminderText}>{t('reminder:pickTimeLabel')}</Text>
                    {reminder.timestamp != null &&
                        <Text>{reminder.timestamp.toLocaleTimeString().slice(0, -3)}</Text>
                    }
                </View>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => showTimePicker('date')}>
                <View style={styles.itemContainer}>
                    <Text style={styles.activateReminderText}>{t('reminder:pickDateLabel')}</Text>
                    {reminder.timestamp != null &&
                        <Text>{reminder.timestamp.toLocaleDateString()}</Text>
                    }
                </View>
            </TouchableHighlight>

            <Button onPress={cancelEdit} color="grey" style={styles.cancelButton}>{t('common:cancel')}</Button>
            <Button onPress={saveEdit} mode='contained' style={styles.saveButton}>{t('common:save')} </Button>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    activateReminderContainer: {
        paddingVertical: 25,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 30,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.2)'
    },
    itemContainer: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderColor: 'rgba(0,0,0,0.2)',
    },
    activateReminderText: {
        fontSize: 17,
        color: 'black',
    },
    cancelButton: {
        position: 'absolute',
        bottom: 15,
        left: 10
    },
    saveButton: {
        position: 'absolute',
        bottom: 15,
        right: 10
    },
});