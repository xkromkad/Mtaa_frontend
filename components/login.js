import React, { Component } from 'react';
import { Alert, Button, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';


export default class Login extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      email: '',
      password: '',
    };
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
          onPress={() => this.props.navigation.navigate('Home')}
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