import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import auth from "@react-native-firebase/auth";
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isChecked, setIsChecked] = useState(false); // Estado para verificar se os termos foram aceitos

  const handleLogin = async () => {
    if (!isChecked) {
      Alert.alert("Erro", "Por favor, aceite os termos para fazer login.");
      return;
    }

    if (!email || !senha) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, senha)
      .then(() => {
        console.log("Entrou com sucesso");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          console.log("Credenciais inválidas");
          Alert.alert(
            "Erro",
            "Credenciais inválidas"
          );
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
          Alert.alert(
            "Erro",
            "Email não reconhecido. Por favor, verifique o email e tente novamente."
          );
        }

        console.error(error);
      });
  };

  const handleOpenTermsModal = () => {
    setShowTermsModal(true);
  };

  const handleCloseTermsModal = () => {
    setShowTermsModal(false);
  };

  const handleEsqueciSenha = () => {
    navigation.navigate("RedefinirSenha");
  };

  const handleCheckboxPress = () => {
    setIsChecked(!isChecked);
  };

  return (
    <LinearGradient colors={["#10C2A2", "#11D26E"]} style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../Home/img/logo2.png")} style={styles.logo} />

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
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={handleCheckboxPress}>
            <View
              style={[styles.checkbox, isChecked ? styles.checked : null]}
            />
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Aceito os termos</Text>
        </View>
        <TouchableOpacity onPress={handleOpenTermsModal}>
          <Text style={styles.openTermsButton}>Ver Termos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={!isChecked}
        >
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEsqueciSenha}>
          <Text style={styles.footerLink}>Esqueci minha senha</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showTermsModal}
          onRequestClose={handleCloseTermsModal}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>Termos e Condições</Text>
              <Text style={styles.modalText}>
                A Lei Geral de Proteção de Dados (LGPD) exige que o aplicativo
                solicite o consentimento do usuário para coletar, armazenar e
                processar seus dados pessoais. Isso inclui informar claramente
                como os dados serão usados, quem terá acesso a eles e como o
                usuário pode exercer seus direitos de privacidade, como acessar,
                corrigir ou excluir seus dados. O aplicativo também deve
                garantir medidas de segurança para proteger esses dados contra
                acessos não autorizados ou vazamentos. Ao aceitar os termos da
                LGPD, o usuário está concordando com essas práticas de proteção
                de dados.{" "}
              </Text>
              <TouchableOpacity onPress={handleCloseTermsModal}>
                <Text style={styles.acceptButton}>Aceitar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 30,
    color: "#fff",
    textShadowColor: "#000",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
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
  button: {
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
  logo: {
    width: 500,
    height: 300,
    marginBottom: 0,
    marginTop: -70,
  },
  openTermsButton: {
    color: "#fff",
    textDecorationLine: "underline",
    fontWeight: "bold",
    marginTop: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
  acceptButton: {
    fontSize: 18,
    color: "#17322D",
    textAlign: "center",
  },
  footerLink: {
    color: "#102114",
    textDecorationLine: "underline",
    marginTop: 25,
    fontSize: 18,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#fff",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#17322D",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});
