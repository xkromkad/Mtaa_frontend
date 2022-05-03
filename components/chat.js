import React,  {useEffect } from "react";
import { StyleSheet, View, Image, TouchableHighlight, SafeAreaView, TouchableOpacity, Text } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Footer from "./nav/footer";
import Header from "./nav/header";


export default function Chat() {

    return(
        <View style={{flex: 1}}>
            <Header/>
                <View style={styles.container}>
                    <View style={styles.row}>
                        <Text style={styles.name}>Meno Priezvisko</Text>
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