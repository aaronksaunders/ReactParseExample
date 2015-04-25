/**
 *
 * @see https://github.com/gcanti/tcomb-form-native
 *
 * multiline text input not unsupported
 * @see ttps://github.com/facebook/react-native/issues/279
 */
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    DatePickerIOS,
    Navigator,
    TouchableOpacity,
    } = React;

var moment = require('moment');
var TextLabelPanel = require('../Components/TextLabelPanel');
var InputLabelPanel = require('../Components/InputLabelPanel');
var DatePickerView = require('../Components/DatePickerView');
var NavigationBar = require('react-native-navbar');


var CreateSession = React.createClass({
    getDefaultProps: function () {
        return {
            date: new Date(),
            timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60
        };
    },

    getInitialState: function () {
        return {
            date: this.props.date,
            timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
            selectedDate : new Date()
        };
    },

    onDateChange: function (date) {
        this.setState({
            selectedDate: date,
            date: date
        });
    },

    showDatePicker : function() {

        this.props.navigator.push({
            title: 'Pick Date',
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            component: DatePickerView,
            navigationBar: <NavigationBar
                title="Initial View" />
        })
    },

    render: function () {
        //  alert(JSON.stringify(this.state.annotations));
        return (
            <View style={styles.view}>
                <InputLabelPanel label="Session Name" text={this.props} />
                <TextLabelPanel label="Session Tutor" text={this.props + ""}/>
                <TextLabelPanel label="Session Location" text={this.props + ""}/>
                <TextLabelPanel label="Session Time" text={this.state.selectedDate + ""}  __onPress={this.showDatePicker} />
                <InputLabelPanel label="Notes" text={this.props} />
            </View>
        )
    }
});

var styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    text: {},
    mainView: {
        flexDirection: 'row',
        marginVertical: 2,
        flex: 1
    }
});

module.exports = CreateSession;
