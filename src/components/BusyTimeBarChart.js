import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { ActivityIndicator, TouchableRipple } from "react-native-paper";

import color from '../constants/color'
import { closestInArray } from '../utils/common'

const length = 24;    //hours of the day
const numberOfBars = 8;     //should be divisible by 24
const barSpan = length / numberOfBars;
const step = Math.floor(barSpan / 2);

const maxBarHeight = 150;
const barWidth = 200 / numberOfBars;

let shouldUpdate = true;

export const updateBusyChart = () => {
    shouldUpdate = true;
}

export function BusyTimeBarChart(props) {

    const [bars, setBars] = useState(null);
    const [activeBar, setActiveBar] = useState(10);

    useEffect(() => {
        let arr = Array.from(Array(numberOfBars).keys()).map((a) => { return ((a * length / numberOfBars) + step) })
        console.log(arr);
        let currentHour = closestInArray(arr, new Date().getHours());
        props.setSelectedTime(currentHour);
        setActiveBar(currentHour);
    }, []);

    useEffect(() => {
        let busyTimes = props.getBusyTimes();

        if (busyTimes.length)
            setBars(displayBarChart(busyTimes));
        else
            setBars(displayEmptyBarChart());

    }, [activeBar, props]);

    const pressBar = (i) => {
        setActiveBar(i);
        props.setSelectedTime(i);
    }

    const displayBarChart = (busyTimes) => {
        let bars = [];  //actual component

        for (let i = step; i < length; i += barSpan) {
            let busynessMean = busyTimes
                .slice(i - step, (i + step + 1) % length)
                .reduce((a, b) => a + b, 0)
                / barSpan;     //mean of the portion of elements of array

            let barHeight = ((busynessMean + 5) * maxBarHeight) / 100;

            bars.push(
                <View key={i} style={{ position: "absolute" }}>
                    <View style={[styles.bar,
                    {
                        height: barHeight,
                        backgroundColor: i == activeBar ? color.mainColorInactive : color.mainColor,
                        top: maxBarHeight - barHeight + 20,
                        left: (((i - 1) / barSpan) * barWidth) - (numberOfBars * barWidth / 2)
                    }]}>
                        <TouchableRipple
                            style={{ flex: 1 }}
                            onPress={() => { pressBar(i) }}
                            rippleColor={color.mainColorInactive}
                        >
                            <></>
                        </TouchableRipple>
                    </View>
                    {((i - step) % (barSpan * 2)) ?
                        <View style={[styles.hourLabel,
                        {
                            left: (((i - 1) / barSpan) * barWidth) -
                                (numberOfBars * barWidth / 2) - 15
                        }
                        ]}>

                            <Text style={{ fontSize: 12 }}>{i - step + ':00'}</Text>
                        </View> : null}
                </View >
            );
        }
        return bars;
    }

    const displayEmptyBarChart = (busyTimes) => {
        let bars = [];  //actual component

        for (let i = step; i < length; i += barSpan) {
            bars.push(
                <View key={i} style={{ position: "absolute" }}>
                    <View style={[styles.inactiveBar,
                    {
                        left: (((i - 1) / barSpan) * barWidth) - (numberOfBars * barWidth / 2)
                    }]}>
                    </View>
                    {((i - step) % (barSpan * 2)) ?
                        <View style={[styles.hourLabel,
                        {
                            left: (((i - 1) / barSpan) * barWidth) -
                                (numberOfBars * barWidth / 2) - 15
                        }
                        ]}>
                            <Text style={{ fontSize: 12 }}>{i - step + ':00'}</Text>
                        </View> : null}
                </View >
            );
        }
        return bars;
    }

    return (
        <>
            {bars}
        </>

    )
}

const styles = StyleSheet.create({
    bar: {
        position: 'absolute',
        marginHorizontal: 1,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.6)',
        width: barWidth,
        marginVertical: 30
    },
    hourLabel: {
        position: "absolute",
        top: maxBarHeight + 25,
        marginVertical: 30
    },
    inactiveBar: {
        height: maxBarHeight,
        backgroundColor: 'grey',
        top: 20,
        position: 'absolute',
        marginHorizontal: 1,
        borderRadius: 3,
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.6)',
        width: barWidth,
        marginVertical: 30
    }

});