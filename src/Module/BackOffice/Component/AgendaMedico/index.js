import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ConsultarAgenda } from '../../service/ConsultarAgenda';
import auth from "@react-native-firebase/auth";

const AgendaMedico = () => {
  // Aqui você pode recuperar os agendamentos do médico e exibi-los
  const [listaDeConsultas, setListaDeConsultas] = useState([]);
  const medicoEmail = auth().currentUser.email;

  const lidarComLista = async () => {
    const lista = await ConsultarAgenda("medico_responsavel", { email: medicoEmail });
    setListaDeConsultas(lista);
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
              <Text style={styles.consultaText}>Você vai consultar o paciente: {item.paciente} no dia:</Text>
              <Text style={styles.consultaText}>{item.data_da_consulta}</Text>
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
  },
  consultaText: {
    color: '#17322D',
  },
});

export default AgendaMedico;