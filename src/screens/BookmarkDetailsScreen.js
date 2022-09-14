import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button } from "react-native-paper";

import { BusyTimeBarChart } from "../components/BusyTimeBarChart";
import { doRemoveBookmark, getBookmarkBusyness, getBookmarkInfo } from "../api/bookmarks";
import { indexMaxInArray, indexMinInArray } from "../utils/common";
import color from "../constants/color";




export default function BookmarkDetailsScreen(props) {

    const { t } = useTranslation();

    const navigation = useNavigation();

    const [selectedTime, setSelectedTime] = useState(0);
    const [busyTimes, setBusyTimes] = useState([]);
    const [bookmarkInfo, setBookmarkInfo] = useState({});

    useEffect(() => {
        getBookmarkBusyness(props.bookmark, setBusyTimes);
        getBookmarkInfo(props.bookmark, setBookmarkInfo);
    }, []);

    useEffect(() => {
        navigation.setOptions({ headerTitle: props.bookmark.name });
        getBookmarkBusyness(props.bookmark, setBusyTimes);
        getBookmarkInfo(props.bookmark, setBookmarkInfo);
    }, [props.bookmark]);

    const getBusyTimes = () => {
        if (!busyTimes.length)
            return [];
        const day = new Date().getDay();
        return busyTimes[day][day];
    }


    const getSelectedBusyness = () => {
        let day = new Date().getDay();
        let currentBusyTimes = busyTimes[day][day];
        return currentBusyTimes[selectedTime] > 65 ? 'veryBusyLabel'
            : currentBusyTimes[selectedTime] > 35 ? 'kindaBusyLabel'
                : 'notBusyLabel';
    }

    const deleteBookmark = () => {
        navigation.navigate("BookmarkScreen");
        doRemoveBookmark(props.bookmark, props.setBookmarks);
    }

    const deleteBookmarkPrompt = () => {
        Alert.alert(
            t('bookmarkDetails:deleteBookmarkPrompt'),
            '',
            [
                {
                    text: t('common:cancel'),
                    style: "cancel"
                },
                { text: t('common:okay'), onPress: deleteBookmark }
            ]
        );
    }

    const setAlarmScreen = () => {
        navigation.navigate("SetReminderScreen");
    }

    return (
        <View style={styles.container}>
            <BusyTimeBarChart id={props.bookmark.id} getBusyTimes={getBusyTimes} setSelectedTime={setSelectedTime} />

            {busyTimes.length ?
                <View>
                    <Text style={styles.chartLabel}>{t('bookmarkDetails:busynessChartLabel')}</Text>
                    <View style={[styles.infoContainer, { marginBottom: 30, justifyContent: "center" }]}>
                        <Text style={{ fontSize: 13 }}>{selectedTime + ':00: ' + t('bookmarkDetails:' + getSelectedBusyness())}</Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Icon name="clock" size={25} style={{ marginRight: 15 }}></Icon>
                        <Text style={{ fontSize: 18 }}>
                            {t('bookmarkDetails:maxTimeLabel') + indexMaxInArray(getBusyTimes()) + ':00'}
                        </Text>
                    </View>
                    <View style={styles.infoContainer}>
                        <Icon name="sleep" size={25} style={{ marginRight: 15 }}></Icon>
                        <Text style={{ fontSize: 18 }}>
                            {t('bookmarkDetails:minTimeLabel') + indexMinInArray(getBusyTimes()) + ':00'}
                        </Text>
                    </View>
                    {
                        bookmarkInfo != null &&
                        <View style={styles.infoContainer}>
                            <Icon name="walk" size={25} style={{ marginRight: 15 }}></Icon>
                            <Text style={{ fontSize: 18 }}>
                                {
                                    t('bookmarkDetails:avgDwellTimeLabel') +
                                    Math.floor(bookmarkInfo.avgDwellTime % 60) + ' ' + t('common:minutes')
                                }
                            </Text>
                        </View>
                    }
                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            onPress={deleteBookmarkPrompt}
                            color={color.dangerousAction}
                            dark={true}
                        >{t('bookmarkDetails:deleteLabel')}
                        </Button>
                        <Button
                            mode="contained"
                            style={styles.setAlarmButton}
                            onPress={setAlarmScreen}
                        >{t('bookmarkDetails:setAlarmLabel')}
                        </Button>
                    </View>
                </View >
                :
                <View>
                    <Text style={styles.chartLabel}>{t('bookmarkDetails:busynessChartLabel')}</Text>
                    <Text style={styles.noDataLabel}>{t('bookmarkDetails:noAvailableData')}</Text>
                    <View style={[styles.buttonContainer, { marginTop: 220, justifyContent: 'center' }]}>
                        <Button
                            mode="contained"
                            onPress={deleteBookmarkPrompt}
                            color={color.dangerousAction}
                            dark={true}
                        >{t('bookmarkDetails:deleteLabel')}
                        </Button>
                    </View>
                </View>
            }

        </View >
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 5,
        marginHorizontal: 30,
        marginVertical: 25,
        paddingVertical: 15,
        elevation: 15,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    chartLabel: {
        paddingHorizontal: 60,
        marginBottom: 170,
        fontSize: 24,
        fontWeight: "600",
        color: 'black',
        borderBottomWidth: 1,
        borderRadius: 5,
        borderColor: 'rgba(0,0,0,0.6)'
    },
    noDataLabel: {
        marginTop: 30,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: "600",
        fontStyle: 'italic',
        color: 'black'
    },
    infoContainer: {
        flexDirection: "row",
        marginVertical: 10
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 80,
    }
});