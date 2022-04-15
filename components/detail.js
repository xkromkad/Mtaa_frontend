import React from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Header from "./nav/header";
import Footer from "./nav/footer";

export default function Detail() {
    const navigation = useNavigation(); 
    return(
        <View style={{flex: 1}}>
            <Header/>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.descriptionCont}>
                            <Text style={styles.title}>Názov</Text>
                            <Text style={styles.description}>
                                Ponúkam doučovanie matematiky a informatiky. V prílohe prikladám aj dokumenty.
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.title}>Súbory</Text>
                            <TouchableOpacity style={styles.fileRow}>
                                <Text style={styles.fileName}>Základy programovanie.pdf</Text>
                                <Image source={require("doucma/assets/images/file.png")}
                                    resizeMode="contain"
                                    style={styles.icon}/>
                            </TouchableOpacity>
                        </View>
                        <TouchableOpacity style={styles.contact}  onPress={() => navigation.navigate('Chat')}>
                            <Text style={styles.title}>Reagovať</Text>
                            <Image source={require("doucma/assets/images/chat.png")}
                                    resizeMode="contain"
                                    style={styles.chat}/>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            <Footer/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
    },
    title: {
        marginHorizontal: 15,
        marginVertical: 20,
        fontSize: 30,
    },
    descriptionCont: {
        marginTop: 20,
        borderColor: 'green',
        borderWidth: 1,
        borderRadius: 20,
    },
    description: {
        fontSize: 20,
        margin: 15,
    },
    fileRow: {
        flexDirection: "row",
        marginHorizontal: 15,
    },
    fileName: {
        flex: 0.6,
        fontSize: 15,
    },
    icon: {
        flex: 0.4,
        height: 30,
    },
    contact: {
        margin: 20,
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
    },
    chat: {
        width: 50,
    }
})