import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TextInput, AsyncStorage, Picker, TouchableHighlight} from 'react-native';
import {NavigationActions} from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBarComponent from './TopBarComponent.js';

const styles = require('../assets/ToDoApp/styles.js');
const title = 'Set Event';
const events = [];

export default class CurrentTaskComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            eventName: this.props.eventName,
            date: this.props.date,
            time: this.props.time,
            repeat: this.props.repeat
        }
    }

    static defaultProps = {
        eventName: '',
        date: '01/01/2000',
        time: '12:00:00',
        repeat: 'none'
    }

    static navigationOptions = {
        title: title
    }

    async saveEvent() {
        events.push(this.state);
        let eventList = JSON.stringify(events);
        await AsyncStorage.setItem('events', eventList);

        this.loadEvents();
    }

    async loadEvents() {
        let response = await AsyncStorage.getItem('events');
        events = await JSON.parse(response) || [];
    }

    componentDidMount() {
        this.loadEvents();
    }

    render() {
        let {navigate} = this.props.navigation;
        let {params} = this.props.navigation.state;

        if (params) {
            events = params.event
        }

        return(
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TopBarComponent navigation={this.props.navigation} title={title} />
                </View>

                <View style={styles.main}>
                    <View style={styles.mb5}>
                        <Text style={styles.label}>Event Name:</Text>
                        <TextInput
                        ref={input => {this.EventNameInput = input}}
                        value={this.state.eventName}
                        underlineColorAndroid='transparent'
                        style={styles.textInputFull}
                        maxLength={30}
                        onChangeText={(value) => {this.setState({
                            eventName: value
                        })}}/>
                    </View>

                    <View style={styles.mb5}>
                        <Text style={styles.label}>Date:</Text>
                        <DatePicker
                        ref={input => {this.datePicker = input}}
                        date={this.state.date}
                        showIcon={false}
                        mode='date'
                        placeholder='Select Date'
                        format='YYYY-MM-DD'
                        minDate={new Date()}
                        maxDate={new Date('2027-01-01')}
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        onDateChange={(date) => {this.setState({date: date})}} />
                    </View>

                    <View style={styles.mb5}>
                        <Text style={styles.label}>Time:</Text>
                        <DatePicker
                        ref={input => {this.timePicker = input}}
                        date={this.state.time}
                        showIcon={false}
                        mode='time'
                        placeholder='Select Time'
                        format='h:mm A'
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        onDateChange={(time) => {this.setState({time: time})}} />
                    </View>

                    <View style={styles.mb5}>
                        <Text style={styles.label}>Repeat:</Text>
                        <View style={styles.picker}>
                            <Picker
                            ref={input => {this.repeatPicker = input}}
                            onValueChange={(value) => this.setState({
                                repeat: value
                            })}
                            selectedValue={this.state.repeat}>
                                <Picker.Item label='None' value='None'/>
                                <Picker.Item label='Daily' value='Daily'/>
                                <Picker.Item label='Weekly' value='Weekly'/>
                                <Picker.Item label='Monthly' value='Monthly'/>
                                <Picker.Item label='Yearly' value='Yearly'/>
                            </Picker>
                        </View>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            this.saveEvent();
                            alert('Event saved successfully');
                            this.setState({
                                eventName: this.props.eventName,
                                date: this.props.date,
                                time: this.props.time,
                                repeat: this.props.repeat
                            });

                            let eventsAction = NavigationActions.setParams({
                                params: {event: this.state},
                                key: 'ViewEvents'
                            });

                            this.props.navigation.dispatch(eventsAction);
                        }}>
                            <Text style={styles.textWhite}>Save</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </View>
        )
    }
}