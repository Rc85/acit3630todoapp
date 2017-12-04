import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = require('../assets/ToDoApp/styles.js');

export default class TopBarComponent extends Component {
    render() {
        const title = this.props.title;
        let icon;
        if (title === 'My Tasks') {
            icon = <Icon style={{marginRight: 7}} name='list-ul' color='#fff' size={16}/>
        } else if (title === 'Set Event') {
            icon = <Icon style={{marginRight: 7}} name='gears' color='#fff' size={16}/>
        } else if (title === 'Events') {
            icon = <Icon style={{marginRight: 7}} name='calendar-plus-o' color='#fff' size={16}/>
        } else if (title === 'Calendar') {
            icon = <Icon style={{marginRight: 7}} name='calendar' color='#fff' size={16}/>
        }

        return(
            <View style={styles.topBarChild}>
                {icon}
                <Text style={{textAlignVertical: 'center', fontSize: 20, fontWeight: 'bold', color: '#ECF0F1'}}>{title}</Text>
            </View>
        )
    }
}
