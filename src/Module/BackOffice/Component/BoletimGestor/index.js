import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

import { LinearGradient } from 'expo-linear-gradient';
import * as FileSystem from 'expo-file-system';
import { useNavigation } from '@react-navigation/native';

export default function BoletimGestor() {

  

  const navigation = useNavigation();

  const [data, setData] = useState('');
  const [nomePaciente, setNomePaciente] = useState('');
  const [diario, setDiario] = useState('');
  const [observacoes, setObservacoes] = useState('');

  const handleVisto = async () => {
    const htmlContent = `
      <html>
        <body>
          <h1>Data: ${data}</h1>
          <h2>Paciente: ${nomePaciente}</h2>
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
            placeholder="Paciente:"
            value={nomePaciente}
            onChangeText={setNomePaciente}
            placeholderTextColor="#308168" 
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, { height: 350 }]} 
            placeholder="Digite seu diário..."
            value={diario}
            onChangeText={setDiario}
            multiline
            placeholderTextColor="#308168" 
          />
          <TextInput
            style={[styles.input, { height: 100 }]} 
            placeholder="Observações:"
            value={observacoes}
            onChangeText={setObservacoes}
            multiline
            placeholderTextColor="#308168" 
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={handleVisto}
        >
          <Text style={styles.buttonText}>Visto</Text>
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