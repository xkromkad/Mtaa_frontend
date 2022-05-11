import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, Image,Button, TouchableHighlight, SafeAreaView, ScrollView,  TouchableOpacity, ActivityIndicator } from "react-native";
import Footer from "./nav/footer";
import Header from "./nav/header";
import Feed from "./feed";
import * as asyncStorage from './asyncStorage'
import { useNavigation } from '@react-navigation/native';
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from 'expo-file-system';
import * as Network from 'expo-network';

export default function User()  {
    let body = new FormData();
    const navigation = useNavigation(); 
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const [image, setImage] = useState();
    const [feed, setFeed] = useState([]);
    const filename = FileSystem.documentDirectory + "profilovka";
    const filefeed = FileSystem.documentDirectory + "userfeed";
    const waitprofile = FileSystem.documentDirectory + "waitprofile";

    
    async function logOut() {
        await asyncStorage.storeData('', '', '', '');
        navigation.navigate('Login')
    }

    const getUser = async () => {
        try {
        let storageData = await asyncStorage.getData();
        setData({"name": storageData[0], "surname": storageData[1]});
        if (await (await Network.getNetworkStateAsync()).isInternetReachable) {
            const ip = await asyncStorage.getIp();
            let id = storageData[4];
            //profilova fotka
            const response = await fetch('http://'+ ip + '/pouzivatelia/'+id);
            const json = await response.json();
            let img = json.file;
            await FileSystem.writeAsStringAsync(filename, img, {encoding: FileSystem.EncodingType.Base64,})
            setImage(`data:image/png;base64,${img}`)
            // prispevky
            const res = await fetch('http://'+ ip + '/inzeraty/pouzivatelia/'+id);
            const js =await  res.json()
            setFeed(js)
            await FileSystem.writeAsStringAsync(filefeed, JSON.stringify(js))
        }
        else {
            const image = await FileSystem.readAsStringAsync(filename, {encoding: FileSystem.EncodingType.Base64,})
            setImage(`data:image/png;base64,${image}`)
            let feed = await FileSystem.readAsStringAsync(filefeed)
            feed = JSON.parse(feed)
            setFeed(feed)
        }
       } catch (error) {
         console.error(error);
       } finally {
        setLoading(false);
      }
     }
   
     useEffect(() => {
       getUser();
     }, []);

     function feedList() {
        
        if(feed.length > 0) {
        return feed.map((item) => {
          return (
            <Feed key={item.id} title={item.title} description={item.description} name={item.name} surname={item.surname} id={item.id} uid={item.uid}/>
          )
        }) }
        else {
            return(
                <Text>Neexistujú žiadne príspevky</Text>
            )
        }
    }

    async function pickDocument() {
        const ip = await asyncStorage.getIp();
        let result = await DocumentPicker.getDocumentAsync({});
        body.append("file", {uri: result.uri, name: "photo.png", type: "image/png"});
        console.log(body)
        if (await (await Network.getNetworkStateAsync()).isInternetReachable) {
            let id = await asyncStorage.getData();
            let response = await fetch('http://'+ ip + '/pouzivatelia/'+id[4],
            { method: 'POST',headers:{  
            "Content-Type": "multipart/form-data",
            "otherHeader": "foo",
            "token": id[3],
            } , body: body} )
            body = new FormData();
            if (response.status===200) {
                Alert.alert('Potvrdenie', 'Vaša profilová fotka je zmenená.', [
                { text: 'OK' },
                ]);
                navigation.push('User')
            }
            else {
                Alert.alert('Chyba', 'Vašu profilovú fotku sa nepodarilo zmeniť.', [
                    { text: 'OK' },
                ]);
            }
        } else {
            //nie je internet
            await FileSystem.writeAsStringAsync(waitprofile, result.uri)
            Alert.alert('Chyba internetu', 'Vaša profilová fotka bude zmenená po pripojení na internet', [
                { text: 'OK' },
            ]);
        }
       };

    
        return(
        <View style={{flex: 1}}>
            <Header/>
                <ScrollView>
                    <View style={styles.container}>
                        {isLoading ? <ActivityIndicator/> : (
                        <View style={styles.container}>
                            <View>
                                <TouchableOpacity onPress={pickDocument}>
                                    <Image
                                        source={{uri: image}}
                                        resizeMode="contain"
                                        style={[{width: 180, height: 180}, styles.profile]}/>
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.name}>{data.name} {data.surname}</Text>
                            <View style={styles.iconRow}>
                                <Button
                                    title={'Odhlásenie'}
                                    style={styles.butt}
                                    onPress={() => logOut()}
                                />
                            </View>
                        </View>
                        )}
                        <Text style={styles.name}>Príspevky</Text>
                            <View>
                            {isLoading ? <ActivityIndicator/> : (feedList()) }
                        </View>
                    </View>
                    <View style={{marginBottom: 50}}></View>
                </ScrollView>
            <Footer/> 
        </View>
        )
} 

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50,
    },
   
    profile: {
        marginVertical: 20,
        height: 170,
        width: 170,
        alignItems: 'center',
        justifyContent: 'center',  
        borderColor: 'black',
        borderWidth: 1,
    },
    name: {
        fontSize: 20,
        paddingBottom:30
    },
    iconRow: {
        width: '100%',
        flexDirection: "row",
        justifyContent: 'center',
        marginVertical: 15,
    },
    icon: {
        width: 50,
        marginHorizontal: 30,
    },
    butt:{
        paddingTop:20,
        position:"relative",
        alignItems: 'center',
        justifyContent: 'center',
    },
})