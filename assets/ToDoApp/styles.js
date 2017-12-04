import React from 'react';
import {StyleSheet, Dimensions} from 'react-native';

const windowHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
    container: {
        marginTop: 24,
        flexDirection: 'column',
        backgroundColor: '#FAFAFA'
    },
    topBar: {
        minHeight: 50,
        flexDirection: 'column',
        backgroundColor: '#2c3e50'
    },
    topBarChild: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center'
    },
    main: {
        flexDirection: 'column',
        padding: 15,
        height: windowHeight - 175,
    },
    eventsMain: {
        flexDirection: 'column',
        padding: 15,
        height: windowHeight - 125,
    },
    addTask: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#FBFCFC',
        borderTopWidth: 1,
        borderTopColor:  '#34495e',
        borderBottomWidth: 2,
        borderBottomColor: '#34495e',
    },
    textInput: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: '#bdc3c7',
        backgroundColor: '#ecf0f1',
        borderRadius: 3,
        padding: 5,
    },
    textInputFull: {
        borderWidth: 1,
        borderColor: '#34495e',
        borderRadius: 3,
        padding: 5

    },
    agendaItem: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    checkbox: {
        flex: 1,
        flexDirection: 'row',
        padding: 5,
        alignItems: 'center'
    },
    checkboxLabel: {
        marginLeft: 5,
        minWidth: 5
    },
    button: {
        backgroundColor: '#2980b9',
        borderRadius: 5,
        padding: 10
    },
    label: {
        fontWeight: 'bold'
    },
    picker: {
        borderWidth: 1,
        borderColor: '#34495e',
        borderRadius: 3,
        height: 40
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginBottom: 5
    },
    card: {
        borderWidth: 1,
        borderColor: '#bdc3c7',
        borderRadius: 3,
        marginBottom: 5
    },
    cardHeader: {
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#2c3e50'
    },
    cardBody: {
        padding: 5,
        flexDirection: 'column',
        backgroundColor: "#bdc3c7"
    },
    eventHeader: {
        fontWeight: 'bold',
        color: '#ECF0F1',
        fontSize: 20
    },
    // text colors
    textWhite: {
        color: '#ECF0F1',
        fontWeight: '700'
    },
    // margins
    mb5: { // the second character indicates direction. (b = bottom, t = top, etc.)
        marginBottom: 5
    },
    // background colors (always start with 'bg' and then the color name)
    bgGray: {
        backgroundColor: '#2c3e50'
    },
    // widths
    w200: {
        width: 200
    }
});