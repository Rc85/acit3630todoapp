import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TextInput, AsyncStorage, Picker, TouchableHighlight} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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
        this.state = { // the entire state is the event object
            eventName: this.props.eventName,
            date: this.props.date,
            time: this.props.time,
            repeat: this.props.repeat,
            notes: this.props.notes
        }
    }

    static defaultProps = { // default props of the event object
        eventName: '',
        date: '01/01/2000',
        time: '12:00:00',
        repeat: 'none',
        notes: ''
    }

    static navigationOptions = {
        title: title
    }

    async saveEvent() {
        events.push(this.state); // push the event object to the events array
        let eventList = JSON.stringify(events); // convert to string
        await AsyncStorage.setItem('events', eventList); // save to local storage
    }

    async loadEvents() {
        let response = await AsyncStorage.getItem('events'); // get event list from local storage
        events = await JSON.parse(response) || []; // conver to JSON object
    }

    componentDidMount() {
        this.loadEvents(); // load event list when starting the app
    }

    componentWillReceiveProps(nextProps) { // refer to the same function in EventsComponent
        let {params} = nextProps.navigation.state;
        events = params.events;
    }

    render() {
        let {navigate} = this.props.navigation;

        return(
            <KeyboardAwareScrollView // pushes content up when keyboard hides them
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
            enableOnAndroid={true}
            extraScrollHeight={100} // adds extra space below focused TextInput
            >
                <View style={styles.topBar}>
                    <TopBarComponent navigation={this.props.navigation} title={title} />
                </View>

                <View style={styles.main}>
                    <View style={styles.mb5}>
                        <Text style={styles.label}>Event Name:</Text>
                        <TextInput
                        ref={input => {this.EventNameInput = input}} // references this TextInput by calling this.EventNameInput
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

                    <View style={styles.mb5}>
                        <Text style={styles.label}>Notes:</Text>
                        <TextInput
                        ref={input => {this.notesInput = input}}
                        underlineColorAndroid='transparent'
                        style={styles.textInputFull}
                        multiline={true}
                        autoGrow={true}
                        maxHeight={200}
                        value={this.state.notes}
                        onChangeText={(value) => this.setState({
                            notes: value
                        })}/>
                    </View>

                    <View style={styles.buttonContainer}>
                        <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            this.saveEvent(); // save to local storage
                            alert('Event saved successfully');
                            this.setState({ // sets the state
                                eventName: this.props.eventName,
                                date: this.props.date,
                                time: this.props.time,
                                repeat: this.props.repeat
                            });

                            let eventsAction = NavigationActions.setParams({ // creates an action to dispatch
                                params: {event: events},
                                key: 'ViewEvents'
                            });

                            this.props.navigation.dispatch(eventsAction); // dispatch action to EventsComponent
                        }}>
                            <Text style={styles.textWhite}>Save</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}