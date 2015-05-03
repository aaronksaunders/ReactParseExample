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
    name: t.Str,              // a required string
    surname: t.Str,  // an optional string
    email: t.Str,  // an optional string
});

var options = {
    fields: {
        birthDate: {
            mode: "date",
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
        if (value) { // if validation fails, value will be null
            alert(JSON.stringify(value)); // value here is an instance of Person
        }
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
                        value={{
              birthDate : this.props.date
            }}
                        />
                    <TouchableHighlight style={styles.button} onPress={this.onPress} underlayColor='#99d9f4'>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableHighlight>
                    <TouchableHighlight style={styles.button} onPress={this.onCancel} underlayColor='#99d9f4'>
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

module.exports = CreateAccountScreen;