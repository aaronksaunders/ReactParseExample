/**
*/
'use strict';

var React = require('react-native');
var {
  StyleSheet,
  Text,
  View,
  DatePickerIOS
} = React;

var moment = require('moment');
var TextLabelPanel = require('../Components/TextLabelPanel');


var CreateSession = React.createClass({
  getDefaultProps: function () {
    return {
      date: new Date(),
      timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
    };
  },

  getInitialState: function() {
    return {
      date: this.props.date,
      timeZoneOffsetInHours: this.props.timeZoneOffsetInHours,
    };
  },

  render: function() {
  //  alert(JSON.stringify(this.state.annotations));
    return (
      <View>
        <Text>IN CREATE SESSION</Text>
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

module.exports = CreateSession;
