import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Header from "./nav/header";
import Footer from "./nav/footer";

export default function Detail() {
    const navigation = useNavigation(); 
    
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

  /*const getDetails = async () => { // este token treba dat do headeru a potom upravit view
     try {
      const response = await fetch('http://192.168.0.143:8000/inzeraty/1',
      { method: 'GET',
        headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },});
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDetails();
    }, []);

   */
    
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