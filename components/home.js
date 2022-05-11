import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native';
import Footer from "./nav/footer"
import Header from "./nav/header"
import Feed from "./feed";
import Register from './register';
import * as asyncStorage from './asyncStorage'
import * as Network from 'expo-network';
import * as FileSystem from 'expo-file-system';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const filename = FileSystem.documentDirectory + "feed";

  const getFeed = async () => {
     try {
      if (await (await Network.getNetworkStateAsync()).isInternetReachable) {
        const ip = await asyncStorage.getIp();
        const response = await fetch('http://'+ip+'/inzeraty');
        const json = await response.json();
        await FileSystem.writeAsStringAsync(filename, JSON.stringify(json))
        setData(json);
      }
      else {
        let feed = await FileSystem.readAsStringAsync(filename)
        feed = JSON.parse(feed)
        setData(feed);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFeed();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Header/>
      <View style={{ flex: 1, marginBottom: 70}}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Feed title={item.title} description={item.description} name={item.name} surname={item.surname} id={item.id} uid={item.uid}/>
            )}
          />
        )}
        </View>
      <Footer/>
    </View>
  );
};