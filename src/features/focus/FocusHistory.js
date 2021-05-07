import React from 'react'
import { View, StyleSheet, FlatList, Text, SafeAreaView } from 'react-native'
import { font } from '../../utils/sizes'
import { RoundedButton } from '../../components/RoundedButton'

const HistoryItem = ({ item, index }) => {
    return(
        (item.status==1
            ?
            <Text style={{color: 'green'}}>
                {item.task}
            </Text>
            :
            <Text style={{color: 'red'}}>
                {item.task}
            </Text>
        )
    )
}

export const FocusHistory = ({ tasksHistory, onClear }) => {
    const clearHistory = () => {
        onClear();
    }
    
    console.log(tasksHistory.length)

    return(
        <>
            <SafeAreaView style={{flex:0.5, alignItems: 'center'}}>
                {!!tasksHistory.length && (
                    <>
                        <Text style={styles.title}>Tasks</Text>
                        <FlatList 
                            style={{flex:1}}
                            contentContainerStyle={{flex:1, alignItems: 'center'}}
                            data={tasksHistory}
                            renderItem={HistoryItem}/>
                        <RoundedButton size={50} title='Clear' onPress={clearHistory} />
                    </>
                )}
            </SafeAreaView>
        </>
    )
    
}

const styles = StyleSheet.create({
    title: {
        color: 'white',
        fontSize: font.lg,
        textAlign: 'center'
    },
    historyItem: (status) => ({
        color: status > 1 ? 'red' : 'green',
        fontSize: font.md
    }),
})
