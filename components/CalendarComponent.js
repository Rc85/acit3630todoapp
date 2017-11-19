import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import TopBarComponent from './TopBarComponent.js';

const title = 'Calendar';

export default class CurrentTaskComponent extends Component {
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
            <View style={this.props.screenProps.container}>
                <View style={this.props.screenProps.topBar}>
                    <TopBarComponent navigation={this.props.navigation} title={title} />
                </View>

                <View style={this.props.screenProps.main}>
                    <Text>Calendar</Text>
                </View>
            </View>
        )
    }
}