import React,{useState,useEffect} from "react";
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, Button, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import Header from "./nav/header";
import Footer from "./nav/footer";
import * as asyncStorage from './asyncStorage'
import * as FileSystem from 'expo-file-system';
import * as Network from 'expo-network';

export default function Detail({ route }) {
    const { itemId } = route.params;
    const { userId } = route.params
    const navigation = useNavigation(); 
    
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [file, setFile] = useState([]);
    const [image, setImage] = useState([]);
    const [uid, setUid] = useState([]);
    const offlineDetails = FileSystem.documentDirectory + "offlineDetails";
    const toDelete = FileSystem.documentDirectory + "toDelete";

  const getDetails = async () => {
     try {
        if (await (await Network.getNetworkStateAsync()).isInternetReachable) {
            const ip = await asyncStorage.getIp();
            const response = await fetch('http://'+ip+'/inzeraty/'+itemId);
            const json = await response.json();
            let userId = await asyncStorage.getData();
            userId = userId[4];
            setUid(userId)
            setData(JSON.parse(json.data));
            setFile(JSON.parse(json.file_arr));
           
            let detailArray

            if (!(await (FileSystem.getInfoAsync(offlineDetails))).exists) {
                detailArray = []
              }
            else {
                detailArray = await FileSystem.readAsStringAsync(offlineDetails)
                detailArray = await JSON.parse(detailArray)
              }
            for (let i = 0; i < detailArray.length; i++) {
                if (JSON.parse(detailArray[i].data).id === JSON.parse(json.data).id) {
                    return
                }
            }
            detailArray.push(json)
            await FileSystem.writeAsStringAsync(offlineDetails, JSON.stringify(detailArray))
        }
        else {
            //bez internetu
            let savedDetails = await FileSystem.readAsStringAsync(offlineDetails)
            savedDetails = await JSON.parse(savedDetails)
            for (let i = 0; i < savedDetails.length; i++) {
                if (JSON.parse(savedDetails[i].data).id === itemId) {
                    setData(JSON.parse(savedDetails[i].data));
                    setFile(JSON.parse(savedDetails[i].file_arr));
                    let userId = await asyncStorage.getData();
                    userId = userId[4];
                    setUid(userId)
                }
            }
        }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDetails();
    }, []);

    function fileList() {
        if(!isLoading && file.file_arr !== undefined) {
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
    }

    async function getFile() {
        try {
            if (await (await Network.getNetworkStateAsync()).isInternetReachable) {
                const ip = await asyncStorage.getIp();
                let res = await fetch('http://'+ip+'/subor/'+itemId, {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                    },
                    });
                let json = await res.json();
                let img = 'data:image/png;base64,'+json.file;
                setImage(img)
            } else {
                //bez internetu
            }
            }catch(e) {
                console.log(e)
            }
    }

    async function deleteFeed() {
        try {
            if (await (await Network.getNetworkStateAsync()).isInternetReachable) {
                const ip = await asyncStorage.getIp();
                let token = await asyncStorage.getData();
                token = token[3];
                let res = await fetch('http://'+ip+'/inzeraty/'+itemId, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'token': token,
                    },
                    });
                    navigation.push('User')
                } else {
                    //bez internetu
                    let deleteArray

                    if (!(await (FileSystem.getInfoAsync(toDelete))).exists) {
                        deleteArray = []
                      }
                    else {
                        deleteArray = await FileSystem.readAsStringAsync(toDelete)
                        deleteArray = await JSON.parse(deleteArray)
                      }
                    for (let i = 0; i < deleteArray.length; i++) {
                        if (deleteArray[i] === itemId) {
                            return
                        }
                    }
                    deleteArray.push(itemId)
                    await FileSystem.writeAsStringAsync(toDelete, JSON.stringify(deleteArray))

                    Alert.alert('Pozor', 'Príspevok bude odstránený po pripojení na internet.', [
                        { text: 'OK' },
                      ])
                }
            }catch(e) {
                console.log(e)
            }
    }

    async function createChat() {
        try {
        if (await (await Network.getNetworkStateAsync()).isInternetReachable) {
            const ip = await asyncStorage.getIp();
            let token = await asyncStorage.getData();
                token = token[3];
                let res = await fetch('http://'+ip+'/vytvorchat', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'token': token,
                    },
                    body: JSON.stringify({"author": userId, 'user': uid},),
                    });
                    if (res.status===200) {
                        navigation.push('Chat')
                    }
                } else {
                    //bez internetu
                }
            }catch(e) {
                console.log(e)
            }
    } 

    function edit() {
        if (userId === uid) {
            return(
            <View style={{flexDirection: 'row', flex: 1}}>
            <Button
                title={'Upraviť'}
                style={styles.butt}
            />
            <Button
                title={'Odstrániť'}
                style={styles.butt}
                onPress={deleteFeed}
            />
            </View>)
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
                            <TouchableOpacity style={styles.fileRow} onPress={getFile}>
                                {fileList()}
                                </TouchableOpacity>
                            )}
                        </View>
                        {edit()}
                        <TouchableOpacity style={styles.contact}  onPress={createChat}>
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
    },
    butt:{
        marginHorizontal: 20,
        paddingTop:20,
        position:"relative",
        alignItems: 'center',
        justifyContent: 'center',
    }
})