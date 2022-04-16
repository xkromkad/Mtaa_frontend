import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, Text, View } from 'react-native';
import Footer from "./nav/footer"
import Header from "./nav/header"
import Feed from "./feed";
import Register from './register';

export default function Home() {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getFeed = async () => {
     try {
      const response = await fetch('http://192.168.0.143:8000/inzeraty');
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
      <Text>Ahoj</Text>
      <View style={{ flex: 1, marginBottom: 70}}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <Feed title={item.title} description={item.description} name={item.name} surname={item.surname}/>
            )}
          />
        )}
        </View>
      <Footer/>
    </View>
  );
};