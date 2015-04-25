/**
 */
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    DatePickerIOS,
    } = React;


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


    render: function () {
        return (
            <View style={styles.view}>
                <Text style={styles.text}>IN CREATE SESSION</Text>
                <DatePickerIOS
                    date={this.state.date}
                    mode="datetime"
                    timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                    minuteInterval={10} />
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
