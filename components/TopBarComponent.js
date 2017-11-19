import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, TouchableHighlight} from 'react-native';

export default class TopBarComponent extends Component {
    render() {
        const title = this.props.title;
        return(
            <View style={styles.topBar}>
                <Text style={{textAlignVertical: 'center', fontSize: 20, fontWeight: 'bold', color: '#FFFFFF'}}>{title}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    topBar: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})