/**
 *
 * @see https://github.com/gcanti/tcomb-form-native
 *
 * multiline text input not unsupported
 * @see ttps://github.com/facebook/react-native/issues/279
 *
 *
 * @flow
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
var PlaceList = require('../Components/PlaceList');
var UserList = require('../Components/UserList');
var Button = require('../Components/Button');
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
            selectedDate: new Date(),
            selectedUser: "",
            selectedPlace: ""
        };
    },

    showUserPicker: function () {

        this.props.navigator.push({
            title: 'Pick User',
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            component: UserList,
            navigationBar: <NavigationBar
                title="Pick Tutor" />,
            passProps: {handleSelectedRow: this.handleSelectedUser}
        })
    },

    handleSelectedPlace: function (_selectedPlace) {
        this.setState({
            selectedPlace: _selectedPlace
        });
    },

    handleSelectedUser: function (_selectedUser) {
        this.setState({
            selectedUser: _selectedUser
        });
    },

    handleSelectedDate: function (_selectedDate) {
        this.setState({
            selectedDate: _selectedDate
        });
    },

    showPlacePicker: function () {

        this.props.navigator.push({
            title: 'Pick User',
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            component: PlaceList,
            navigationBar: <NavigationBar
                title="Pick Tutor Location" />,
            passProps: {handleSelectedRow: this.handleSelectedPlace}
        })
    },

    showDatePicker: function () {

        this.props.navigator.push({
            title: 'Pick Date',
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            component: DatePickerView,
            navigationBar: <NavigationBar
                title="Initial View" />,
            passProps: {handleSelectedDate: this.handleSelectedDate}
        })
    },

    displayUserName: function (_user) {
        return _user ? _user.first_name + " " + _user.last_name : null;
    },

    saveNewSession: function () {

    },

    render: function () {
        //  alert(JSON.stringify(this.state.annotations));
        return (
            <View style={styles.view}>
                <InputLabelPanel label="Session Name" text={this.props} />
                <TextLabelPanel label="Session Tutor" text={this.displayUserName(this.state.selectedUser) || ""}   __onPress={this.showUserPicker} />
                <TextLabelPanel label="Session Location" text={this.state.selectedPlace.Name + ""}   __onPress={this.showPlacePicker} />
                <TextLabelPanel label="Session Time" text={this.state.selectedDate + ""}  __onPress={this.showDatePicker} />
                <InputLabelPanel label="Notes" text={this.props} />
                <Button
                    onPress={() => this.saveNewSession()}
                    label="Save New Session" />
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
