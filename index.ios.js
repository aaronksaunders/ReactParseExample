/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SessionList = require('./App/Components/SessionList');


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
  render() {
    return (
      <NavigatorIOS
      style={styles.container}
        initialRoute={{
          title: 'Tutor Manager',
          component: SessionList
        }} />
    );
  }
};


AppRegistry.registerComponent('ReactParseExample', () => ReactParseExample);
