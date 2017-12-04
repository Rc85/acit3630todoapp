import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, AsyncStorage} from 'react-native';
import TopBarComponent from './TopBarComponent.js';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalendarItemComponent from './CalendarItemComponent.js';

const styles = require('../assets/ToDoApp/styles.js');
const title = 'Calendar';

const events = [];

export default class CalendarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }

    static navigationOptions = {
        title: title
    }

    async getEvents() {
        let response = await AsyncStorage.getItem('events');
        events = await JSON.parse(response) || [];

        this.setState({
            events: events
        })
    }

    convertDateString(date) {
        let dateTimeParts = date.split(' ');
        let dateParts = dateTimeParts[0].split('/');
        let yearPart = new Date().getFullYear(dateParts[2]);
        let dateString = yearPart + '-' + dateParts[0] + '-' + dateParts[1];

        return {date: dateString, time: dateTimeParts[1]};
    }

    componentWillReceiveProps(nextProps) { // when this component receive new props from SetEventComponent.js
        let {params} = nextProps.navigation.state; // the {} allows us to access other objects inside nextProps.navigation.state
        events = params.event;

        this.setState({
            events: events
        });
    }

    componentDidMount() {
        this.getEvents();
    }

    render() {
        let eventObj = {};
        let itemArray = [];
        let prev = '';
        let eventItem = this.state.events.map((obj, i) => {
            let dateTimeObj = this.convertDateString(obj.datetime);
            let date = dateTimeObj.date;
            let time = dateTimeObj.time;
            let item = {eventName: obj.eventName, time: time, notes: obj.notes};

            if (prev !== date) {
                itemArray = [];
                itemArray.push(item);
                eventObj[date] = itemArray;
                prev = date;
            } else {
                eventObj[date].push(item);
                prev = date;
            }
        });

        return(
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TopBarComponent navigation={this.props.navigation} title={title} />
                </View>

                <View style={styles.eventsMain}>
                    <Agenda
                    items={eventObj}
                    renderItem={(item, firstItemInDay) => {return (
                        <CalendarItemComponent height={item.height} time={item.time} eventName={item.eventName} notes={item.notes} />
                    )}}
                    rowHasChanged={(r1, r2) => {return r1.eventName !== r2.eventName}}
                    theme={{
                        agendaDayTextColor: 'black',
                        agendaDayNumColor: 'black',
                        agendaTodayColor: 'red',
                        agendaKnobColor: 'blue'
                    }}
                    />
                </View>
            </View>
        )
    }
}