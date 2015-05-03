var React = require('react-native');
var t = require('tcomb-form-native');

var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var {
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    Text,
    View,
    Navigator
    } = React;


var Form = t.form.Form;
var CreateAccountScreen = require('../Components/CreateAccountScreen');

// here we are: define your domain model
var Person = t.struct({
    username: t.Str,              // a required string
    password: t.Str,  // an optional string
    rememberMe: t.Bool,        // a boolean
});

// optional rendering options (see documentation)
var options = {
    fields: {
        password: {
            password: true
        }
    }
};

/**
 */
var LoginView = React.createClass({
    getDefaultProps: function () {
        return {
            date: new Date(),
            timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60
        };
    },
    getInitialState: function () {
        return {
            error: null,
            signup: false
        };
    },

    doLogin: function () {
        var self = this;

        // call getValue() to get the values of the form
        var value = this.refs.form.getValue();
        if (value) { // if validation fails, value will be null
            alert(JSON.stringify(value)); // value here is an instance of Person

            // login the parse user
            Parse.User.logIn(value.username, value.password).then(function () {
                self.setState({
                    error: null
                });
            }, function () {
                self.setState({
                    error: 'Incorrect username or password'
                });
            });
        }
    },

    doCreateAccount: function () {
        this.props.navigator.push(
            {component: CreateAccountScreen}
        );
    },

    render: function () {
        return (
            <ScrollView>
                <View style={styles.container}>
                    {/* display */}
                    {
                        this.state.error ?
                            <Text>{this.state.error}</Text> :
                            null
                    }
                    <Form
                        ref="form"
                        type={Person}
                        options={options}
                        />
                    <TouchableHighlight style={styles.button}
                                        onPress={this.doLogin}
                                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button}
                                        onPress={this.doCreateAccount}
                                        underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Create Account</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
});


var LoginScreen = React.createClass({

    getInitialState: function () {
        return {
            error: null,
            signup: false
        };
    },


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
    },

    render: function () {
        return (
            <Navigator
                ref="nav"
                style={styles.container}
                renderScene={this.renderScene}
                configureScene={(route) => {
                        if (route.sceneConfig) {
                            return route.sceneConfig;
                        }
                        return Navigator.SceneConfigs.FloatFromBottom;
                    }}
                initialRoute={{
                    component: LoginView,
                    passProps:{ }
                }}
                />
        )
    }
});

var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    title: {
        fontSize: 30,
        alignSelf: 'center',
        marginBottom: 30
    },
    buttonText: {
        fontSize: 18,
        color: 'white',
        alignSelf: 'center'
    },
    button: {
        height: 36,
        backgroundColor: '#48BBEC',
        borderColor: '#48BBEC',
        borderWidth: 1,
        borderRadius: 8,
        marginBottom: 10,
        alignSelf: 'stretch',
        justifyContent: 'center'
    }
});

module.exports = LoginScreen;