import * as React from "react";
import { StyleSheet, View, Image, Text, Button, TouchableOpacity, ScrollView, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';


const Feed = (props) => {
    const navigation = useNavigation(); 
    let id = props.id;
    return(
        <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Detail', {itemId: id})}>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <Text numberOfLines={3} style={styles.description}>
                {props.description}
            </Text>
            <View style={styles.meta}>
                <Text style={styles.meta_desc}>
                    Počet súborov: 2
                </Text>
                <Text style={styles.meta_desc}>
                    Autor: {props.name} {props.surname}
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
