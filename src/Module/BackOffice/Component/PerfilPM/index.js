import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const PerfilPM = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [numeroPaciente, setNumeroContato] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      const currentUser = auth().currentUser;
      if (currentUser) {
        setEmail(currentUser.email);
        const userId = currentUser.uid;
        const userDoc = await firestore().collection('Paciente').doc(userId).get();
        if (userDoc.exists) {
          const userData = userDoc.data();
          setNome(userData.nome);
          setNumeroContato(userData.numeroPaciente);
        } else {
          console.log('Documento do usuário não encontrado.');
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    console.log("Usuário deslogado");
    auth()
      .signOut()
      .then(() => {
        Alert.alert("Logout", "Você saiu da conta com sucesso.");
        // Navegar para a tela de login, se necessário
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
        <Image
          source={require("../PerfilPM/perfil.png")} // Substitua pelo caminho da imagem do paciente
          style={styles.profileImage}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Nome:</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>{nome}</Text>
          </View>
          <Text style={styles.infoTitle}>E-mail:</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>{email}</Text>
          </View>
          <Text style={styles.infoTitle}>Número de Contato:</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>{numeroPaciente}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 50,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  infoContainer: {
    width: "80%",
  },
  infoBox: {
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    height: 45,
    alignContent: "center",
    marginTop: 5,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
    marginLeft: 10,
  },
  infoText: {
    color: '#17322D',
    fontWeight: 'bold',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#17322D',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: 200,
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default PerfilPM;