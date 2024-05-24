import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { buscarPdfDoPaciente } from '../../service/buscarPdfDoPaciente';

const ArquivoPaciente = ({ navigation }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  const lidarComOPdf = async () => {
    const url_pdf = await buscarPdfDoPaciente();
    setFiles(url_pdf);
  }

  useEffect(() => {
    lidarComOPdf()
  }, []);

  // if (loading) {
  //   return (
  //     <View style={styles.loadingContainer}>
  //       <ActivityIndicator size="large" color="#10C2A2" />
  //     </View>
  //   );
  // }

  return (
    <LinearGradient colors={['#10C2A2', '#11D26E']} style={styles.container}>
      <Text style={styles.title}>Arquivos Enviados pelo Médico</Text>
      <TouchableOpacity style={styles.fileItem} onPress={() => navigation.navigate("ArquivosDoPaciente", { url_pdf: files })}>
        <Text style={styles.fileName}>nome</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  fileItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
  },
  fileName: {
    fontSize: 16,
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ArquivoPaciente;