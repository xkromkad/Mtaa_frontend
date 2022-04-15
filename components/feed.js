import * as React from "react";
import { StyleSheet, View, Image, Text, Button, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';


function Feed() {
    const navigation = useNavigation(); 
    return(
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Detail')}>
            <Text style={styles.title}>
                Nadpis
            </Text>
            <Text style={styles.description}>
                Opis toho, čo kto ponuka, čo kto doučuje a tak.
            </Text>
            <View style={styles.meta}>
                <Text style={styles.meta_desc}>
                    Počet súborov: 2
                </Text>
                <Text style={styles.meta_desc}>
                    Autor: Alenka
                </Text>
            </View>
        </TouchableOpacity>
    )
}

export default Feed;

const styles = StyleSheet.create({
    box: {
        borderWidth: 3,
        borderRadius: 20,
        margin: 10,
    },
    title: {
        fontSize: 30,
        margin: 10,
        fontWeight: 'bold'
    },
    description: {
        margin: 10,
        fontSize: 20,
    },
    meta: {
        marginTop: 20,
        marginBottom: 10
    },
    meta_desc: {
        fontSize: 17,
        marginHorizontal: 10
    }
  });
