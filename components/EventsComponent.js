import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, AsyncStorage, ListView, TouchableHighlight, ScrollView} from 'react-native';
import {NavigationActions} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBarComponent from './TopBarComponent.js';

const styles = require('../assets/ToDoApp/styles.js');
const title = 'Events';
const events = [];

export default class EventsComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: events
        }
    }

    static navigationOptions = {
        title: title
    }
    
    async getEvents() {
        let response = await AsyncStorage.getItem('events');
        events = await JSON.parse(response) || [];

        this.setState({
            dataSource: events
        });
    }

    async deleteAll() {
        await AsyncStorage.removeItem('events');
    }

    componentDidMount() {
        this.getEvents();
    }

    render() {
        let event = this.state.dataSource.map((obj, i) => {
            return <View key={i} style={styles.card}>
                <View style={styles.cardHeader}>
                    <Text style={styles.eventHeader}>{obj.eventName}</Text>
                    <TouchableHighlight
                    style={styles.button}>
                        <Icon name='trash' color='#fff' />
                    </TouchableHighlight>
                </View>

                <View style={styles.cardBody}>
                    <Text style={styles.label}>Date and Time: </Text>
                    <Text>{obj.date} At {obj.time}</Text>

                    <Text style={styles.label}>Repeat: </Text>
                    <Text>{obj.repeat}</Text>
                </View>
            </View>;
        });

        return(
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TopBarComponent navigation={this.props.navigation} title={title} />
                </View>

                <ScrollView style={styles.main}>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            this.deleteAll();
                            this.getEvents();
                            let setEventActions = NavigationActions.setParams({
                                params: {event: events},
                                key: 'SetEvent'
                            });

                            this.props.navigation.dispatch(setEventActions);
                        }}>
                            <Text style={styles.textWhite}>Delete All</Text>
                        </TouchableHighlight>
                    </View>

                    <View style={{marginBottom: 50}}>
                        {event}
                    </View>
                </ScrollView>
            </View>
        )
    }
}