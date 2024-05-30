import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ConsultarAgenda } from '../../service/ConsultarAgenda';
import auth from "@react-native-firebase/auth";

const AgendaMedico = () => {
  const [listaDeConsultas, setListaDeConsultas] = useState([]);
  const medicoEmail = auth().currentUser.email;

  const lidarComLista = async () => {
    const lista = await ConsultarAgenda("medico_responsavel", { email: medicoEmail });
    setListaDeConsultas(lista);
  };

  const confirmarConsulta = async (id) => {
    try {
      // Atualizar o estado da consulta para confirmado no Firestore
      // Coloque sua lógica de atualização aqui
      lidarComLista(); // Atualiza a lista após a confirmação
      Alert.alert('Agendamento Confirmado', 'O agendamento foi confirmado com sucesso.');
    } catch (error) {
      console.warn("Erro ao confirmar agendamento: " + error);
    }
  };

  useEffect(() => {
    lidarComLista();
  }, []);

  return (
    <LinearGradient colors={['#10C2A2', '#11D26E']} style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Agendamentos</Text>
        <Text style={styles.subtitle}>Lista de agendamentos do médico</Text>
        <FlatList
          data={listaDeConsultas}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.consultaItem}>
              <View style={styles.consultaTextContainer}>
                <Text style={styles.consultaText}>Você vai consultar o paciente: {item.paciente} no dia:</Text>
                <Text style={styles.consultaText}>{item.data_da_consulta}</Text>
              </View>
              {!item.confirmada ? (
                <TouchableOpacity
                  style={styles.confirmButton}
                  onPress={() => confirmarConsulta(item.id)}
                >
                  <Text style={styles.confirmButtonText}>Confirmado</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={[styles.confirmButton, { backgroundColor: '#4CAF50' }]}
                  disabled={true}
                >
                  <Text style={[styles.confirmButtonText, { color: '#fff' }]}>Confirmado</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
        />
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  subtitle: {
    color: '#fff',
    marginBottom: 10,
  },
  consultaItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  consultaTextContainer: {
    flex: 1,
    paddingRight: 10,
  },
  consultaText: {
    color: '#17322D',
  },
  confirmButton: {
    backgroundColor: '#11D26E',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  confirmButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AgendaMedico;