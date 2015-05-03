/**
 *
 * @see https://github.com/facebook/react-native/issues/1029 to explain map rendering
 */
'use strict';
var React = require('react-native');
var ActionSheetIOS = require('ActionSheetIOS');

var {
    StyleSheet,
    ScrollView,
    MapView,
    } = React;

var moment = require('moment');
var TextLabelPanel = require('../Components/TextLabelPanel');
var Button = require('../Components/Button');
var TimerMixin = require('react-timer-mixin');

var SessionDetail = React.createClass({
    mixins: [TimerMixin],

    getInitialState: function () {
        return {
            showMap : false,
            relativeTime: moment(this.props.session.createdAt).startOf('hours').fromNow(),
            annotations: [{
                longitude: this.props.session.place.coords.longitude,
                latitude: this.props.session.place.coords.latitude,
                title: 'You Are Here'
            }],
            mapRegion: {
                latitude: this.props.session.place.coords.latitude,
                longitude: this.props.session.place.coords.longitude,
                latitudeDelta: .01,
                longitudeDelta: .01
            }
        };
    },


    showShareActionSheet: function () {
        ActionSheetIOS.showShareActionSheetWithOptions({
                url: 'https://code.facebook.com',
            },
            (error) => {
                console.error(error);
            },
            (success, method) => {
                var text;
                if (success) {
                    text = `Shared via ${method}`;
                } else {
                    text = 'You didn\'t share';
                }
                this.setState({text})
            });
    },

    componentDidMount: function() {
        this.setTimeout(function() {
            this.setState({showMap: true});
        }.bind(this), 250);
    },

    renderMap: function() {
        if (this.state.showMap) {
            return (
                <MapView region={this.state.mapRegion} style={styles.map}
                         annotations={this.state.annotations}/>
            );
        } else {
            return (
                <View style={[styles.map, {backgroundColor: '#cccccc'}]} />
            );
        }
    },

    render: function () {
        //  alert(JSON.stringify(this.state.annotations));
        return (
            <ScrollView>
                {this.renderMap()}
                <TextLabelPanel label="Name" text={this.props.session.place.Name}/>
                <TextLabelPanel label="Location" text={this.props.session.place.Location}/>
                <TextLabelPanel label="When" text={this.state.relativeTime}/>
                <Button
                    onPress={() => this.showShareActionSheet()}
                    label="Share Session Information"/>
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
