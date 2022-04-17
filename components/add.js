import React, { useState, Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
} from "react-native";
import * as DocumentPicker from "expo-document-picker";
import Header from "./nav/header";
import Footer from "./nav/footer";
import * as asyncStorage from './asyncStorage';

export default function UploadFile() {
  let body = new FormData();
  const [title, setTitle] = React.useState();

  async function pickDocument() {
    let result = await DocumentPicker.getDocumentAsync({});
    console.log(result.uri);
    console.log(result);
    
    body.append('file', {uri: result.uri,name: 'photo.png', type: 'image/png'});
    body.append('title', 'Fyzika');
    body.append('description', 'vektory');
   };

   async function sendDocument() {
    let data = await asyncStorage.getData()
    fetch('http://192.168.0.143:8000/inzeraty',{ method: 'POST',headers:{  
    "Content-Type": "multipart/form-data",
    "otherHeader": "foo",
    "token": data[3],
    } , body: body} )
    console.log(title)
  }

  return (
    <View style={{flex: 1}}>
      <Header/>
    <View style={styles.background}>
      <Text style={styles.title}>Názov</Text>
      <View style={styles.button}>
        <TouchableOpacity>
          <Button
            title="upload your file"
            color="black"
            onPress={pickDocument}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Button
            title="send"
            color="black"
            onPress={sendDocument}
          />
        </TouchableOpacity>
        <TextInput
        onChangeText={(title) => setTitle(title)}
        value={title}
      />
      <Text>{title}</Text>
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
    marginHorizontal: 60,
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

