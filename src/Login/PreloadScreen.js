import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const PreloadScreen = ({ navigation }) => {
  // Simula um tempo de espera antes de navegar para a próxima tela
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Inicio'); // Navega para a próxima tela após 2 segundos
    }, 2000);

    // Limpando o timer ao desmontar o componente para evitar vazamentos de memória
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <LinearGradient
      colors={['#11D26E', '#10C2A2']}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image
          source={require('../Home/img/logo2.png')}
          style={styles.logo}
        />
        <ActivityIndicator size="large" color="white" />
        <Text style={styles.loadingText}>Carregando...</Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 350,
    height: 350,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 20,
  },
});

export default PreloadScreen;