/**
*/
'use strict';
var React = require('react-native');
var {
  StyleSheet,
  ScrollView,
  MapView,
} = React;

var moment = require('moment');
var TextLabelPanel = require('../Components/TextLabelPanel');

var SessionDetail = React.createClass({

  getInitialState: function() {
    return {
      relativeTime : moment(this.props.session.createdAt).startOf('hours').fromNow(),
      annotations: [{
        longitude: this.props.session.place.coords.longitude,
        latitude: this.props.session.place.coords.latitude,
        title: 'You Are Here'
      }],
      mapRegion : {
        latitude: this.props.session.place.coords.latitude,
        longitude: this.props.session.place.coords.longitude,
        latitudeDelta: .01,
        longitudeDelta: .01
      }
    };
  },


  render: function() {
    //  alert(JSON.stringify(this.state.annotations));
    return (
      <ScrollView>
      <MapView region={this.state.mapRegion} style={styles.map}
      annotations={this.state.annotations}/>
      <TextLabelPanel label="Name" text={this.props.session.place.Name} />
      <TextLabelPanel label="Location" text={this.props.session.place.Location} />
      <TextLabelPanel label="When" text={this.state.relativeTime} />
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
  map: {
    height: 250
  }
});

module.exports = SessionDetail;
