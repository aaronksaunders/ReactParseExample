/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var ParseConfiguration = {
	'applicationId': "GRIoAKWUExfsT1q37Uyt66h4Lmx9ovvBAv2qigIw",
	'javascriptKey': "VVKntpb3zNpAgAhcEJHapDwKMVUKhIdX5QG0PVxf"
};

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
} = React;

debugger;
Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);


var ReactParseExample = React.createClass({
  mixins: [ParseReact.Mixin],

  observe: function() {
    return {
      tutorSessions: (new Parse.Query("TutorSession"))
                          .include(["place","tutor","user"])
                          .descending("createdAt")
    };
  },

  render: function() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
        <Text style={styles.instructions}>
          To get started, edit index.ios.js
        </Text>
        {this.data.tutorSessions.map(function(session) {
          // Loop over the objects returned by the items query, rendering them
          // with TodoItem components.
          return (
            <Text key={session.id}>{session.place.Name} --- {session.tutor.email}</Text>
          );
        })}
      </View>
    );
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactParseExample', () => ReactParseExample);
