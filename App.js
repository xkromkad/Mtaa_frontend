import * as React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from "./components/home";
import Register from "./components/register";
import Login from "./components/login";
import User from "./components/user";
import Detail from "./components/detail";
import Add from "./components/add";
import Chat from "./components/chat";
import Messages from "./components/messages";
import Search from "./components/searchList";

const Stack = createNativeStackNavigator();

export default function App(props) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false}} initialRouteName="Register">
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="Register" component={Register}/>
        <Stack.Screen name="Login" component={Login}/>
        <Stack.Screen name="User" component={User}/>
        <Stack.Screen name="Detail" component={Detail}/>
        <Stack.Screen name="Add" component={Add}/>
        <Stack.Screen name="Chat" component={Chat}/>
        <Stack.Screen name="Messages" component={Messages}/>
        <Stack.Screen name="Search" component={Search}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}