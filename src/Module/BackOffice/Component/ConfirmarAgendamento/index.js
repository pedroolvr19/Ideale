import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import messaging from '@react-native-firebase/messaging';
import { buscarPacientePeloEmail } from "../../service/buscarPacientePeloEmail";
import { AgendarConsulta } from "../../service/AgendarConsulta";

const ConfirmarAgendamento = () => {
  const [pacienteNome, setPacienteNome] = useState("");
  const [email, setEmail] = useState("");
  const [emailMedico, setEmailMedico] = useState("");
  const [message, setMessage] = useState("");
  const [dataConsulta, setDataConsulta] = useState("");

  const completarCampos = async (email) => {
    if(email.endsWith("@gmail.com")) {
      const data = await buscarPacientePeloEmail({ pacienteEmail: email });
      const userName = data.docs[0].data().nome
      setPacienteNome(userName)
    }
  }

  const handleSendConfirmation = async () => {
    console.log(!pacienteNome, !email, !message)
    if (!pacienteNome || !email || !message) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    AgendarConsulta("paciente", {
      email: email,
      dataConsulta: dataConsulta,
      medico: emailMedico,
      nomePaciente: pacienteNome,
      nomeMedico: "pedro"
    });


    // try {
    //   const patientDeviceToken = await getPatientDeviceToken(email);
    //   if (!patientDeviceToken) {
    //     Alert.alert("Erro", "Token do dispositivo não encontrado.");
    //     return;
    //   }

    //   await messaging().sendMessage({
    //     to: patientDeviceToken,
    //     notification: {
    //       title: "Confirmação de Agendamento",
    //       body: message,
    //     },
    //   });

    //   Alert.alert("Sucesso", "Mensagem de confirmação enviada com sucesso.");
    //   setPacienteNome("");
    //   setEmail("");
    //   setMessage("");
    // } catch (error) {
    //   Alert.alert("Erro", "Houve um erro ao enviar a mensagem: " + error.message);
    // }
  };

  const getPatientDeviceToken = async (email) => {
    try {
      const response = await fetch('https://idealecare-26a84-default-rtdb.firebaseio.com/', { // Substitua pela sua URL real
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar token do dispositivo.');
      }

      const data = await response.json();
      return data.deviceToken;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return (
    <LinearGradient
      colors={['#10C2A2', '#11D26E']}
      style={styles.container}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Confirmar Agendamento</Text>
        <TextInput
          style={styles.input}
          placeholder="Nome do Paciente"
          placeholderTextColor="#aaa"
          value={pacienteNome}
          onChangeText={setPacienteNome}
        />
        <TextInput
          style={styles.input}
          placeholder="Email do Paciente"
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={(value) => {
            completarCampos(value);
            setEmail(value);
          }}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Email do Medico"
          placeholderTextColor="#aaa"
          value={emailMedico}
          onChangeText={setEmailMedico}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Data da consulta"
          placeholderTextColor="#aaa"
          value={dataConsulta}
          onChangeText={setDataConsulta}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Mensagem de Confirmação"
          placeholderTextColor="#aaa"
          value={message}
          onChangeText={setMessage}
          multiline
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Enviar Confirmação"
            onPress={handleSendConfirmation}
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
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
  },
});

export default ConfirmarAgendamento;