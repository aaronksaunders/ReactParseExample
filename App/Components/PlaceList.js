/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 *
 */
'use strict';

var React = require('react-native');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var SessionDetail = require('../Components/SessionDetail');

var ParseConfiguration = {
    'applicationId': "GRIoAKWUExfsT1q37Uyt66h4Lmx9ovvBAv2qigIw",
    'javascriptKey': "VVKntpb3zNpAgAhcEJHapDwKMVUKhIdX5QG0PVxf"
};

var {
    AppRegistry,
    StyleSheet,
    ListView,
    TouchableHighlight,
    ActivityIndicatorIOS,
    Text,
    View,
    } = React;

Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);
var NavigationBar = require('../Components/ModifiedReactNavBar');

var PlaceListView = React.createClass({
    getInitialState: function () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(this.props.dataArray),
            loading: true
        };
    },

    onSelect: function (selectedItem) {
        this.props.handleSelectedRow(selectedItem);
        this.props.navigator.pop();
    },

    renderRow: function (place) {
        console.log(place);
        return (
            <TouchableHighlight onPress={ () => this.onSelect(place)}>
                <View style={styles.row}>
                    <Text  style={styles.listText_large} >{place.Name}</Text>
                    <Text  style={styles.listText_large} >{place.Location}</Text>
                </View>
            </TouchableHighlight>
        );
    },

    render: function () {
        return (
            <ListView
                ref="place_listview"
                dataSource={this.state.dataSource}
                renderRow={this.renderRow} />
        )
    }

});


var PlaceList = React.createClass({

    mixins: [ParseReact.Mixin],


    observe: function () {
        return {
            places: (new Parse.Query("Place"))
        };
    },

    rowHasChanged: function (r1, r2) {
        console.log(r1 + "  " + r2);
    },

    getInitialState: function () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows([]),
            loading: true
        };
    },

    componentDidMount: function () {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(
                this.data.places
            )
        });
    },


    render: function () {

        if (this.queryErrors && this.queryErrors()) {
            console.log(JSON.stringify(this.queryErrors()));
        }

        if (this.pendingQueries().length) {
            return (
                <View style={[styles.container, styles.centerText]}>
                    <ActivityIndicatorIOS
                        style={[styles.centering, {backgroundColor: '#eeeeee', height: 40}]} />
                </View>
            )
        } else {
            console.log("Drawing List " + this.data.places.length);
            return (<PlaceListView
                navigator={this.props.navigator}
                handleSelectedRow={this.props.handleSelectedRow}
                dataArray={this.data.places}/>)
        }
    }

});

var styles = StyleSheet.create({
    row: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
        borderBottomColor: '#eeeeee',
        borderBottomWidth: 1
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    listText: {
        fontSize: 16,
        textAlign: 'left',
        color: 'grey'
    },
    listText_large: {
        fontSize: 18,
        textAlign: 'left'
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    }
});


module.exports = PlaceList;
