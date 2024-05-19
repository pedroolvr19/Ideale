import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

// Lista de médicos (substitua por seus dados reais)
const medicos = [
  { id: 1, nome: 'Dr. João' },
  { id: 2, nome: 'Dra. Maria' },
  { id: 3, nome: 'Dr. Pedro' },
  // Adicione mais médicos conforme necessário
];

export default function SelecionarMedicoScreen({ navigation }) {
  const [medicoSelecionado, setMedicoSelecionado] = useState(null);

  const handleSelecionarMedico = (medico) => {
    setMedicoSelecionado(medico);
  };

  const handleAgendarConsulta = () => {
    // Lógica para agendar a consulta e navegar de volta para a tela anterior
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecionar Médico</Text>
      <FlatList
        data={medicos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.optionButton,
              medicoSelecionado && medicoSelecionado.id === item.id && { backgroundColor: '#00cc66' },
            ]}
            onPress={() => handleSelecionarMedico(item)}
          >
            <Text style={styles.optionButtonText}>{item.nome}</Text>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        style={[styles.button, { marginTop: 20 }]}
        onPress={handleAgendarConsulta}
        disabled={!medicoSelecionado}
      >
        <Text style={styles.buttonText}>Agendar Consulta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5DD3A6',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '100%',
    alignItems: 'center',
  },
  optionButtonText: {
    color: '#000',
    fontWeight: 'bold',
  },
  button: {
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