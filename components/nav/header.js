import React, { useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from "react-native";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import * as asyncStorage from '../asyncStorage';
import { useNavigation } from '@react-navigation/native';

function Header() {
    const [shouldShow, setShouldShow] = useState(true);
    const [searchInput, setSearchInput] = useState('');
    const [data, setData] = useState([]);
    const navigation = useNavigation(); 

    async function show () {
        if (searchInput.trim() === '') {
            setShouldShow(!shouldShow)
        }
        else {
            navigation.push('Search', {searchInput: searchInput})
        }
    }
    return(
        <SafeAreaView style={styles.header} edges={['top', 'left', 'right']}>
                <View style={styles.row}>
                    {shouldShow ? (<Text style={styles.title}>Doucma</Text>) : null}
                    <Image  source={require("doucma/assets/images/logo.png")}
                        resizeMode="contain"
                        style={styles.logo}/>
                    {shouldShow ? null : 
                    <TextInput 
                    style={styles.input}
                    value={searchInput}
                    onChangeText={(search) => setSearchInput(search)}></TextInput>}
                    <TouchableOpacity style={styles.icon} onPress={show}>
                        <Image source={require("doucma/assets/images/search.png")}
                            resizeMode="contain"
                            style={styles.search}/>
                    </TouchableOpacity>
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
    },
    input: {
        width: '50%',
        borderWidth: 2,
        borderRadius: 20,
        borderColor: 'black',
      }
})