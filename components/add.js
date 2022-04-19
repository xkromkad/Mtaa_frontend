import React, { useState, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Header from "./nav/header";
import Footer from "./nav/footer";
import * as asyncStorage from './asyncStorage';


export default function UploadFile() {
  let body = new FormData();
  const [title, setTitle] = React.useState();
  const [description, setDescription] = React.useState();

  async function pickDocument() {
    let result = await DocumentPicker.getDocumentAsync({});
    
    body.append('file', {uri: result.uri,name: 'photo.png', type: 'image/png'});
    console.log(body)
   };

   async function sendDocument() {
    let data = await asyncStorage.getData()
    body.append('title', title);
    body.append('description', description);
    if (title.trim()==='' || description.trim()==='') {
      return
    }
    const ip = await asyncStorage.getIp();
    let response = await fetch('http://'+ ip + '/inzeraty',{ method: 'POST',headers:{  
    "Content-Type": "multipart/form-data",
    "otherHeader": "foo",
    "token": data[3],
    } , body: body} )
    body = new FormData();
    setTitle('');
    setDescription('');
    if (response.status===200) {
      Alert.alert('Potvrdenie', 'Váš príspevok bol úspešne uverejnený.', [
        { text: 'OK' },
      ]);}
    else {
      
    }
  }

  return (
    <View style={{flex: 1}}>
      <Header/>
    <View style={styles.background}>
    <Text style={{fontSize: 30, marginVertical: 20}}>Nový príspevok</Text>
      <Text style={styles.title}>Názov</Text>
      <TextInput
          onChangeText={(title) => setTitle(title)}
          value={title}
          style={styles.input}
        />
      <Text style={styles.title}>Popis</Text>
      <TextInput
          onChangeText={(description) => setDescription(description)}
          value={description}
          style={styles.input}
        />
      <Text style={styles.title}>Súbory</Text>
      <View  style={styles.button_row}>
        <TouchableOpacity style={{marginHorizontal: 20}}>
          <Button
            style={styles.button}
            color='green'
            title="Pridať súbory"
            onPress={pickDocument}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{marginHorizontal: 20}}>
          <Button
            style={styles.button}
            title="Uverejniť"
            onPress={sendDocument}
          />
        </TouchableOpacity>
      </View>
    </View>
    <Footer/>
    </View>
  ); 
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
  },
  button: {
    marginHorizontal: 20,
  },
  button_row: {
    marginVertical: 25,
    flexDirection: 'row',
    flex: 1,
  },
  title: {
    fontSize: 20,
  },
  input: {
    width: '80%',
    height: 60,
    padding: 10,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: 'black',
    marginBottom: 20,
    marginTop: 10,
  },
});

