import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import storage from '@react-native-firebase/storage';
import * as DocumentPicker from 'expo-document-picker';
import { subirExames } from '../../service/subirExames';
import { vincularExames } from '../../service/vincularExames';

const ArquivoMedico = () => {
  const [patientEmail, setPatientEmail] = useState('');
  const [file, setFile] = useState({name: "", blob: {}});
  const [uploading, setUploading] = useState(false);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({});
      if (!result.canceled) {
        const downloadFile = await fetch(result.assets[0].uri)
        const blobFile = await downloadFile.blob();
        setFile({name: result.assets[0].name, blob: blobFile});
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar o arquivo.');
    }
  }
  const uploadDocument = async () => {
    if(!file.blob) return;
    const storageRef = storage().ref(`exames/${file.name}`);
    try {
      await storageRef.put(file.blob);
      const url = await storageRef.getDownloadURL();
      const exameId = await subirExames({pacienteEmail: patientEmail, urlPDF: url, nomeArquivo: file.name})
      await vincularExames({referenciaParaExames: exameId, emailPaciente: patientEmail})
      console.log(url);
    } catch (error) {
      console.warn("error: ", error)
    }
  }

  const handlePickFile = async () => {
    pickDocument();
  };

  const handleSendFile = async () => {
    uploadDocument();
  };

  return (
    <LinearGradient colors={['#10C2A2', '#11D26E']} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Enviar Arquivo para Paciente</Text>
        <Text style={styles.subtitle}>Insira o email do paciente e selecione o arquivo desejado.</Text>
        {file && <Text style={styles.fileName}>{file.name}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Email do Paciente"
          placeholderTextColor="#aaa"
          value={patientEmail}
          onChangeText={setPatientEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TouchableOpacity style={styles.fileButton} onPress={handlePickFile}>
          <Text style={styles.fileButtonText}>Selecionar Arquivo</Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          {uploading ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <TouchableOpacity style={styles.uploadButton} onPress={handleSendFile}>
              <Text style={styles.uploadButtonText}>Enviar Arquivo</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  fileName: {
    color: '#fff',
    marginBottom: 20,
    fontSize: 18,
    textAlign: 'center',
  },
  input: {
    width: '80%', // Ajuste da largura para deixá-la mais longa
    height: 40, // Ajuste da altura para deixá-la mais fina
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 20,
    alignItems: 'center',
  },
  fileButton: {
    backgroundColor: '#17322D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    width: '80%', // Ajuste da largura para corresponder à caixa de email
  },
  fileButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  uploadButton: {
    backgroundColor: '#17322D',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  uploadButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default ArquivoMedico;