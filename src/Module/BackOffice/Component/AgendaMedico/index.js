import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ConsultarAgenda } from '../../service/ConsultarAgenda';
import auth from "@react-native-firebase/auth";

const AgendaMedico = () => {
  // Aqui você pode recuperar os agendamentos do médico e exibi-los
  const [listaDeConsultas, setListaDeConsultas] = useState([])
  const medicoEmail = auth().currentUser.email

  const lidarComLista = async () => {
    const lista = await ConsultarAgenda("medico_responsavel", { email: medicoEmail });
    setListaDeConsultas(lista);
  }
  useEffect(() => {
    lidarComLista();
  }, [])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamentos</Text>
      <Text>Lista de agendamentos do médico</Text>
      <FlatList
        data={listaDeConsultas}
        keyExtractor={(_, index) => index}
        renderItem={({ item }) => (
          <>
            <Text>Você vai consultar o paciente: {item.paciente} no dia:</Text>
            <Text>{item.data_da_consulta}</Text>
          </>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AgendaMedico;