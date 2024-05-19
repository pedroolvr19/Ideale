import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const InicioScreen = ({ navigation }) => {
  const handleLoginPress = () => {
    navigation.navigate('Login');
  };

  const handleCadastroPress = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <LinearGradient
    colors={['#10C2A2', '#11D26E']}
    style={styles.container}
  >
    <View style={styles.container}>
      <Image
        source={require('../Home/img/logo2.png')}
        style={styles.logo}
      />
      <Text style={styles.title}>Bem-vindo ao IdealeCare</Text>
      <TouchableOpacity style={styles.button} onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Fazer Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleCadastroPress}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
   
    padding: 0,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 50,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  button: {
    backgroundColor: '#E9E9E9',
    padding: 20,
    borderRadius: 20,
    width: 320,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    
  },
  buttonText: {
    color: '#235239',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logo: {
    width: 450,
    height: 250,
    marginTop: -70, 
  },
});

export default InicioScreen;