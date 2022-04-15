import * as React from "react";
import { StyleSheet, View, Image, Text, Button, TouchableHighlight, ScrollView, SafeAreaView } from "react-native";
import Footer from "./nav/footer"
import Header from "./nav/header"
import Feed from "./feed";


function Home() {
    return(
        <View style={{flex: 1}}>
            <Header/>
            <ScrollView>
                <Feed/>
                <Feed/>
                <Feed/>
                <Feed/>
            </ScrollView>
            <Footer/>
        </View>
    )
}

export default Home;