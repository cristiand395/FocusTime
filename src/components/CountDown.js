import React, { useState, useEffect } from 'react'
import { Text, StyleSheet, View } from 'react-native'

//Styles
import { color } from '../utils/colors'
import { font } from '../utils/sizes'

const minutesToMilliseconds = (min) => min * 60 * 1000
const formatTime = (time) => time < 10 ? `0${time}` : `${time}`

export const CountDown = ({
    minutes,
    isPaused,
    onProgress,
    endCountDown
}) => {
    const [millis, setMillis] = useState(minutesToMilliseconds(minutes))
    const minute = Math.floor(millis / 1000 / 60) % 60
    const seconds = Math.floor(millis / 1000) % 60

    const CountDown = () => {
        if (millis !== 0){
            setMillis(millis - 1000)
        } else {
            endCountDown()
        }
    }

    useEffect(() => {
        if(!isPaused){
            setTimeout(CountDown, 1000)
        } else {
            setMillis(millis)
        }
    }, [millis, isPaused])

    useEffect(() => {
        onProgress(millis/ minutesToMilliseconds(minutes))
    },[millis])

    useEffect(() => {
        setMillis(minutesToMilliseconds(minutes))
    }, [minutes])

    return (
        <Text style={styles.CountDownTime}>{formatTime(minute)} : {formatTime(seconds)}</Text>
    )
}

const styles = StyleSheet.create({
    CountDownTime: {
        color: color.default,
        fontSize: font.xxxxl,
        padding: 10,
    }
})