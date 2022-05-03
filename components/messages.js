import React, {useEffect} from "react";
import { StyleSheet, View, Image, TouchableHighlight, SafeAreaView, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Footer from "./nav/footer";
import Header from "./nav/header";
import * as asyncStorage from './asyncStorage'

export default function Messages() {

    const getFeed = async () => {
        try {
         const ip = await asyncStorage.getIp();

         var ws = new WebSocket('ws://'+ip+'/path');
         ws.onopen = () => {
            // connection opened
            ws.send('something');  // send a message
            console.log('sent')
          };

         let store = await asyncStorage.getData();
         let token = store[3];
         let userId = store[4];
         let response = await fetch('http://'+ip+'/spravy', {
               method: 'POST',
               headers: {
                 Accept: 'application/json',
                 'Content-Type': 'application/json',
                 'token': token,
               },
               body: JSON.stringify({"id": userId},),
             });
         const json = await response.json();
         setData(json);
       } catch (error) {
         console.error(error);
       }
     }
   
     useEffect(() => {
       getFeed();
     }, []);

    return(
        <View style={{flex: 1}}>
            <Header/>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.name}>Meno Priezviskooo</Text>
                        <TouchableOpacity>
                        <Image source={require("doucma/assets/images/call.png")}
                                    resizeMode="contain"
                                    style={styles.icon}/>
                        </TouchableOpacity>
                    </View>
                </View>
            <Footer/>
        </View>
    )
}

const styles = StyleSheet.create({
    name: {
        marginTop: 20,
        fontSize: 25,
        marginHorizontal: 20
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5
    },
    row: {
        flexDirection: "row",
        justifyContent: 'center',
    },
    icon: {
        width: 40
    }
})