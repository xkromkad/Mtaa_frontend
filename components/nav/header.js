import React from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight, SafeAreaView } from "react-native";

function Header() {
    return(
        <SafeAreaView>
            <View style={styles.header}>
                <View style={styles.row}>
                    <Text style={styles.title}>Doucma</Text>
                    <Image  source={require("doucma/assets/images/logo.png")}
                        resizeMode="contain"
                        style={styles.logo}/>
                    <TouchableHighlight style={styles.icon}>
                        <Image source={require("doucma/assets/images/search.png")}
                            resizeMode="contain"
                            style={styles.search}/>
                    </TouchableHighlight>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Header;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        backgroundColor: "rgba(123,248,165,1)",
    },
    row: {
        width: '100%',
        marginTop: 40,
        marginHorizontal: 15,
        marginVertical: 15,
        flexDirection: "row",
    },
    title: {
        fontSize: 35,
    },
    logo: {
        width: 40,
        height: 40,
        marginHorizontal: 10
    },
    search: {
        width: 40,
        height: 40,
    },
    icon: {
        position: 'absolute',
        right: 0,
        marginRight: 50
    }
})