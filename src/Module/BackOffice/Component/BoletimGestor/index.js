import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';
import firestore from "@react-native-firebase/firestore";

export default function BoletimGestor() {
  const navigation = useNavigation();

  const [data, setData] = useState('');
  const [emailPaciente, setEmailPaciente] = useState('');
  const [diario, setDiario] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handlePost = (payload) => {
    try {
      firestore()
        .collection("Boletim")
        .add(payload)
      console.log("Boletim Salvo com sucesso");
    } catch (error) {
      console.log("Falha ao salvar o boletim: ", error);
    }
  }

  const handleSubmit = () => {
    if (!data || !emailPaciente || !diario || !observacoes) {
      console.warn("Preencha os campos");
      return;
    };

    const payload = {
      date: data,
      paciente_email: emailPaciente,
      artigo: diario,
      observacoes,
    }
    handlePost(payload);
  }

  const handleVisto = async () => {
    const htmlContent = `
      <html>
        <body>
          <h1>Data: ${data}</h1>
          <h2>Paciente: ${emailPaciente}</h2>
          <p>Diário: ${diario}</p>
          <p>Observações: ${observacoes}</p>
        </body>
      </html>
    `;

    const options = {
      html: htmlContent,
      fileName: 'boletim_diario',
      directory: FileSystem.documentDirectory,
    };

    try {
      const file = await RNHTMLtoPDF.convert(options);
      navigation.navigate('MeuBoletim', { pdfUri: file.filePath });
    } catch (error) {
      console.error('Erro ao criar arquivo:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#10C2A2', '#11D26E']}
      style={styles.container}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Enviar Boletim Diário</Text>
        <Text style={styles.subtitle}>Preencha o boletim diário do paciente:</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Data:"
            value={data}
            onChangeText={setData}
            placeholderTextColor="#308168" 
          />
          <TextInput
            style={styles.input}
            placeholder="Email do Paciente:"
            value={emailPaciente}
            onChangeText={setEmailPaciente}
            placeholderTextColor="#308168" 
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { height: 200 }]} 
            placeholder="Digite seu diário..."
            value={diario}
            onChangeText={setDiario}
            multiline
            placeholderTextColor="#308168" 
          />
          <TextInput
            style={[styles.input, { height: 80 }]} 
            placeholder="Observações:"
            value={observacoes}
            onChangeText={setObservacoes}
            multiline
            placeholderTextColor="#308168" 
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleSubmit}
        >
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: 370,
    height: 40,
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    color: '#308168', 
    fontWeight: 'bold', 
  },
  button: {
    width: 200,
    backgroundColor: '#17322D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});