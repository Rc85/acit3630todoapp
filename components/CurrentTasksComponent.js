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
        taskList = tasks;
        taskList.push(task);
        this.setState({
            listDataSource: this.state.listDataSource.cloneWithRows(taskList)
        });

        this.saveTask(taskList);
    }

    removeTask(index) {
        taskList = tasks;
        taskList.splice(index, 1);
        this.setState({
            listDataSource: this.state.listDataSource.cloneWithRows(taskList)
        });

        this.saveTask(taskList);
    }

    async saveTask(taskList) {
        await AsyncStorage.setItem('taskList', JSON.stringify(taskList));
    }

    async getTasks() {
        let response = await AsyncStorage.getItem('taskList');
        tasks = await JSON.parse(response) || [];

        this.setState({
            listDataSource: this.state.listDataSource.cloneWithRows(tasks)
        });
    }

    componentDidMount() {
        this.getTasks();
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.topBar}>
                    <TopBarComponent navigation={this.props.navigation} title={title} />

                    <View style={styles.addTask}>
                        <TextInput
                        ref={input => {this.textInput = input}}
                        underlineColorAndroid='transparent'
                        style={styles.textInput}
                        onChangeText={(e) => this.setState({
                            taskToAdd: e
                        })} />
                        
                        <TouchableHighlight
                        style={styles.button}
                        onPress={() => {
                            if(this.state.taskToAdd !== null) {
                                this.addTask(this.state.taskToAdd);
                                this.textInput.clear();
                                this.setState({
                                    taskToAdd: null
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