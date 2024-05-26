import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import DocumentPicker from 'expo-document-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';

const ArquivoMedico = () => {
  const [patientEmail, setPatientEmail] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handlePickFile = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
      if (result.type === 'success') {
        setFile(result);
      }
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível selecionar o arquivo.');
    }
  };

  const handleSendFile = async () => {
    if (!patientEmail || !file) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos e selecione um arquivo.');
      return;
    }

    setUploading(true);

    const fileName = `${new Date().getTime()}_${file.name}`;
    const fileRef = storage().ref().child(fileName);

    try {
      // Upload do arquivo para o Firebase Storage
      await fileRef.putFile(file.uri);
      const fileUrl = await fileRef.getDownloadURL();

      // Adiciona metadados do arquivo ao Firestore
      await firestore().collection('files').add({
        name: file.name,
        url: fileUrl,
        patientEmail,
        uploadedAt: firestore.FieldValue.serverTimestamp(),
      });

      Alert.alert('Sucesso', 'Arquivo enviado com sucesso.');
      setPatientEmail('');
      setFile(null);
    } catch (error) {
      Alert.alert('Erro', 'Houve um erro ao enviar o arquivo: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <LinearGradient colors={['#10C2A2', '#11D26E']} style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.title}>Enviar Arquivo para Paciente</Text>
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
        {file && <Text style={styles.fileName}>{file.name}</Text>}
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
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 50,
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
    width: '100%',
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
  fileName: {
    color: '#fff',
    marginTop: 10,
    textAlign: 'center',
  },
});

export default ArquivoMedico;