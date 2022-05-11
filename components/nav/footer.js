import * as React from "react";
import { StyleSheet, View, Image, TouchableHighlight, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as Network from 'expo-network';
import * as asyncStorage from '../asyncStorage'

export default function Footer() {
  const waitprofile = FileSystem.documentDirectory + "waitprofile";
  const waitfeed = FileSystem.documentDirectory + "waitfeed";
  const toDelete = FileSystem.documentDirectory + "toDelete";

  async function backOnline() {
    if (await (await Network.getNetworkStateAsync()).isInternetReachable) {
      let profileToSet
      let feedToAdd
      let deleteArray
      if ((await FileSystem.getInfoAsync(waitprofile)).exists) {
        profileToSet = await FileSystem.readAsStringAsync(waitprofile)
      }
      if ((await FileSystem.getInfoAsync(waitfeed)).exists) {
        feedToAdd = await FileSystem.readAsStringAsync(waitfeed)
      }
      if ((await FileSystem.getInfoAsync(toDelete)).exists) {
        deleteArray = await FileSystem.readAsStringAsync(toDelete)
      }
      if (profileToSet !== undefined) {
        let body = new FormData()
        body.append("file", {uri: profileToSet, name: "photo.png", type: "image/png"})
        console.log(profileToSet)
        let id = await asyncStorage.getData();
        const ip = await asyncStorage.getIp();
        let response = await fetch('http://'+ ip + '/pouzivatelia/'+id[4],
        { method: 'POST',headers:{  
        "Content-Type": "multipart/form-data",
        "otherHeader": "foo",
        "token": id[3],
        } , body: body} )
        FileSystem.deleteAsync(waitprofile)
      }
      if (feedToAdd !== undefined) {
        let body = new FormData()
        let feed = JSON.parse(feedToAdd)
        let data = await asyncStorage.getData();
        const ip = await asyncStorage.getIp();
        for (let i = 0; i < feed.length; i++) {
          body.append("title", feed[i].title)
          body.append("description", feed[i].description)
          console.log(feed[i].file)
          let response = await fetch('http://'+ ip + '/inzeraty',{ method: 'POST',headers:{  
          "Content-Type": "multipart/form-data",
          "otherHeader": "foo",
          "token": data[3],
          } , body: body} )
          body = new FormData()
          };

        FileSystem.deleteAsync(waitfeed)
      }
      if (toDelete!== undefined) {
        const ip = await asyncStorage.getIp();
        let token = await asyncStorage.getData();
        token = token[3];
        deleteArray = JSON.parse(deleteArray)
        for (let i = 0; i < deleteArray.length; i++) {
          let res = await fetch('http://'+ip+'/inzeraty/'+deleteArray[i], {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'token': token,
            },
            });
        }
        FileSystem.deleteAsync(toDelete)
      }
    }
  }

  const navigation = useNavigation(); 
   return (
    <SafeAreaView>
      <View style={styles.footer}>
        <View style={styles.row}>
          <TouchableOpacity underlayColor="white" style={styles.icon} onPress={() => [navigation.push('Home'), backOnline()]}>
            <Image
              source={require("doucma/assets/images/home.png")}
              resizeMode="contain"
              style={styles.button}>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => [navigation.push('Messages'), backOnline()]}>
            <Image
              source={require("doucma/assets/images/message.png")}
              resizeMode="contain"
              style={styles.button}>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => [navigation.navigate('Add'), backOnline()]}>
            <Image
              source={require("doucma/assets/images/add.png")}
              resizeMode="contain"
              style={styles.button}>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => [navigation.push('User'), backOnline()]}>
            <Image
              source={require("doucma/assets/images/user.png")}
              resizeMode="contain"
              style={styles.button}>
            </Image>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
   )
 }

 const styles = StyleSheet.create({
   footer: {
    backgroundColor: "rgba(123,248,165,1)",
    position: 'absolute',
    bottom: 0,
    width: '100%'
   },
   row: {
    width: '100%',
    flexDirection: "row",
    justifyContent: 'center',
    marginVertical: 10,
   },
   button: {
     width: 50,
     height: 50,
   },
   icon: {
    paddingHorizontal: '5%',
   }
 })