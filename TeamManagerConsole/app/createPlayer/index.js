import React, { Component } from 'react';
import imagename from '../../assets/player.png'
import 'react-native-gesture-handler';
import {createSwitchNavigator} from 'react-navigation'
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Image } from 'react-native';

class Demo extends Component {

    constructor(props) {
        super(props)
        this.state = {
            Name: '',
            TeamName: '',
            Skills: '',
            CreatedBy: ''
        }
    }

    playerCreate() {
        var name = this.state.Name
        var teamName = this.state.TeamName
        var skills = this.state.Skills
        var createdBy = this.state.CreatedBy
        if (name == "" || teamName == "" || skills == "" || createdBy == "") {
            alert("All fields are required")
        }
        else {
            fetch('http://192.168.0.123:3000/playerCreate', {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        Name: name,
                        TeamName: teamName,
                        Skills: skills,
                        CreatedBy: createdBy
                    }
                )
            })
                .then((response) => response.json()).then((responsejson) => {
                    console.log(responsejson.Message)
                    if (responsejson.Message == 'Successfully Created Player') {
                        alert('Successfully created the Player')
                    }
                    else{
                        alert('Player not created')
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
                    <Text style={styles.headerText}>Create Your Player</Text>
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

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Team Name"
                        keyboardType='default'
                        underlineColorAndroid='transparent'
                        defaultValue={this.state.TeamName}
                        onChangeText={(t) => this.setState({ TeamName: t })} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Skills"
                        keyboardType='default'
                        underlineColorAndroid='transparent'
                        defaultValue={this.state.Skills}
                        onChangeText={(a) => this.setState({ Skills: a })} />
                </View>

                <View style={styles.inputContainer}>
                    <TextInput style={styles.inputs}
                        placeholder="Created by"
                        underlineColorAndroid='transparent'
                        defaultValue={this.state.CreatedBy}
                        onChangeText={(p) => this.setState({ CreatedBy: p })} />
                </View>

                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.playerCreate.bind(this)}>
                    <Text style={styles.loginText}>Create Player</Text>
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
        height:'20%',
        width:'35%',
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

const CreatePlayer = createSwitchNavigator({
    home:{screen:Demo}
})

export default CreatePlayer
