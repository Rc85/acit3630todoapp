import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {TabNavigator} from 'react-navigation';

// Screen components
import CurrentTasksComponent from './components/CurrentTasksComponent.js';
import SetEventComponent from './components/SetEventComponent.js';
import EventsComponent from './components/EventsComponent.js';
import CalendarComponent from './components/CalendarComponent.js';

const ToDoApp = TabNavigator({
    Home: {
        screen: CurrentTasksComponent
    },
    SetEvent: {
        screen: SetEventComponent
    },
    ViewEvents: {
        screen: EventsComponent
    },
    Calendar: {
        screen: CalendarComponent
    }
}, {
    tabBarPosition: 'bottom',
    animationEnabled: true,
    tabBarOptions: {
        activeTintColor: 'mediumblue',
        style: {
            backgroundColor: 'deepskyblue'
        }
    },
    backBehavior: 'none'
});

export default class App extends Component {
    render() {
        return(
            <ToDoApp screenProps={
                {
                    container: {
                        marginTop: 24, flex: 1, flexDirection: 'column'
                    },
                    topBar: {
                        minHeight: 50, flexDirection: 'column', backgroundColor: 'deepskyblue'
                    },
                    main: {
                        flex: 8, flexDirection: 'column', padding: 20
                    }
                }
            }/>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 24
    },
    topBar: {
        flex: 1,
        flexDirection: 'row'
    },
    main: {
        flex: 5,
        flexDirection: 'column'
    },
    bottomBar: {
        flex: 1,
        flexDirection: 'row'
    }
})