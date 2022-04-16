import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';



export default class Register extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      firstname: '',
      surname: '',
      email: '',
      password: '',
      rpassword: ''
    };
  }

  async send() {
    try {
      let res = await fetch('http://192.168.0.143:8000/registracia', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              'req': {'name': this.state.firstname,
            'surname': this.state.surname, 'email': this.state.email, 'password': this.state.password},
            }),
          });
      res = res.headers;
      console.log(res)
    } catch(e) {
      console.error(e);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Doucma</Text>
        <Text>Meno</Text>
        <TextInput
          value={this.state.name}
          onChangeText={(firstname) => this.setState({ firstname })}
          style={styles.input}
        />
        <Text>Priezvisko</Text>
        <TextInput
          value={this.state.surname}
          onChangeText={(surname) => this.setState({ surname })}
          style={styles.input}
        />
        <Text>Email</Text>
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          style={styles.input}
        />
        <Text>Heslo</Text>
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          secureTextEntry={true}
          style={styles.input}
        />
        <Text>Zopakujte heslo</Text>
        <TextInput
          value={this.state.rpassword}
          onChangeText={(rpassword) => this.setState({ rpassword })}
          secureTextEntry={true}
          style={styles.input}
          
        />
        
        <Button
          title={'Zaregistrovať'}
          style={styles.input}
          onPress={() => this.send()}
          //onPress={() => this.props.navigation.navigate('Home')}
        />
         <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style={styles.alreadyReg}>
          <Text>Už ste zaregistrovaný?</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "rgba(123,248,165,1)",
  },
  input: {
    width: '80%',
    height: 60,
    padding: 10,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    marginBottom: 20,
  },
  alreadyReg: {
    
    marginTop: 30,
    borderRadius: 32,
    borderWidth: 1,
    padding: 5,
    borderColor: 'rgb(34, 186, 250)',
    backgroundColor: 'rgb(34, 186, 250)',
  }
});