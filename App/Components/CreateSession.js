/**
 */
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    DatePickerIOS,
    Navigator,
    } = React;

var moment = require('moment');
var TextLabelPanel = require('../Components/TextLabelPanel');
var DatePickerModal = require('../Components/DatePickerModal');
var InputLabelPanel = require('../Components/InputLabelPanel');
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
            timeZoneOffsetInHours: this.props.timeZoneOffsetInHours
        };
    },

    configScene : function(_route) {
        return Navigator.SceneConfigs.FloatFromBottom
    },

    showDatePicker : function() {
        this.props.navigator.push({
           // title: 'Next Route',
            component: DatePickerModal,
            sceneConfig: this.configScene,
            navigationBar: <NavigationBar
                title="Initial View"
                onNext={this.handleNext}
            />
        })
    },

    render: function () {
        //  alert(JSON.stringify(this.state.annotations));
        return (
            <View style={styles.view}>
                <Text style={styles.text}>IN CREATE SESSION</Text>

                <InputLabelPanel label="Session Name" text={this.props} />
                <TextLabelPanel label="Session Tutor" text={this.props} onPress={this.showDatePicker} />
                <TextLabelPanel label="Session Place" text={this.props} />
                <DatePickerIOS
                 date={this.state.date}
                 mode="dateTime"
                 timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                 //onDateChange={this.onDateChange}
                minuteInterval={10}
                />
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
    text: {
    },
    mainView: {
        flexDirection: 'row',
        marginVertical: 2,
        flex: 1
    }
});

module.exports = CreateSession;
