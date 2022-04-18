import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image,Button, TouchableHighlight, SafeAreaView, ScrollView,  TouchableOpacity, ActivityIndicator } from "react-native";
import Footer from "./nav/footer";
import Header from "./nav/header";
import Feed from "./feed";
import * as asyncStorage from './asyncStorage'
import { useNavigation } from '@react-navigation/native';

export default function User()  {
    const navigation = useNavigation(); 
    const [data, setData] = React.useState();
    const [isLoading, setLoading] = React.useState(true);
    const [image, setImage] = useState([]);
    
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
         let img = 'data:image/png;base64,'+json.file;
         setImage(img)
         console.log(image)
       } catch (error) {
         console.error(error);
       } finally {
        setLoading(false);
      }
     }
   
     useEffect(() => {
       getUser();
     }, []);

    
        return(
        <View style={{flex: 1}}>
            <Header/>
                <ScrollView>
                    <View style={styles.container}>
                    {isLoading ? <ActivityIndicator/> : (
                        <View style={styles.container}>
                        <View style={styles.profile}>
                        <Image
                            source={{uri: image}}
                            resizeMode="contain"
                            style={{width: '100%'}}/>
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
                    
                        <Feed/>
                        <Feed/>
                        <Feed/>
       
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