import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { ActivityIndicator } from "react-native-paper";

import { BusyTimeBarChart } from "../components/BusyTimeBarChart";
import { getBookmarkBusyness } from "../api/bookmarks";
import { indexMaxInArray, indexMinInArray } from "../utils/common";
import color from "../constants/color";




export default function BookmarkDetailsScreen(props) {

    const { t } = useTranslation();

    const navigation = useNavigation();

    const [selectedTime, setSelectedTime] = useState(0);
    const [busyTimes, setBusyTimes] = useState([]);

    useEffect(() => {
        getBookmarkBusyness(props.bookmark, setBusyTimes);
    }, []);

    useEffect(() => {
        navigation.setOptions({ headerTitle: props.bookmark.name });
        getBookmarkBusyness(props.bookmark, setBusyTimes);
    }, [props.bookmark]);

    const getBusyTimes = () => {
        if (!busyTimes.length)
            return [];
        const day = new Date().getDay();
        return busyTimes[day][day];
    }


    const getSelectedBusyness = () => {
        //return string indicating busyness
        return busyTimes[selectedTime] > 70 ? 'veryBusyLabel'
            : busyTimes[selectedTime] > 40 ? 'kindaBusyLabel'
                : 'notBusyLabel';
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
                        <Icon name="alarm" size={25} style={{ marginRight: 15 }}></Icon>
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
                </View >
                : <View>
                    <Text style={styles.chartLabel}>{t('bookmarkDetails:busynessChartLabel')}</Text>
                    <Text style={styles.noDataLabel}>{t('bookmarkDetails:noAvailableData')}</Text>
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
        fontStyle: 'italic'
    },
    infoContainer: {
        flexDirection: "row",
        marginVertical: 10
    }
});