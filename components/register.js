import React, { Component } from 'react';
import { Alert, Button, Image, TextInput, View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as asyncStorage from './asyncStorage'


export default class Register extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      firstname: '',
      surname: '',
      email: '',
      password: '',
      rpassword: '',
      error:'',
    };
  }

  async send() {
    let good = true;
    if (this.state.password !=  this.state.rpassword  ) {
      this.setState({error: "Hesla nie su rovnake!"});
      good = false;
    }

  if(good)
   {
   
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
      let stat = await res.status;
      if (stat === 200){
        let token = await res.headers.map.token;
        await asyncStorage.storeData(this.state.firstname, this.state.surname, this.state.email, token);
        this.props.navigation.navigate('Home')
        let data = await asyncStorage.getData()
        console.log(data[0])
      }

    } catch(e) {
     
      console.error(e);
    }
  }
    else
    {
      Alert.alert(
        "Chyba",
        "Heslá sa musia opakovať!",
        [
         
          { text: "OK"}
        ]
      );
    }
  }
  /*PassValid = async () => {
   
   
  }*/
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Doucma</Text>
        <Image source={require("doucma/assets/images/logo.png")}
                                    resizeMode="contain"
                                    style={styles.logo}/>
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
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'black',
    marginBottom: 20,
  },
  title: {
    fontSize: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  alreadyReg: {
    marginTop: 30,
    borderRadius: 32,
    borderWidth: 1,
    padding: 5,
    borderColor: 'rgb(34, 186, 250)',
    backgroundColor: 'rgb(34, 186, 250)',
  },
  logo:{
      width:40,
      marginHorizontal: '45%',
  }
});