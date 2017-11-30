import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import TopBarComponent from './TopBarComponent.js';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = require('../assets/ToDoApp/styles.js');
const title = 'Calendar';

export default class CalendarComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    static navigationOptions = {
        title: title
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TopBarComponent navigation={this.props.navigation} title={title} />
                </View>

                <View style={styles.main}>
                    <Calendar
                    current={new Date()} />
                </View>
            </View>
        )
    }
}