import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View, Image, TouchableHighlight, SafeAreaView, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Header from "./nav/header";
import Footer from "./nav/footer";

export default function Detail({ route }) {
    const { itemId } = route.params;
    const navigation = useNavigation(); 
    
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [file, setFile] = useState([]);

  const getDetails = async () => {
     try {
      const response = await fetch('http://192.168.0.143:8000/inzeraty/'+itemId);
      const json = await response.json();
      setData(JSON.parse(json.data));
      setFile(JSON.parse(json.file_arr));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
/*
  const listItems = async () => file.file_arr.map((item) =>
    <View>
        <Text style={styles.fileName} key={item}>{item}</Text>
        <Image source={require("doucma/assets/images/file.png")}
            resizeMode="contain"
            style={styles.icon}/>
    </View>
);
*/
  useEffect(() => {
    getDetails();
    }, []);

    function fileList() {
        if(file.file_arr.length > 0) {
        return file.file_arr.map((item) => {
          return (
            <View  key={item}>
            <Text style={styles.fileName}>{item}</Text>
            <Image source={require("doucma/assets/images/file.png")}
                resizeMode="contain"
                style={styles.icon}/>
             </View>
          )
        }) }
        else {
            return(
                <Text>Neexistujú žiadne súbory</Text>
            )
        }
    }


    return(
        <View style={{flex: 1}}>
            <Header/>
                <ScrollView>
                    <View style={styles.container}>
                        <View style={styles.descriptionCont}>
                            <Text style={styles.title}>{data.title}</Text>
                            <Text style={styles.description}>
                                {data.description}
                            </Text>
                        </View>
                        <View>
                            <Text style={styles.title}>Súbory</Text> 
                            {isLoading ? <ActivityIndicator/> : (
                            <TouchableOpacity style={styles.fileRow}>
                                {fileList()}
                                </TouchableOpacity>
                            )}
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