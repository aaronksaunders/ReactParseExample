/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @flow
 */
'use strict';

var React = require('react-native');
var NavigationBar = require('./App/Components/ModifiedReactNavBar');

var SessionList = require('./App/Components/SessionList');
var LoginScreen = require('./App/Components/LoginScreen');
var CreateSession = require('./App/Components/CreateSession');


var {
    AppRegistry,
    StyleSheet,
    NavigatorIOS,
    Navigator,
    Text,
    View,
    } = React;

var Parse = require('parse').Parse;
var ParseReact = require('parse-react');
var ParseConfiguration = {
    'applicationId': "GRIoAKWUExfsT1q37Uyt66h4Lmx9ovvBAv2qigIw",
    'javascriptKey': "VVKntpb3zNpAgAhcEJHapDwKMVUKhIdX5QG0PVxf"
};
Parse.initialize(ParseConfiguration.applicationId, ParseConfiguration.javascriptKey);

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    view: {
        flex: 1,
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    text: {},
    mainView: {
        flexDirection: 'row',
        marginVertical: 2,
        flex: 1
    }
});

class ReactParseExample extends React.Component {

    getDefaultProps() {
        return {
            currentUser: Parse.User.current()
        }
    }

    /**
     * opens the next component Create Session to allow the user to create a
     * new Tutoring Session
     *
     * @TODO move this out of root component
     */
    addNewSession() {
        /*
         this.refs.nav.push({
         component: CreateSession,
         sceneConfig: Navigator.SceneConfigs.FloatFromBottom,
         navigationBar: <NavigationBar
         onNext={() => this.refs.nav.pop()}
         nextTitle="Cancel"
         hidePrev="true"
         title='New Session'/>,
         passProps: {session: {}}
         });
         */
    }

    renderScene(route, navigator) {
        var Component = route.component;
        var navBar = route.navigationBar;

        if (navBar) {
            navBar = React.addons.cloneWithProps(navBar, {navigator, route});
        }

        return (
            <View style={styles.view}>
                {navBar}
                <Component {...route.passProps} navigator={navigator} route={route}/>
            </View>
        );
    }

    render() {

        if (this.props.currentUser === undefined) {
            return (<LoginScreen/>)
        } else {
            alert(this.props.currentUser);
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
            }}/>
            );
        }
    }
}
;


AppRegistry.registerComponent('ReactParseExample', () => ReactParseExample);
