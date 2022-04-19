import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as asyncStorage from './asyncStorage'
import {ip} from './ip';

export default class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
    };
  }

  async send() {
    try {
      let res = await fetch('http://' + ip + '/prihlasenie', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({'email': this.state.email, 'password': this.state.password},),
          });
      let stat = await res.status;
      if (stat === 200){
        let token = await res.headers.map.token;
        json = await res.json()
        await asyncStorage.storeData(json.name, json.surname, json.email, token, json.id);
        this.props.navigation.navigate('Home')
      }
      else
      {
        console.log(stat);
        Alert.alert(
          "Chyba",
          "Nesprávne zadané údaje",
          [
           
            { text: "OK"}
          ]
        );
      }
      }
     catch(e) {
       console.log(e)
  }
}

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Doucma</Text>
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
        <Button
          title={'Prihlásiť'}
          style={styles.input}
          onPress={() => this.send()}
        />
         <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.alreadyLog}>
          <Text>Ste tu nový?</Text>
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
  alreadyLog: {
    marginTop: 30,
    borderRadius: 32,
    borderWidth: 1,
    padding: 5,
    borderColor: 'rgb(34, 186, 250)',
    backgroundColor: 'rgb(34, 186, 250)',
  }
});