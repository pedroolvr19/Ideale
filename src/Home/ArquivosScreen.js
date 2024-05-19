import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
export default function ArquivosScreen() {
  const [arquivos, setArquivos] = useState([]);

  useEffect(() => {
    const fetchArquivos = async () => {
      try {
        // Arquivos locais
        const arquivosLocais = [
          { id: 1, nome: 'Laudos', tipo: 'pdf', url: 'file:///C:/IdealeCare/IdealeCare/Home/Boletim/pdf/HOSPITAL%20DIA%20IDEALE%20v1.pdf' },
          { id: 2, nome: 'Prescrições', tipo: 'pdf', url: 'file:///C:/IdealeCare/IdealeCare/Home/Boletim/pdf/Receita%20Médica.pdf' },
          { id: 3, nome: 'Exames', tipo: 'word', url: 'file:///C:/IdealeCare/IdealeCare/Home/Boletim/pdf/Receita%20Médica.pdf' },
          // Mais arquivos...
        ];

        setArquivos(arquivosLocais);
      } catch (error) {
        console.error('Erro ao buscar arquivos:', error);
      }
    };

    fetchArquivos();
  }, []);

  const abrirPDFLocal = async (fileUrl) => {
    try {
      // Verifique se o arquivo existe localmente
      const fileInfo = await FileSystem.getInfoAsync(fileUrl);
      if (!fileInfo.exists) {
        console.error('Arquivo não encontrado:', fileUrl);
        return;
      }

      // Abra o arquivo com o aplicativo de visualização de PDF padrão do dispositivo
      await FileSystem.openAsync(fileUrl);
    } catch (error) {
      console.error('Erro ao abrir o arquivo:', error);
    }
  };

  return (
    <LinearGradient
      colors={['#10C2A2', '#11D26E']}
      style={styles.container}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Meus Arquivos</Text>
      <FlatList
        data={arquivos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.arquivoItem}
            onPress={() => abrirPDFLocal(item.url)}
          >
            <Text style={styles.arquivoNome}>{item.nome}</Text>
            <Text style={styles.arquivoTipo}>{item.tipo}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  arquivoItem: {
    backgroundColor: '#e0e0e0',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  arquivoNome: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#17322D'
  },
  arquivoTipo: {
    fontSize: 14,
  },
});