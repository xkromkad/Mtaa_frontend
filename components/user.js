import React,{ Component } from "react";
import { StyleSheet, Text, View, Image,Button, TouchableHighlight, SafeAreaView, ScrollView,  TouchableOpacity } from "react-native";
import Footer from "./nav/footer";
import Header from "./nav/header";
import Feed from "./feed";

export default class User extends Component  {
    constructor(props) {
        super(props);
        
     
      }
    render() {
        return(
        <View style={{flex: 1}}>
            <Header/>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.profile}>
                            <Image
                                source={require("doucma/assets/tmp/profile.png")}
                                resizeMode="contain"
                                style={{width: '100%'}}/>
                        </View>
                        <Text style={styles.name}>Meno priezvisko</Text>
                        <View style={styles.iconRow}>
                            <TouchableOpacity>
                                <Image 
                                    source={require("doucma/assets/images/chat.png")}
                                    resizeMode="contain"
                                    style={styles.icon}/>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image 
                                    source={require("doucma/assets/images/call.png")}
                                    resizeMode="contain"
                                    style={styles.icon}/>
                            </TouchableOpacity>
                          
                        </View>
                        <Text style={styles.name}>Príspevky</Text>
                        <Feed/>
                        <Feed/>
                        <Feed/>
                        <Button
                        title={'Odhlásenie'}
                        style={styles.butt}
                        onPress={() => this.props.navigation.navigate('Login')}
                        />
       
                    </View>
                </ScrollView>
            <Footer/> 
        </View>
    )
} }

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