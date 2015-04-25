/**
 * Sample React Native App
 * https://github.com/facebook/react-native
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

debugger;
Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);
var NavigationBar = require('react-native-navbar');

var MessageList = React.createClass({
    getInitialState: function () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(this.props.dataArray),
            loading: true
        };
    },

    onSelect: function (session) {

        if (true) {
            this.props.navigator.push({
                //title: this.getTitle(earthquake.humanReadableLocation),
                component: SessionDetail,
                passProps: {session: session, navigator: this.props.navigator},
                navigationBar: <NavigationBar
                    title ='Session Detail' />
            });
        } else {
            //  ReactElement.render();
        }

    },

    renderRow: function (session) {
        console.log(session);
        var t = session.tutor;
        var u = session.user;
        var p = session.place
        return (
            <TouchableHighlight onPress={ () => this.onSelect(session)}>
                <View style={styles.row}>
                    <Text  style={styles.listText_large} >{u.first_name + " " + u.last_name}</Text>
                    <Text style={styles.listText_large} >{t.first_name + " " + t.last_name}</Text>
                    <Text style={styles.listText}>{p.Name + " " + p.Location}</Text>
                </View>
            </TouchableHighlight>
        );
    },

    render: function () {
        return (
            <ListView
                ref="listview"
                dataSource={this.state.dataSource}
                renderRow={this.renderRow} />
        )
    }

});


var SessionList = React.createClass({

    mixins: [ParseReact.Mixin],

    addNewSession: function () {
        alert("Clicked Add New Session");
    },
    observe: function () {
        return {
            tutorSessions: (new Parse.Query("TutorSession").include(["place,tutor,user"]))
        };
    },

    rowHasChanged: function (r1, r2) {
        console.log(r1 + "  " + r2);
    },

    getInitialState: function () {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return {
            dataSource: ds.cloneWithRows(["aaron"]),
            loading: true
        };
    },

    componentDidMount: function () {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(
                this.data.tutorSessions
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
            console.log("Drawing List " + this.data.tutorSessions.length);
            return (<MessageList
                navigator={this.props.navigator}
                dataArray={this.data.tutorSessions}/>)
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


module.exports = SessionList;
