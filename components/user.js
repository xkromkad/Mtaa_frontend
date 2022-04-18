import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image,Button, TouchableHighlight, SafeAreaView, ScrollView,  TouchableOpacity, ActivityIndicator } from "react-native";
import Footer from "./nav/footer";
import Header from "./nav/header";
import Feed from "./feed";
import * as asyncStorage from './asyncStorage'
import { useNavigation } from '@react-navigation/native';
import base64 from 'base-64';

export default function User()  {
    const navigation = useNavigation(); 
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const [image, setImage] = useState([]);
    const [feed, setFeed] = useState([]);
    
    async function logOut() {
        await asyncStorage.storeData('', '', '', '');
        navigation.navigate('Login')
    }

    const getUser = async () => {
        try {
        let email = await asyncStorage.getData();
        email = email[2];
         const response = await fetch('http://192.168.0.143:8000/pouzivatelia/'+email);
         const json = await response.json();
         setData(json);
         let img = json.file;
         setImage(img)
         let id = await asyncStorage.getData();
         id = id[4];
         const res = await fetch('http://192.168.0.143:8000/inzeraty/pouzivatelia/'+id);
         const js =await  res.json()
         setFeed(js)
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
            <Feed style={{width: 200}} key={item.id} title={item.title} description={item.description} name={item.name} surname={item.surname} id={item.id} uid={item.uid}/>
          )
        }) }
        else {
            return(
                <Text>Neexistujú žiadne príspevky</Text>
            )
        }
    }

    
        return(
        <View style={{flex: 1}}>
            <Header/>
                <ScrollView>
                    <View style={styles.container}>
                    {isLoading ? <ActivityIndicator/> : (
                        <View style={styles.container}>
                        <View style={styles.profile}>
                        <TouchableOpacity onPress={() => console.log('hi')}>
                        <Image
                            source={{uri: `data:image/png;base64,${image}`}}
                            resizeMode="contain"
                            style={{width: 180, height: 180}}/>
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
                        {isLoading ? <ActivityIndicator/> : (feedList()) }
                    </View>
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
        borderRadius: 20,
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
    }
})