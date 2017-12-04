import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TextInput, AsyncStorage, Picker, TouchableHighlight} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {NavigationActions} from 'react-navigation';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBarComponent from './TopBarComponent.js';
import {Notifications} from 'expo';

const styles = require('../assets/ToDoApp/styles.js');
const title = 'Set Event';
const events = [];

export default class SetEventComponent extends Component {
    constructor(props) {
        super(props);
        this.state = { // the entire state is the event object
            eventName: null,
            datetime: this.convertDateTimeToString(new Date(new Date().getFullYear(), new Date().getUTCMonth(), (new Date().getDate() + 1), (new Date().getHours() - 8), new Date().getUTCMinutes())),
            //time: this.props.time,
            repeat: 'none',
            notes: null
        }
    }

    static navigationOptions = {
        title: title
    }

    async saveEvent() {
        events.push(this.state); // push the event object to the events array
        let eventList = JSON.stringify(events); // convert to string
        await AsyncStorage.setItem('events', eventList); // save to local storage

        this.loadEvents();
    }

    async loadEvents() {
        let response = await AsyncStorage.getItem('events'); // get event list from local storage
        events = await JSON.parse(response) || []; // conver to JSON object
    }

    convertDateTimeToString(dt) {
        let string = dt.toLocaleDateString() + ' ' + dt.getHours() + ':' + dt.getMinutes();
        return string;
    }

    componentDidMount() {
        this.loadEvents(); // load event list when starting the app
    }

    componentWillReceiveProps(nextProps) { // refer to the same function in EventsComponent
        let {params} = nextProps.navigation.state;
        events = params.event;
    }

    render() {
        Notifications.cancelAllScheduledNotificationsAsync();

        let {navigate} = this.props.navigation;

        return(
            <KeyboardAwareScrollView // pushes content up when keyboard hides them
            resetScrollToCoords={{ x: 0, y: 0 }}
            contentContainerStyle={styles.container}
            scrollEnabled={false}
            enableOnAndroid={true}
            keyboardShouldPersistTaps='always'
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
                        underlineColorAndroid='transparent'
                        style={styles.textInputFull}
                        maxLength={30}
                        autoCapitalize='sentences'
                        onChangeText={(value) => this.setState({
                            eventName: value
                        })} />
                    </View>

                    <View style={styles.mb5}>
                        <Text style={styles.label}>Date:</Text>
                        <DatePicker
                        ref={input => {this.datePicker = input}}
                        showIcon={false}
                        date={this.state.datetime}
                        mode='datetime'
                        format='M/DD/YYYY H:mm'
                        placeholder='Select Date and Time'
                        minDate={new Date()}
                        //{new Date(new Date().getFullYear(), new Date().getUTCMonth(), (new Date().getDate() + 1), (new Date().getHours() - 8), new Date().getUTCMinutes())}
                        maxDate={new Date((new Date().getFullYear() + 10), new Date().getUTCMonth(), (new Date().getDate()), (new Date().getHours() - 8), new Date().getUTCMinutes())}
                        confirmBtnText='Confirm'
                        cancelBtnText='Cancel'
                        onDateChange={(value) => this.setState({
                            datetime: value 
                        })} />
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
                        onChangeText={(value) => this.setState({
                            notes: value
                        })} />
                    </View>

                    <Text style={styles.label}>Repeat:</Text>
                    <View style={[styles.mb5, {flexDirection: 'row', alignItems: 'center'}]}>
                        <View style={{flex: 4, marginRight: 2}}>
                            <View style={styles.picker}>
                                <Picker
                                style={{marginTop: -6}}
                                ref={input => {this.repeatPicker = input}}
                                selectedValue={this.state.repeat}
                                onValueChange={(value) => this.setState({
                                    repeat: value
                                })}>
                                    <Picker.Item label='None' value='none'/>
                                    <Picker.Item label='Minute' value='minute'/>
                                    <Picker.Item label='Daily' value='day'/>
                                    <Picker.Item label='Weekly' value='week'/>
                                    <Picker.Item label='Monthly' value='month'/>
                                    <Picker.Item label='Yearly' value='year'/>
                                </Picker>
                            </View>
                        </View>

                        <View style={{flex: 1}}>
                            <TouchableHighlight
                            style={styles.button}
                            onPress={() => {
                                if (this.state.eventName !== null) {
                                    this.saveEvent(); // save to local storage
                                    this.EventNameInput.clear();
                                    this.notesInput.clear();

                                    let date = new Date(this.state.datetime);
                                    let scheduleDate = new Date(date.getFullYear(), date.getUTCMonth(), date.getUTCDate(), (date.getHours() - 8), date.getMinutes());
                                    let notificationOptions = {
                                        title: this.state.eventName,
                                        sound: true
                                    };

                                    if (this.state.repeat === 'none') {
                                        var scheduleOptions = {
                                            time: scheduleDate
                                        }
                                    } else {
                                        var scheduleOptions = {
                                            time: scheduleDate,
                                            repeat: this.state.repeat
                                        }
                                    }

                                    Notifications.scheduleLocalNotificationAsync(notificationOptions, scheduleOptions);

                                    alert('Event saved successfully');
                                    this.setState({ // sets the state back to default
                                        eventName: this.state.eventName,
                                        datetime: this.state.datetime,
                                        repeat: this.state.repeat,
                                        notes: this.state.notes
                                    });

                                    let viewEventsAction = NavigationActions.setParams({ // creates an action to dispatch
                                        params: {event: events},
                                        key: 'ViewEvents'
                                    });

                                    let calendarEventsAction = NavigationActions.setParams({
                                        params: {event: events},
                                        key: 'Calendar'
                                    });

                                    this.props.navigation.dispatch(viewEventsAction); // dispatch action to EventsComponent
                                    this.props.navigation.dispatch(calendarEventsAction); // dispatch action to CalendarComponent
                                } else {
                                    alert('Please enter an event name');
                                }
                            }}>
                                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                    <Icon style={{marginRight: 2}} name='save' color='#fff'/>
                                    <Text style={styles.textWhite}>Save</Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }
}