import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'

//Components
import { Focus } from './src/features/focus/Focus';
import { FocusHistory } from './src/features/focus/FocusHistory';
import { Timer } from './src/features/timer/Timer';
//Styles
import { color } from './src/utils/colors'

const STATUSES = {
  COMPLETED: 1,
  CANCELLED: 2
}

export default function App() {
  const [focusTask, setfocusTask] = useState(null);
  const [tasksHistory, setTasksHistory] = useState([])

  const addToHistory = (task, status) => {
      setTasksHistory([...tasksHistory, {key: String(tasksHistory.length+1), task, status}])
  } 

  const onClear = () =>{
    setTasksHistory([])
  }

  const saveTasksHistory = async() => {
    try {
      await AsyncStorage.setItem('tasksHistory', JSON.stringify(tasksHistory))
    } catch (e) {
      console.log(e)
    }
  }

  const loadTasksHistory = async() => {
    try {
      const history = await AsyncStorage.getItem('tasksHistory') 
      if (history && JSON.parse(history).length){
        setTasksHistory(JSON.parse(history))
      }
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    loadTasksHistory()
  },[])

  useEffect(() => {
    saveTasksHistory()
  }, [tasksHistory])

  console.log(tasksHistory)
  return (
    <View style={styles.container}>
      <StatusBar style="auto"/>
      <View style={styles.subContainer}>
        {focusTask ? (
          <Timer focusTask={focusTask} 
            endTime={()=>{
              addToHistory(focusTask, STATUSES.COMPLETED)
              setfocusTask(null)
            }}
            deleteTask={()=>{
              addToHistory(focusTask, STATUSES.CANCELLED)
              setfocusTask(null)
            }}
            />
        ): (
          <>
            <Focus addTask={setfocusTask}/>
            <FocusHistory tasksHistory={tasksHistory} onClear={onClear}/>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: color.background,
  },
  subContainer: {
    flex: 1
  }
});
