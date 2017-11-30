import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, AsyncStorage, ListView, TouchableHighlight, ScrollView, Alert} from 'react-native';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBarComponent from './TopBarComponent.js';

const styles = require('../assets/ToDoApp/styles.js');
const title = 'Events';
const events = [];

export default class EventsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: events
        }
    }

    static navigationOptions = {
        title: title
    }

    async deleteEvent(index) {
        await events.splice(index, 1); // delete item from the index of array
        let eventList = await JSON.stringify(events); // convert array to string
        await AsyncStorage.setItem('events', eventList); // save to local storage

        this.setState({
            dataSource: events // set state to new event list
        });
    }

    async deleteAll() {
        await AsyncStorage.removeItem('events'); // remove the 'events' string entirely
        events.length = 0; // remove all items in events array
        this.setState({
            dataSource: events // set state to events array
        });
    }
    
    async getEvents() {
        let response = await AsyncStorage.getItem('events'); // get events from local storage
        events = await JSON.parse(response) || []; // parse to JSON object or return empty array

        this.setState({
            dataSource: events
        });
    }

    componentDidMount() {
        this.getEvents();
    }
    
    componentWillReceiveProps(nextProps) { // when this component receive new props from SetEventComponent.js
        let {params} = nextProps.navigation.state; // the {} allows us to access other objects inside nextProps.navigation.state
        
        this.setState({
            dataSource: params.event
        });
    }

    render() {
        let event = this.state.dataSource.map((obj, i) => { // loop through the dataSource array
            return <View key={i} style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.eventHeader}>{obj.eventName}</Text>
                    <TouchableHighlight
                    style={styles.button}
                    onPress={() => {
                        Alert.alert(
                            'Confirmation',
                            'Are you sure you want to delete this event',
                            [
                                {text: 'No', onPress: () => console.log('Cancelled')},
                                {text: 'Yes', onPress: () => {
                                    this.deleteEvent(i); // delete an event
                                    alert('Event deleted');

                                    let setEventActions = NavigationActions.setParams({
                                        params: {event: events},
                                        key: 'SetEvent'
                                    });

                                    this.props.navigation.dispatch(setEventActions);
                                }}
                            ]
                        )
                    }}>
                        <Icon name='trash' color='#fff' />
                    </TouchableHighlight>
                </View>

                <View style={styles.cardBody}>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.label}>Date and Time: </Text>
                        <Text>{obj.datetime}</Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.label}>Repeat: </Text>
                        <Text>{obj.repeat}</Text>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.label}>Notes: </Text>
                        <Text>{obj.notes}</Text>
                    </View>
                </View>
            </View>;
        });

        return(
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TopBarComponent navigation={this.props.navigation} title={title} />
                </View>

                <ScrollView style={styles.main}>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            Alert.alert(
                                'Confirmation',
                                'Are you sure you want to delete all events?',
                                [
                                    {text: 'No', onPress: () => console.log('Cancelled')},
                                    {text: 'Yes', onPress: () => {
                                        this.deleteAll(); // delete all events
                                        alert('All events deleted');
                                        let setEventActions = NavigationActions.setParams({ // create an action to send to SetEventComponent to updat the event list, so that when user goes an create another event, it's appended to the new list
                                            params: {event: events},
                                            key: 'SetEvent'
                                        });

                                        this.props.navigation.dispatch(setEventActions); // dispatch the action, this will trigger componentWillReceiveProps in SetEventComponent
                                    }}
                                ]
                            )
                        }}>
                            <Text style={styles.textWhite}>Delete All</Text>
                        </TouchableHighlight>
                    </View>

                    <View style={{marginBottom: 50}}>
                        {event}
                    </View>
                </ScrollView>
            </View>
        )
    }
}