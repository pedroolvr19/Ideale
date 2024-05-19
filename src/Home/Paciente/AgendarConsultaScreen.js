import React from 'react';
import { View, Text, Button, TouchableOpacity, StyleSheet, Linking } from 'react-native';

const handleWhatsAppPress = () => {
  const phoneNumber = '+5581999712008';
  Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
};

const AgendamentoPacienteScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#17322D' }]}
        onPress={handleWhatsAppPress} // Alterado para chamar a função handleWhatsAppPress
      >
        <Text style={styles.buttonText}>Solicitar Consulta</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#17322D' }]}
        onPress={() => navigation.navigate('AgendarvisitaScreen')}
      >
        <Text style={styles.buttonText}>Solicitar Visita</Text>
      </TouchableOpacity>
      
      <View style={styles.agendamentoContainer}>
        <Text style={styles.containerText}>Agendamentos -</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#2E8145',
  },
  containerText:{
    marginLeft:20,
    marginTop: 15,
    fontSize: 20,
    color: '#fff',
    fontWeight: '600',
  },
  agendamentoContainer: {
    backgroundColor: '#263E32',
    width: 330,
    height: 350,
    borderRadius: 10,
    marginBottom: 30,
    marginTop: 30,
  },
  button: {
    backgroundColor: '#263E32',
    height: 70,
    width: 330,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent:'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 40,
  },
});

export default AgendamentoPacienteScreen;