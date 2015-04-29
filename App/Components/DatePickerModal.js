/**
 */
'use strict';

var React = require('react-native');
var {
    StyleSheet,
    Text,
    View,
    DatePickerIOS,
    Navigator,
    } = React;

var NavigationBar = require('../Components/ModifiedReactNavBar');
var DatePickerView = require('../Components/DatePickerView');

var DatePickerModal = React.createClass({
    renderScene: function (route, nav) {
        debugger;
        var Component = route.component;
        var navBar = route.navigationBar;

        if (navBar) {
            navBar = React.addons.cloneWithProps(navBar, {
                navigator: navigator,
                route: route
            });
        }

        return (
            <View>
                {navBar}
                <DatePickerView  />
            </View>
        );
    },

    render: function () {
        return (
            <Navigator
                style={styles.container}
                initialRoute={{
                    component: DatePickerView,
                    navigationBar: <NavigationBar title="Initial View"/>
                }}
                renderScene={this.renderScene}
                configureScene={(route) => {
                    return Navigator.SceneConfigs.FloatFromBottom;
                }}
            />
        );
    }
});

var styles = StyleSheet.create({
    view: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: 'green'
    },
    text: {},
    mainView: {
        flexDirection: 'row',
        marginVertical: 2,
        flex: 1
    }
});

module.exports = DatePickerModal;
