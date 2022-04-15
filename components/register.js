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

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Doucma</Text>
        <TextInput
          value={this.state.name}
          onChangeText={(firstname) => this.setState({ firstname })}
          placeholder={'Meno'}
          style={styles.input}
        />
        <TextInput
          value={this.state.surname}
          onChangeText={(surname) => this.setState({ surname })}
          placeholder={'Priezvisko'}
          style={styles.input}
        />
        <TextInput
          value={this.state.email}
          onChangeText={(email) => this.setState({ email })}
          placeholder={'Email'}
          style={styles.input}
        />
        <TextInput
          value={this.state.password}
          onChangeText={(password) => this.setState({ password })}
          placeholder={'Heslo'}
          secureTextEntry={true}
          style={styles.input}
        />
        <TextInput
          value={this.state.rpassword}
          onChangeText={(rpassword) => this.setState({ rpassword })}
          label="Zopakuj heslo"
          secureTextEntry={true}
          style={styles.input}
          
        />
        
        <Button
          title={'Zaregistrovať'}
          style={styles.input}
          onPress={() => this.props.navigation.navigate('Home')}
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
    marginTop: 20
  }
});