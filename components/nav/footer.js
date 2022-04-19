import * as React from "react";
import { StyleSheet, View, Image, TouchableHighlight, SafeAreaView, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

function Footer() {
  const navigation = useNavigation(); 
   return (
    <SafeAreaView>
      <View style={styles.footer}>
        <View style={styles.row}>
          <TouchableOpacity underlayColor="white" style={styles.icon} onPress={() => navigation.push('Home')}>
            <Image
              source={require("doucma/assets/images/home.png")}
              resizeMode="contain"
              style={styles.button}>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Messages')}>
            <Image
              source={require("doucma/assets/images/message.png")}
              resizeMode="contain"
              style={styles.button}>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.navigate('Add')}>
            <Image
              source={require("doucma/assets/images/add.png")}
              resizeMode="contain"
              style={styles.button}>
            </Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon} onPress={() => navigation.push('User')}>
            <Image
              source={require("doucma/assets/images/user.png")}
              resizeMode="contain"
              style={styles.button}>
            </Image>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
   )
 }
 export default Footer;

 const styles = StyleSheet.create({
   footer: {
    backgroundColor: "rgba(123,248,165,1)",
    position: 'absolute',
    bottom: 0,
    width: '100%'
   },
   row: {
    width: '100%',
    flexDirection: "row",
    justifyContent: 'center',
    marginVertical: 10,
   },
   button: {
     width: 50,
     height: 50,
   },
   icon: {
    paddingHorizontal: '5%',
   }
 })