import React, { Component } from 'react';
import imagename from '../../assets/abc.png'
import 'react-native-gesture-handler';
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Image } from 'react-native';

export default class Register extends Component {
f
    constructor(props) {
        super(props)
        this.state = {
            UserName: '',
            Password: ''
        }
    }

    register() {
        var username = this.state.UserName
        console.log(username)
        var password = this.state.Password
        if (username == "" || password == "") {
            alert("All fields are required")
        }
        else {
            fetch('http://192.168.0.123:3000/register', {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        Username: username,
                        Password: password
                    }
                )
            })
                .then((response) => response.json()).then((responsejson) => {
                    console.log(responsejson.Message)
                    if (responsejson.Message == "Registered") {
                        this.props.navigation.navigate('Login')
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>Team Manager Console</Text>
                </View>
                <Image style={styles.logo} source={imagename} />
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Username"
                        keyboardType='default'
                        underlineColorAndroid='transparent'
                        defaultValue={this.state.UserName}
                        onChangeText={(n) => this.setState({ UserName: n })} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Password"
                        underlineColorAndroid='transparent'
                        defaultValue={this.state.Password1}
                        onChangeText={(p) => this.setState({ Password: p })} />
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.register.bind(this)}>
                    <Text style={styles.loginText}>Register</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    inputContainer: {
        borderColor: '#27ae60',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: 250,
        height: 45,
        marginBottom: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
    },
    inputIcon: {
        width: 30,
        height: 30,
        marginLeft: 15,
        justifyContent: 'center'
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#27ae60",
    },
    loginText: {
        color: 'white',
    },
    hyperlink: {
        color: '#27ae60'
    },
    logo: {
        marginTop: 100,
        marginBottom: 30
    },
    header: {
        height: 60,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#27ae60'
    },
    headerText: {
        fontSize: 22,
        color: 'snow',
        fontStyle: 'normal',
        fontWeight: 'bold',
        padding: 15
    },
});
