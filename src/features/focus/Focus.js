import React, { useState } from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { TextInput } from 'react-native-paper'
import { AddTaskButton } from '../../components/AddTaskButton.js'

//Styles
import { font } from '../../utils/sizes'
import { color } from '../../utils/colors'

export const Focus = ( { addTask }) => {
    const [tempItem, setTempItem] = useState(null)
    
    return (
        <View style={styles.container}>
            <View style={styles.taskContainer}>
                <Text style={styles.title}>What would you like to focus on</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={styles.textInput}
                        onSubmitEditing={
                            ({ nativeEvent }) => {
                                setTempItem(nativeEvent.text)
                            }}/>
                    <AddTaskButton title={'+'}
                        onPress={() => {
                            addTask(tempItem)
                        }}/>
                </View> 
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    taskContainer: {
        flex: 1,
        padding: 15,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        color: color.default,
        fontSize: font.lg
    },  
    inputContainer: {
        padding: 15,
        flexDirection: 'row',
        alignItems: 'center'
    },
    textInput: {
        flex: 1,
        marginRight: 10
    }
});