import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { buscarPdfDoPaciente } from '../../service/buscarPdfDoPaciente';

const ArquivoPaciente = ({ navigation }) => {
  const [files, setFiles] = useState([]);

  const lidarComOPdf = async () => {
    const url_pdf = await buscarPdfDoPaciente();
    console.log("url_pdf: ", url_pdf);
    setFiles(url_pdf);
  }

  useEffect(() => {
    lidarComOPdf()
  }, []);

  return (
    <LinearGradient colors={['#10C2A2', '#11D26E']} style={styles.container}>
      <Text style={styles.title}>Arquivos Enviados pelo Médico</Text>
      <FlatList
        data={files}
        keyExtractor={(_, index) => index}
        renderItem={({item, index}) => (
          <TouchableOpacity style={styles.fileItem} onPress={() => navigation.navigate("ArquivosDoPaciente", { uri: item.link })}>
            <Text style={styles.fileName}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  containerPdf: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
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