import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, TextInput, Button } from "react-native";
import Footer from "./nav/footer";
import Header from "./nav/header";

export default function Add() {
    return(
        <View style={{flex: 1}}>
            <Header/>
            <View style={styles.container}>
                <Text style={styles.title}>
                    Názov
                </Text>
                <TextInput style={styles.input}/>
                <Text style={styles.title}>
                    Popis
                </Text>
                <TextInput style={styles.input}/>
                <View style={styles.row}>
                    <Button title="Uverejniť"/>
                    <TouchableOpacity>
                        <Image source={require("doucma/assets/images/bin.png")}
                        resizeMode="contain"
                        style={styles.button}/>
                    </TouchableOpacity>
                </View>
            </View>
            <Footer/>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        fontSize: 30,
        marginVertical: 15
    },
    container: {
        flex: 1,
        alignItems: 'center',
        marginHorizontal: 5
    },
    input: {
        width: '80%',
        height: 60,
        padding: 10,
        borderWidth: 1,
        borderRadius: 50,
        borderColor: 'black',
        marginBottom: 20,
      },
      button: {
        marginHorizontal: 20,
      },
      row: {
        flexDirection: "row",
        justifyContent: 'center',
      }
})