import React, { useState, useEffect } from "react";

import socketio from "socket.io-client";
import { View, SafeAreaView, Text, Image, Alert, StyleSheet, AsyncStorage, ScrollView } from "react-native";

import logo from "../assets/logo.png";
import SpotList from "../components/SpotList";

export default function List() {
  const [techs, setTechs] = useState([]);

  useEffect(() => {
  AsyncStorage.getItem('user').then(user_id =>{
    const socket = socketio('http://192.168.0.15:3333', {
      query: {user_id}
    })
    socket.on('booking_response', booking =>{
      Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`);
    })
  })    
  }, []);
  useEffect(() => {
      AsyncStorage.getItem('techs').then(storagedTechs =>{
        const techsArray = storagedTechs.split(',').map(tech => tech.trim());

        setTechs(techsArray);
      })    
  }, []);

  return (
    <SafeAreaView style={styles.container}>     
      <Image style={styles.logo} source={logo}></Image>
      <ScrollView>
      {techs.map(tech => <SpotList key={tech} tech={tech}></SpotList>)}
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  logo: {
    height: 40,
    resizeMode: "contain",
    alignSelf: "center",
    marginTop: 50
  }
});
