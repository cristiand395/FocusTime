import React from 'react';
import {StyleSheet, TouchableOpacity, Text } from 'react-native'

import { color } from '../utils/colors'
import { font } from '../utils/sizes'

export const RoundedButton = ( {title, size, font, onPress} ) => {
    return(
        <TouchableOpacity style={styles(size).button} onPress={onPress}>
            <Text style={styles(font).textButton}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = (size) => StyleSheet.create({
    button: {
        backgroundColor: color.secondary1,
        borderWidth: 1,
        borderRadius: 100,
        borderColor: color.default,
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textButton: {
        color: 'white',
        fontSize: size,
        borderColor: 'white'
    }
})