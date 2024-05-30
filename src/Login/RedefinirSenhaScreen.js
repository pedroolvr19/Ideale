import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const RedefinirSenhaScreen = () => {
  const [email, setEmail] = useState("");
  const navigation = useNavigation();

  const handlePasswordReset = () => {
    if (!email) {
      Alert.alert("Erro", "Por favor, insira um email válido.");
      return;
    }

    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        Alert.alert("Sucesso", "Um link para redefinir sua senha foi enviado para o seu email.");
        setEmail(""); // Limpa o campo de email
      })
      .catch(error => {
        Alert.alert("Erro", error.message);
      });
  };

  return (
    <LinearGradient
      colors={['#10C2A2', '#11D26E']}
      style={styles.container}
    >
      <View style={styles.container}>
        <Image source={require('../Home/img/logo2.png')} style={styles.image} />
        <Text style={[styles.footerLink, styles.title]}>Recuperar Senha</Text>
        <Text style={[styles.footerLink, styles.subtitle]}>Insira seu email para receber um link de redefinição de senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.buttonContainer} onPress={handlePasswordReset}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.backToLogin}>Voltar ao Login</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  image: {
    width: 500,
    height: 300,
    marginBottom: -10,
    marginTop: 110,
  },
  input: {
    width: 250,
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
    borderRadius: 15,
  },
  buttonContainer: {
    backgroundColor: "#1B3422",
    padding: 10,
    borderRadius: 20,
    height: 50,
    width: 120,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  footerLink: {
   color: '#fff',
      fontWeight: 'bold', // Adicione esta linha
      textAlign: 'center',
  },
  backToLogin: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    textDecorationLine: 'underline',
    marginTop: 20,
    marginBottom: 180,
  },
});

export default RedefinirSenhaScreen;