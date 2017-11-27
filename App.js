import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TabNavigator} from 'react-navigation';

// Screen components
import CurrentTasksComponent from './components/CurrentTasksComponent.js';
import SetEventComponent from './components/SetEventComponent.js';
import EventsComponent from './components/EventsComponent.js';
import CalendarComponent from './components/CalendarComponent.js';

// load styles.js
const styles = require('./assets/ToDoApp/styles.js');

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
        style: styles.bgDeepSkyBlue
    },
    backBehavior: 'none'
});

export default class App extends Component {
    render() {
        return(
            <ToDoApp />
        )
    }
}
