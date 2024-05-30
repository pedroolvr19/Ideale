import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, Dimensions, FlatList, Alert, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { buscarPdfDoPaciente, excluirPdfDoPaciente } from '../../service/buscarPdfDoPaciente';

const ArquivoPaciente = ({ navigation }) => {
  const [files, setFiles] = useState([]);

  const lidarComOPdf = async () => {
    const url_pdf = await buscarPdfDoPaciente();
    console.log("url_pdf: ", url_pdf);
    setFiles(url_pdf);
  }

  useEffect(() => {
    lidarComOPdf();
  }, []);

  const handleDelete = async (fileId) => {
    try {
      await excluirPdfDoPaciente(fileId);
      setFiles(files.filter(file => file.id !== fileId));
      Alert.alert("Sucesso", "Arquivo arquivado com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir arquivo: ", error);
      Alert.alert("Erro", "Não foi possível arquivar o arquivo.");
    }
  }

  const confirmDelete = (fileId) => {
    Alert.alert(
      "Arquivar Arquivo",
      "Deseja arquivar esse arquivo?",
      [
        { text: "Cancelar", style: "cancel" },
        { text: "Arquivar", onPress: () => handleDelete(fileId) }
      ],
      { cancelable: true }
    );
  }

  return (
    <LinearGradient colors={['#10C2A2', '#11D26E']} style={styles.container}>
      <Text style={styles.title}>Arquivos</Text>
      <Text style={styles.subtitle}>Lista de arquivos enviados pelo médico:</Text>
      <FlatList
        data={files}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.fileItem}>
            <TouchableOpacity onPress={() => navigation.navigate("ArquivosDoPaciente", { uri: item.link })}>
              <Text style={styles.fileName}>{item.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(item.id)}>
              <Text style={styles.deleteButtonText}>Arquivar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhum arquivo encontrado</Text>}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  containerPdf: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 35,
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
    marginBottom: 10,
    textAlign: 'center',
    marginTop: 30,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  fileItem: {
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  fileName: {
    fontSize: 19,
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#1B3422',
    padding: 10,
    borderRadius: 5,
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
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