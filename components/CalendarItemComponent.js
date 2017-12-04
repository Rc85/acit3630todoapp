import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {View, Text} from 'react-native';

const styles = require('../assets/ToDoApp/styles.js');

export default class CalendarItemComponent extends PureComponent {
    render() {
        return(
            <View style={[styles.agendaItem, {height: this.props.height}]}>
                <Text style={styles.mb5}>{this.props.time}</Text>

                <Text style={[styles.mb5, {fontWeight: 'bold'}]}>{this.props.eventName}</Text>

                <Text style={{fontWeight: 'bold'}}>Notes:</Text>
                <Text>{this.props.notes}</Text>
            </View>
        )
    }
}