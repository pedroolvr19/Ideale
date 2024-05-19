import React from "react";
import { View, Text, StyleSheet, Image, Button, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import auth from '@react-native-firebase/auth';
const PerfilScreen = () => {
  const nome = "João da Silvasdasdasa";
  const email = auth().currentUser.email;

  const handleLogout = () => {
    console.log("Usuario deslogado");
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
          source={require("../img/logo2.png")} // Substitua pelo caminho da imagem do paciente
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
          <Text style={styles.infoTitle}>CPF:</Text>
          <View style={styles.infoBox}>
            <Text style={styles.infoText}></Text>
          </View>
        </View>
        <View style={styles.logoutButtonContainer}>
          <Button
            title="Sair"
            onPress={handleLogout}
            color="#ff5c5c"
          />
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 70,
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
    fontSize: 16,
  },
  logoutButtonContainer: {
    marginTop: 20,
    width: "80%",
  },
});

export default PerfilScreen;