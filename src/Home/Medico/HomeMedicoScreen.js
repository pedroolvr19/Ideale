import React from 'react';

import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import auth from "@react-native-firebase/auth";

function HomeMedicoScreen({ navigation }) {
  return (
    <ImageBackground
      source={require('../img/background.png')}
      style={styles.container}
    >
      <View style={styles.containerPrincipal}>
        <Image
          source={require('../img/logo2.png')}
          style={styles.image}
        />
        <View style={styles.buttonContainer}>
          {
            auth().currentUser?.email === "gestor@ideale.com" && (
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('BoletimGestor')}
                
              >
                <Ionicons name="book" size={76} color="#308168" />
                <Text style={styles.buttonText}>Boletim Diário</Text>

              </TouchableOpacity>

            )
          }
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Agenda')}
            options={{ headerShown: false }} // Navegue para AgendamentoPacienteScreen
          >
            <Ionicons name="calendar" size={76} color="#308168" />
            <Text style={styles.buttonText}>Agendamentos</Text>

          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  containerPrincipal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 300,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%', // Ajustado para 90% da largura da tela para evitar problemas de layout
    marginTop: 10,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%', // Largura ajustada para ocupar 45% da largura da tela (50% para deixar espaço entre os botões)
    aspectRatio: 1, // Mantém a proporção quadrada
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 250,
  },
  buttonText: {
    color: '#3D5945',
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  buttonSubtext: {
    color: '#308168',
    fontSize: 18,
    marginTop: 5,
    fontWeight: '400',
  },
});
export default HomeMedicoScreen;