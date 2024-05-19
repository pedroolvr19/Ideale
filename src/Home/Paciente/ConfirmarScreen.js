import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ConfirmarScreen = ({ route }) => {
  const { appointmentType } = route.params;

  // Lógica para enviar notificações push e e-mails de confirmação aqui

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Confirmação de Agendamento</Text>
      <Text>O {appointmentType} foi agendado com sucesso!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default ConfirmarScreen;