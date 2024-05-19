import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const AgendamentosMedicoScreen = () => {
  // Aqui você pode recuperar os agendamentos do médico e exibi-los
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Agendamentos</Text>
      <Text>Lista de agendamentos do médico</Text>
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

export default AgendamentosMedicoScreen;