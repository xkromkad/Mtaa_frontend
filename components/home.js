import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native';
import Footer from "./nav/footer"
import Header from "./nav/header"
import Feed from "./feed";
import Register from './register';
import * as asyncStorage from './asyncStorage'
import {ip} from './ip';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getFeed = async () => {
     try {
      const response = await fetch('http://'+ ip + '/inzeraty');
      const json = await response.json();
      setData(json);
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