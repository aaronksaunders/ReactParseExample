/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
 'use strict';

var React = require('react-native');
var SessionList = require('./App/Components/SessionList');
var CreateSession = require('./App/Components/CreateSession');


var {
  AppRegistry,
  StyleSheet,
	NavigatorIOS
} = React;


var styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#111111'
  },
});

class ReactParseExample extends React.Component{

  addNewSession() {
    this.refs.nav.push({
        component: CreateSession,
        rightButtonTitle: 'Cancel',
        leftButtonTitle: null,
        passProps: {session : {}},
      });
  }

  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        ref="nav"
        initialRoute={{
          title: 'Tutor Manager',
          component: SessionList,
          rightButtonTitle: 'New Session',
          onRightButtonPress: () => this.addNewSession(),
        }} />
    );
  }
};


AppRegistry.registerComponent('ReactParseExample', () => ReactParseExample);
