import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import firestore from '@react-native-firebase/firestore';

const ArquivoPaciente = () => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        // Supondo que você tenha uma coleção 'files' no Firestore
        const filesSnapshot = await firestore().collection('files').get();
        const filesList = filesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFiles(filesList);
      } catch (error) {
        console.error('Erro ao buscar arquivos: ', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#10C2A2" />
      </View>
    );
  }

  return (
    <LinearGradient colors={['#10C2A2', '#11D26E']} style={styles.container}>
      <Text style={styles.title}>Arquivos Enviados pelo Médico</Text>
      <FlatList
        data={files}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.fileItem} onPress={() => Linking.openURL(item.url)}>
            <Text style={styles.fileName}>{item.name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={<Text style={styles.emptyMessage}>Nenhum arquivo disponível</Text>}
      />
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