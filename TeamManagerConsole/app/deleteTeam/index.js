import React, { Component } from 'react';
import imagename from '../../assets/player.png'
import 'react-native-gesture-handler';
import { createSwitchNavigator } from 'react-navigation'
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Image } from 'react-native';

class Demo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Name: '',
            Players: '',
            TagLine: '',
            CreatedBy: ''
        }
    }

    teamDelete() {
        var name = this.state.Name

        if (name == "") {
            alert("Field is required")
        }
        else {
            fetch('http://192.168.0.123:3000/teamDelete', {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        Name: name,
                    }
                )
            })
                .then((response) => response.json()).then((responsejson) => {
                    console.log(responsejson.Message)
                    if (responsejson.Message == 'Deleted') {
                        alert('Successfully deleted the Team')
                    }
                    else {
                        alert('Team not deleted')
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
                    <Text style={styles.headerText}>Delete your Team</Text>
                </View>
                <Image style={styles.logo} source={imagename} />
                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Name"
                        keyboardType='default'
                        underlineColorAndroid='transparent'
                        defaultValue={this.state.Name}
                        onChangeText={(n) => this.setState({ Name: n })} />
                </View>


                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.teamDelete.bind(this)}>
                    <Text style={styles.loginText}>Delete Team</Text>
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
        height: '20%',
        width: '35%',
        marginTop: 80,
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

const DeleteTeam = createSwitchNavigator({
    home: { screen: Demo }
})

export default DeleteTeam
