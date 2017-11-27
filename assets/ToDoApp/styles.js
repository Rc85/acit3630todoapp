import React from 'react';
import {StyleSheet} from 'react-native';

module.exports = StyleSheet.create({
    container: {
        marginTop: 24,
        flexDirection: 'column'
    },
    topBar: {
        minHeight: 50,
        flexDirection: 'column',
        backgroundColor: 'deepskyblue'
    },
    topBarChild: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    main: {
        flexDirection: 'column',
        padding: 20,
    },
    addTask: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: 'black',
        borderBottomWidth: 1,
        borderBottomColor: 'black'
    },
    textInput: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 3,
        padding: 5
    },
    textInputFull: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 3,
        padding: 5
    },
    checkbox: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center'
    },
    checkboxLabel: {
        marginLeft: 5,
        minWidth: 50
    },
    button: {
        backgroundColor: 'deepskyblue',
        borderRadius: 5,
        padding: 10
    },
    label: {
        fontWeight: 'bold'
    },
    picker: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 3
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 5
    },
    card: {
        borderWidth: 1,
        borderColor: 'grey',
        borderRadius: 3,
        marginBottom: 5
    },
    cardHeader: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    cardBody: {
        padding: 5,
        flexDirection: 'column'
    },
    eventHeader: {
        fontWeight: 'bold',
        color: 'deepskyblue',
        fontSize: 20
    },
    // text colors
    textWhite: {
        color: 'white'
    },
    // margins
    mb5: { // the second character indicates direction. (b = bottom, t = top, etc.)
        marginBottom: 5
    },
    // background colors (always start with 'bg' and then the color name)
    bgDeepSkyBlue: {
        backgroundColor: 'deepskyblue'
    },
    // widths
    w200: {
        width: 200
    }
});