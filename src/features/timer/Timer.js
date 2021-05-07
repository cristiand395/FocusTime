import React, { useState } from 'react';
import { StyleSheet, View, Text, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';

//Components
import { CountDown } from '../../components/CountDown'
import { RoundedButton } from '../../components/RoundedButton'

//Styles
import { font } from '../../utils/sizes'
import { color } from '../../utils/colors'

export const Timer = ( { focusTask, endTime, deleteTask }) => {
    const [isPlaying, setIsPlaying] = useState(true)
    const [progress, setProgress] = useState(1)
    const [minutes, setMinutes] = useState(1)
    const DEFAULT_TIME = 15

    const onProgress = (progre) => {
        setProgress(progre)
    }

    const ChangeTime = (min)=> {
        if (isPlaying == false){
            setMinutes(min)
            setProgress(1)
            setIsPlaying(false)
        }
    }

    const endCountDown = () => {
        setIsPlaying(false)
        setProgress(1)
        setMinutes(DEFAULT_TIME)
        Vibration.vibrate()
        endTime()
    }

    return (
        <View style={styles.container}>
            <View style={styles.countDownContainer}>
                <CountDown isPaused={!isPlaying} minutes={minutes} onProgress={onProgress} endCountDown={endCountDown}/>
            </View>
            <View style={styles.taskContainer}>
                <Text style={styles.title}>Concentrandose en:</Text>
                <Text style={styles.task}>{focusTask}</Text>
            </View>
            <View style={styles.progressContainer}>
                <ProgressBar style={styles.progress} progress={progress} color={color.secondary1}/>
            </View>
            <View style={styles.minutesContainer}>
                <RoundedButton title={'10'} size={80} font={font.lg} onPress={() => ChangeTime(10)}/>
                <RoundedButton title={'15'} size={80} font={font.lg} onPress={() => ChangeTime(15)}/>
                <RoundedButton title={'20'} size={80} font={font.lg} onPress={() => ChangeTime(20)}/>
            </View>
            <View style={styles.playContainer}>
                {isPlaying 
                    ? (<RoundedButton title='Pause' size={200} font={font.xxl} onPress={()=>setIsPlaying(false)}/>)
                    : (<RoundedButton title='Play' size={200} font={font.xxl} onPress={()=>setIsPlaying(true)}/>)
                }
            </View>
            <View style={styles.clearContainer}>
                <RoundedButton title='X' size={50} font={font.sm} onPress={deleteTask}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        flex: 1
    },
    countDownContainer: {
        flex: 0.25,
        backgroundColor: color.secondary1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    taskContainer: {
        flex: 0.1,
        justifyContent: 'center'
    },  
    title: {
        textAlign: 'center',
        color: color.default,
        fontSize: font.md,
    },
    task: {
        textAlign: 'center',
        color: color.default,
        fontSize: font.md,
        fontWeight: 'bold',
    },
    progressContainer: {
        flex: 0.05,
    },
    progress: {
        color: color.secondary3,
        backgroundColor: color.backgroundColor,
        height: 5,
        borderRadius: 25
    },
    minutesContainer: {
        flex: 0.2,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    playContainer: {
        flex: 0.3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    clearContainer: {
        flex: 0.1,
        paddingRight: 15,
        alignItems: 'flex-end',
        justifyContent: 'center'
    }
});