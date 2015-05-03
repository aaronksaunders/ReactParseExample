/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @see https://github.com/gcanti/tcomb-form-native
 */

var React = require('react-native');
var t = require('tcomb-form-native');

var {
    AppRegistry,
    StyleSheet,
    TouchableHighlight,
    ScrollView,
    Text,
    View,
    DatePickerIOS,
    } = React;

var Form = t.form.Form;

// here we are: define your domain model
var Person = t.struct({
    firstName: t.Str,              // a required string
    lastName: t.Str,  // an optional string
    email: t.Str,  // an optional string
    password: t.Str,  // an optional string
    passwordConfirm: t.Str,  // an optional string
});

var options = {
    fields: {
        firstName: {
            label: "First Name",
            returnKeyType: "next"
        },
        lastName: {
            label: "Last Name",
            returnKeyType: "next"
        },
        email: {
            returnKeyType: "next"
        },
        passwordConfirm: {
            label: "Password Confirmation",
            password: true,
            returnKeyType: "next"
        },
        password: {
            password: true,
            returnKeyType: "next"
        },
        passwordConfirm: {
            label: "Password Confirmation",
            password: true,
            returnKeyType: "go"
        }
    }
}; // optional rendering options (see documentation)

var CreateAccountScreen = React.createClass({

    getDefaultProps: function () {
        return {};
    },


    getInitialState: function () {
        return {};
    },
    onCancel: function () {
        this.props.navigator.pop()
    },
    onPress: function () {
        // call getValue() to get the values of the form
        var value = this.refs.form.getValue();

        // hide keyboard
        this.refs.form.getComponent('firstName').blur();


        if (value) { // if validation fails, value will be null
            alert(JSON.stringify(value)); // value here is an instance of Person
        }
    },

    componentWillUnmount : function(){
        alert("componentWillUnmount");
    },

    render: function () {
        return (
            <ScrollView>
                <View style={styles.container}>
                    {/* display */}
                    <Form
                        ref="form"
                        type={Person}
                        options={options}
                        />
                    <TouchableHighlight style={[styles.button, styles.buttonOk]} onPress={this.onPress}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={[styles.button, styles.buttonCancel]} onPress={this.onCancel}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </TouchableHighlight>
                </View>
            </ScrollView>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        //marginTop: 10,
        paddingLeft: 20,
        paddingRight: 20,
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
    buttonCancel: {
        backgroundColor: '#b51a00',
        borderColor: '#b51a00',
    },
    buttonOk: {
        backgroundColor: '#108b5b',
        borderColor: '#108b5b',
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

module.exports = CreateAccountScreen;