import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, ListView, CheckBox, AsyncStorage, Dimensions, TouchableHighlight, TextInput, ScrollView} from 'react-native';
import CheckboxField from 'react-native-checkbox-field';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBarComponent from './TopBarComponent.js';

const styles = require('../assets/ToDoApp/styles.js');
const title = 'My Tasks';
var tasks = [];

export default class CurrentTasksComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listDataSource: tasks,
            taskToAdd: null
        }
    }

    static navigationOptions = {
        title: title   
    }

    addTask(task) {
        tasks.push(task); // push 'task' into temporary array
        this.saveTask();
        this.setState({
            listDataSource: tasks, //set state using temporary array
            taskToAdd: null // return taskToAdd to null
        });
    }

    removeTask(index) {
        tasks.splice(index, 1); // remove task at index
        this.saveTask();
        this.setState({
            listDataSource: tasks // set state using new task list
        });
    }

    async saveTask() {
        let taskList = await JSON.stringify(tasks); // *MUST* - AsyncStorage only save as strings
        await AsyncStorage.setItem('taskList', taskList); // save to local storage
    }

    async getTasks() {
        let response = await AsyncStorage.getItem('taskList'); // get the string object from local storage
        tasks = await JSON.parse(response) || []; // parse it into JSON object OR if does not exist, return empty array

        this.setState({
            listDataSource: tasks // set state with new task list
        });
    }

    componentDidMount() {
        this.getTasks(); // after the render function, get task
        // **NOTE** setState function in getTask() will re-render the component
    }

    render() {
        let eventItem = this.state.listDataSource.map((obj, i) => {
            return <CheckboxField 
            key={i}
            containerStyle={styles.checkbox}
            onSelect={() => {
                this.removeTask(i);
            }}
            label={obj}
            labelSide='right'
            labelStyle={styles.checkboxLabel}>
                <Icon name="remove" color="red" />
            </CheckboxField>
        })
        return(
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TopBarComponent navigation={this.props.navigation} title={title} />

                    <View style={styles.addTask}>
                        <TextInput
                        ref={input => {this.textInput = input}}
                        underlineColorAndroid='transparent' // hides the horizontal line in TextInput
                        style={styles.textInput}
                        value={this.state.taskToAdd}
                        onChangeText={(e) => this.setState({
                            taskToAdd: e // save state each time the text changes
                        })} />
                        
                        <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            if(this.state.taskToAdd !== null) { // ensures input is not empty, whitespace is still allowed
                                this.addTask(this.state.taskToAdd); // add task
                                this.textInput.clear(); // clear the TextInput
                            } else {
                                alert('Please enter a task');
                            }
                        }}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Icon style={{marginRight: 2}} name='plus' color='#fff'/>
                                <Text style={styles.textWhite}>Add Task</Text>
                            </View>
                        </TouchableHighlight>
                    </View>
                </View>

                <ScrollView style={styles.main}>
                    {eventItem}
                </ScrollView>
            </View>
        )
    }
}
