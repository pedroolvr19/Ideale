import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import auth from '@react-native-firebase/auth';

const CadastroScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCriarConta = () => {
    if (!email || !senha || !confirmarSenha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Erro', 'As senhas não coincidem. Por favor, tente novamente.');
      return;
    }
   {
      if(!email && !senha) return;
      auth()
          .createUserWithEmailAndPassword(email, senha,confirmarSenha)
          .then(() => {
              console.log("Usuário criado");
          })
          .catch((error) => {
              if (error.code === 'auth/email-already-in-use') {
                  throw new Error('Este email não pode ser usado!');
              }
              if (error.code === 'auth/invalid-email') {
                  throw new Error('Email invalido...')
              }
          })
  }
    navigation.navigate('Login');
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
      <Text style={styles.title}>Criar Conta</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Senha"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />
      <TouchableOpacity style={styles.button} onPress={handleCriarConta}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.footerLink}>Já tem uma conta? Faça login</Text>
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
   
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },
  input: {
    width: 300,
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  button: {
    backgroundColor: '#17322D',
    padding: 15,
    borderRadius: 20,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logo: {
    width: 460,
    height: 300,
    marginBottom: 10,
  },
  footerLink: {
    color: '#fff',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});

export default CadastroScreen;