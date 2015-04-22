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
  ListView,
  TouchableHighlight,
  Text,
  View,
} = React;

debugger;
Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);


var MessageList = React.createClass({
  getInitialState: function() {
    var ds = new ListView.DataSource({rowHasChanged:(r1, r2) => r1 !== r2});
    return {
      dataSource: ds.cloneWithRows(this.props.dataArray),
      loading : true
    };
  },

  renderRow: function(session) {
    console.log(session);
    var t = session.tutor;
    var u = session.user;
    var p = session.place
    return (
      <TouchableHighlight >
        <View>
          <Text style={styles.account}>{u.first_name + " " + u.last_name}</Text>
            <Text style={styles.account}>{t.first_name + " " + t.last_name}</Text>
          <Text style={styles.account}>{p.Name + " " + p.Location}</Text>
        </View>
      </TouchableHighlight>
    );
  },

  render: function() {
    return ( <ListView
      ref="listview"
      dataSource={this.state.dataSource}
      renderRow={this.renderRow}
      />)
    }
  });


var SessionList =  React.createClass({

    mixins: [ParseReact.Mixin],


    observe: function() {
      return {
        tutorSessions: (new Parse.Query("TutorSession").include(["place,tutor,user"]))
      };
    },

    rowHasChanged: function(r1, r2) {
      console.log(r1 + "  " + r2);
    },

    getInitialState: function() {
      var ds = new ListView.DataSource({rowHasChanged:this.rowHasChanged /*(r1, r2) => r1 !== r2*/});
      return {
        dataSource: ds.cloneWithRows(["aaron"]),
        loading : true
      };
    },

    componentDidMount: function() {
      this.setState({dataSource: this.state.dataSource.cloneWithRows(
        this.data.tutorSessions
      )});
    },


    render: function() {

      if (this.queryErrors && this.queryErrors()) {
        console.log(JSON.stringify(this.queryErrors()));
      }

      if (this.pendingQueries().length) {
        return (      <View style={[styles.container, styles.centerText]}>
          <Text>WAITING...</Text>
        </View>)
      } else {
        console.log("Drawing List " + this.data.tutorSessions.length);
        return (<MessageList dataArray={this.data.tutorSessions}/>)
      }
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


module.exports = SessionList;
