import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableWithoutFeedback, Pressable } from "react-native";
import { Callout } from "./Callout";

const length = 24;    //hours of the day
const numberOfBars = 8;     //should be divisible by 24
const barSpan = length / numberOfBars;
const step = Math.floor(barSpan / 2);

const maxBarHeight = 80;
const barWidth = 150 / numberOfBars;

export function BusyTimeBarChart(props) {

    const [bars, setBars] = useState(null);
    const [calloutsDisplayed, setCalloutDisplayed] = useState(Array(numberOfBars).fill(false));

    useEffect(() => {
        setBars(displayBarChart());
    }, []);

    const displayBarCallout = (i) => {
        console.log(i);
        setCalloutDisplayed(calloutsDisplayed.map((element, index) => {

            if (index == i && !calloutsDisplayed[i]) {
                return true;
            }
            return false;
        }))
    }

    const displayBarChart = () => {
        let busyTimes = [10, 25, 40, 55, 65, 75, 75, 75, 75, 75, 70, 65,
            50, 40, 30, 25, 25, 25, 20, 15, 10, 0, 5, 5];   //placeholder
        let max = Math.max.apply(null, busyTimes);    //max busyness

        let bars = [];  //actual component

        for (let i = step; i < length; i += barSpan) {
            let busynessMean = busyTimes
                .slice(i - step, (i + step + 1) % length)
                .reduce((a, b) => a + b, 0)
                / barSpan;     //sum elements of array

            let barHeight = busynessMean / 100 * maxBarHeight;

            let borderColor = busynessMean >= 75 ? '#e10005'
                : busynessMean >= 50 ? '#e6ec00'
                    : '#0b00dd'

            let bgcolor = busynessMean >= 75 ? '#ff5357'
                : busynessMean >= 50 ? '#fff259'
                    : '#9e99ff';

            bars.push(
                <View key={i}>
                    <Pressable
                        onTouchStart={() => { displayBarCallout((i - 1) / barSpan) }}
                        onTouchEnd={() => { displayBarCallout((i - 1) / barSpan) }
                        }
                    >
                        <View style={[styles.bar,
                        {
                            borderColor: borderColor,
                            backgroundColor: bgcolor,
                            height: barHeight,
                        }]} >

                        </View>
                    </Pressable >

                </View>
            );
        }
        return bars;
    }

    return (
        <View style={styles.container}>
            {bars}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        left: 100,

    },
    bar: {
        display: 'flex',
        flex: 1,
        marginHorizontal: 1,
        borderWidth: 1,
        borderRadius: 3,
        width: barWidth
    }
});