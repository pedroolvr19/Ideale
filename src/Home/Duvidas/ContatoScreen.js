import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

const ContatoScreen = () => {
  const handleInstagramPress = () => {
    const instagramUsername = 'IdealeCare'; 
    const instagramUrl = `https://www.instagram.com/hospitalideale/?igsh=dTJqNzZ1dXU0aGVr`;
    Linking.openURL(instagramUrl);
  };

  const handleEmailPress = () => {
    const email = 'contato@hospitalideale.com.br';
    alert('Endereço de e-mail copiado!');
  };

  const handlePhoneCall = () => {
    const phoneNumber = '+5581999712008';
    Linking.openURL(`tel:${phoneNumber}`);
    alert('Número de telefone copiado!');
  };

  const handleWhatsAppPress = () => {
    const phoneNumber = '+5581999712008';
    Linking.openURL(`whatsapp://send?phone=${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entre em Contato</Text>
      <Text style={styles.description}>
        Para entrar em contato conosco, por favor utilize um dos seguintes métodos:
      </Text>
      <TouchableOpacity style={styles.contactMethod} onPress={handleEmailPress}>
        <Text style={styles.contactText}>Email: contato@hospitalideale.com.br</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.contactMethod, { backgroundColor: '#17322D' }]} onPress={handleInstagramPress}>
        <Text style={styles.contactText}>Instagram</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.contactMethod} onPress={handleWhatsAppPress}>
        <Text style={styles.contactText}>Assistência 24 Horas WhatsApp: (81) 99971-2008</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E8145',
    paddingTop: 40, 
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff', 
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
    marginBottom: 40,
    textAlign: 'center',
    color: '#fff', 
    marginTop: 10,
    fontWeight: '600',
  },
  contactMethod: {
    backgroundColor: '#17322D',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent:'center',
    width: 350,
    height: 90,
  },
  contactText: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
    marginLeft: 30,
  },
});

export default ContatoScreen;