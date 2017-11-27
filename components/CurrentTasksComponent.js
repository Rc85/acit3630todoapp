import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, ListView, CheckBox, AsyncStorage, Dimensions, TouchableHighlight, TextInput} from 'react-native';
import CheckboxField from 'react-native-checkbox-field';
import Icon from 'react-native-vector-icons/FontAwesome';
import TopBarComponent from './TopBarComponent.js';

const styles = require('../assets/ToDoApp/styles.js');
const title = 'Current Tasks';
const windowWidth = Dimensions.get('window').width;
var tasks = [];

export default class CurrentTasksComponent extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            listDataSource: ds.cloneWithRows(tasks),
            taskToAdd: null
        }
    }

    static navigationOptions = {
        title: title
    }

    addTask(task) {
        taskList = tasks; // create temporary array call 'taskList' by copying 'tasks'
        taskList.push(task); // push 'task' into temporary array
        this.setState({
            listDataSource: this.state.listDataSource.cloneWithRows(taskList) //set state using temporary array
        });

        this.saveTask(taskList); // save the temporary array to local storage as the new task list
    }

    removeTask(index) {
        taskList = tasks; // create temporary array call 'taskList' by copying 'tasks'
        taskList.splice(index, 1); // remove task at index
        this.setState({
            listDataSource: this.state.listDataSource.cloneWithRows(taskList) // set state using new task list
        });

        this.saveTask(taskList); // save new task list to local storage
    }

    async saveTask(list) {
        let taskList = JSON.stringify(list); // *MUST* - AsyncStorage only save as strings
        await AsyncStorage.setItem('taskList',); // save to local storage
    }

    async getTasks() {
        let response = await AsyncStorage.getItem('taskList'); // get the string object from local storage
        tasks = await JSON.parse(response) || []; // parse it into JSON object OR if does not exist, return empty array

        this.setState({
            listDataSource: this.state.listDataSource.cloneWithRows(tasks) // set state with new task list
        });
    }

    componentDidMount() {
        this.getTasks(); // after the render function, get task
        // **NOTE** setState function in getTask() will re-render the component
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TopBarComponent navigation={this.props.navigation} title={title} />

                    <View style={styles.addTask}>
                        <TextInput
                        ref={input => {this.textInput = input}}
                        underlineColorAndroid='transparent' // hides the horizontal line in TextInput
                        style={styles.textInput}
                        onChangeText={(e) => this.setState({
                            taskToAdd: e // save state each time the text changes
                        })} />
                        
                        <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            if(this.state.taskToAdd !== null) { // ensures input is not empty, whitespace is still allowed
                                this.addTask(this.state.taskToAdd); // add task
                                this.textInput.clear(); // clear the TextInput
                                this.setState({
                                    taskToAdd: null // return state to normal
                                });
                            } else {
                                alert('Please enter a task');
                            }
                        }}>
                            <Text style={styles.textWhite}>Add Task</Text>
                        </TouchableHighlight>
                    </View>
                </View>

                <View style={styles.main}>
                    <ListView
                    enableEmptySections={true}
                    dataSource={this.state.listDataSource}
                    renderRow={(rowData, sectionID, rowID) => 
                        <CheckboxField
                        containerStyle={styles.checkbox}
                        onSelect={() => this.removeTask(rowID)}
                        label={rowData}
                        labelSide='right'
                        labelStyle={styles.checkboxLabel}>
                            <Icon name="check" color="#fff" />
                        </CheckboxField>
                    } />
                </View>
            </View>
        )
    }
}
