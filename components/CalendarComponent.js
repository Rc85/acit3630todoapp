import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';
import TopBarComponent from './TopBarComponent.js';

<<<<<<< HEAD
const styles = require('../assets/ToDoApp/styles.js');
=======
>>>>>>> 7b3012aaa54b5392dd9a9fe5d791fac824a353b6
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
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TopBarComponent navigation={this.props.navigation} title={title} />
                </View>

                <View style={styles.main}>
                    <Text>Calendar</Text>
                </View>
            </View>
        )
    }
}