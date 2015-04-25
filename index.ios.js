/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var NavigationBar = require('react-native-navbar');

var SessionList = require('./App/Components/SessionList');
var CreateSession = require('./App/Components/CreateSession');


var {
    AppRegistry,
    StyleSheet,
    NavigatorIOS,
    Navigator,
    View,
    } = React;


var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
});

class ReactParseExample extends React.Component {

    addNewSession() {
        this.refs.nav.push({
            component: CreateSession,
            sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
            navigationBar: <NavigationBar
                onNext = {() => this.refs.nav.pop()}
                nextTitle = "Cancel"
                hidePrev = "true"
                title ='New Session' />,
            passProps: {session: {}}
        });
    }

    renderScene(route, navigator) {
        var Component = route.component;
        var navBar = route.navigationBar;

        if (navBar) {
            navBar = React.addons.cloneWithProps(navBar, {navigator, route});
        }

        return (
            <View style={styles.container}>
        {navBar}
                <Component {...route.passProps}  navigator={navigator} route={route} />
            </View>
        );
    }

    render() {
        return (
            <Navigator
                ref="nav"
                style={styles.container}
                renderScene={this.renderScene}
                configureScene={(route) => {
                    if (route.sceneConfig) {
                        return route.sceneConfig;
                    }
                    return Navigator.SceneConfigs.FloatFromRight;
                }}
                initialRoute={{
                    component: SessionList,
                    rightButtonTitle: 'New Session',
                    navigationBar: <NavigationBar
                        onNext = {() => this.addNewSession()}
                        nextTitle = "Create Session"
                        title ='Tutor Manager' />
                }} />
        );
    }
}
;


AppRegistry.registerComponent('ReactParseExample', () => ReactParseExample);
