import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
const NosConhecaScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Image
          source={require('../Home/img/sobrenos1.png')}
          style={styles.image} // Ajuste a altura conforme necessário
        />
        <Image
          source={require('../Home/img/sobrenos2.png')}
          style={styles.image} // Ajuste a altura conforme necessário
        />
        <Image
          source={require('../Home/img/sobrenos3.png')}
          style={styles.image} // Ajuste a altura conforme necessário
        />
        <Image
          source={require('../Home/img/sobrenos4.png')}
          style={styles.image} // Ajuste a altura conforme necessário
        />
       
       
      
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: '#17322D', // Define o fundo como preto
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  image: {
    width: '99%',
    height: 700, // Ajuste a altura conforme necessário
  },
});

export default NosConhecaScreen;