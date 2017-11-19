import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';

export default class TaskComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            complete: false
        }
    }
}