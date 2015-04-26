/**
 * @flow
 */
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    DatePickerIOS,
    } = React;

var Button = require('../Components/Button');
var DatePickerView = React.createClass({

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

    onDateChange: function(date) {
        this.setState({date: date});
    },

    onSaveSelect: function () {
        this.props.handleSelectedDate(this.state.date);
        this.props.navigator.pop();
    },

    render: function () {
        return (
            <View style={styles.view}>
                <Text style={styles.text}>IN CREATE SESSION</Text>
                <DatePickerIOS
                    date={this.state.date}
                    mode="datetime"
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    onDateChange={this.onDateChange}
                    minuteInterval={10} />
                <Button onPress={this.onSaveSelect} label="Save Date" />
            </View>

        )
    }
});

var styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'transparent',
        height : 100
    },
    text: {},
    mainView: {
        flexDirection: 'row',
        marginVertical: 2,
        flex: 1
    }
});

module.exports = DatePickerView;
