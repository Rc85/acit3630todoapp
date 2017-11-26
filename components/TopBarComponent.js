import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const styles = require('../assets/ToDoApp/styles.js');

export default class TopBarComponent extends Component {
    render() {
        const title = this.props.title;

        return(
            <View style={styles.topBarChild}>
                <Text style={{textAlignVertical: 'center', fontSize: 20, fontWeight: 'bold', color: '#FFFFFF'}}>{title}</Text>
            </View>
        )
    }
}