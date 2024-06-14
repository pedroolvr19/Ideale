import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';
import auth from "@react-native-firebase/auth";
import { ConsultarAgenda } from '../../service/ConsultarAgenda';

const handleWhatsAppPress = () => {
  const phoneNumber = '+558183685500';
  const message = 'Gostaria de marcar uma consulta.';
  Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
};

const handleWhatsAppVisitaPress = () => {
  const phoneNumber = '+558183685500';
  const message = 'Gostaria de agendar uma visita.';
  Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
};

const AgendaPaciente = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [listaDeConsultas, setListaDeConsultas] = useState([]);

  const handleMeusAgendamentosPress = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const lidarComLista = async () => {
    const userEmail = auth().currentUser.email;
    const lista = await ConsultarAgenda("paciente", { email: userEmail });
    setListaDeConsultas(lista);
  }

  useEffect(() => {
    lidarComLista();
  }, [])

  return (
    <LinearGradient
      colors={['#10C2A2', '#11D26E']}
      style={styles.container}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#17322D' }]}
          onPress={handleWhatsAppPress}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Solicitar Consulta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#17322D' }]}
          onPress={handleWhatsAppVisitaPress}
        >
          <Ionicons name="calendar-outline" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Solicitar Visita</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: '#17322D' }]}
          onPress={handleMeusAgendamentosPress}
        >
          <Ionicons name="calendar" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>Meus Agendamentos</Text>
        </TouchableOpacity>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={closeModal}
         
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Situação dos Agendamentos</Text>
              

              {/* Informações sobre os agendamentos e ícones */}

              <FlatList
                data={listaDeConsultas}
                keyExtractor={(_, index) => index}
                renderItem={({ item }) => (
                  <>
                    <View style={styles.infoContainer}>
                      <Ionicons name="checkmark-circle-outline" size={24} color="#4CAF50" style={styles.icon} />
                      <Text style={styles.infoText}>Aprovado</Text>
                    </View>
                    <Text style={styles.messageText}>Você vai consultar com o medico: {item.medico_resposanvel} no dia:</Text>
                    <Text>{item.data_da_consulta}</Text>
                  </>
                )}
              />

              {/* Botão de fechar o modal */}
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    headerShown: false
  },
  button: {
    backgroundColor: '#263E32',
    height: 70,
    width: 330,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  messageText:{
paddingBottom: 10,
fontWeight: '500',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  icon: {
    marginRight: 10,
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#263E32',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    marginLeft: 10,
    marginTop: 10,
    fontWeight: '500',
    
  },
  closeButton: {
    backgroundColor: '#263E32',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AgendaPaciente;