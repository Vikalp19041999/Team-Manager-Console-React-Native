import React, { Component } from 'react';
import imagename from './assets/abc.png'
import Register from './app/register'
import Welcome from './app/menu'
import 'react-native-gesture-handler'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { StyleSheet, Text, View, TextInput, TouchableHighlight, Image } from 'react-native';

class Login extends Component {

  constructor(props) {
    super(props)
    this.state = {
      UserName: '',
      Password: ''
    }
  }

  login() {
    var username = this.state.UserName
    console.log(username)
    var password = this.state.Password
    if (username == "" || password == "") {
      alert("All fields are required")
    }
    else {
      fetch('http://192.168.0.123:3000/login', {
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
          if (responsejson.Message === 'Successful') {
            this.props.navigation.navigate('Menu')
          }
          else {
            alert(responsejson.Message)
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
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            defaultValue={this.state.Password1}
            onChangeText={(p) => this.setState({ Password: p })} />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this.login.bind(this)}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableHighlight>

        <TouchableHighlight style={styles.buttonContainer} onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={styles.hyperlink}>Don't have an account! Register here</Text>
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

const mainNavigator = createStackNavigator({
  LogIn: Login,
  SignUp: Register,
  Menu: Welcome
})

const App = createAppContainer(mainNavigator)

export default App