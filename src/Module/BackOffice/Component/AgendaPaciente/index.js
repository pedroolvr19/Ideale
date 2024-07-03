import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, FlatList, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Linking } from 'react-native';
import auth from "@react-native-firebase/auth";
import { ConsultarAgenda } from '../../service/ConsultarAgenda';

const handleWhatsAppPress = () => {
  const phoneNumber = '+558183685500';
  const message = 'Olá! Gostaria de marcar uma consulta.';
  Linking.openURL(`whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`);
};

const handleWhatsAppVisitaPress = () => {
  const phoneNumber = '+558183685500';
  const message = 'Olá! Gostaria de agendar uma visita.';
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
    <ImageBackground
    source={require('../../../../Home/img/backg.png')}
    style={styles.container}
  >
      <Text style={styles.tittleText}> Agendamentos </Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleWhatsAppPress}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={40} color="#17322D" style={styles.icon} />
          <Text style={styles.buttonText}>Solicitar Consulta</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleWhatsAppVisitaPress}
        >
          <Ionicons name="calendar-outline" size={40} color="#17322D" style={styles.icon} />
          <Text style={styles.buttonText}>Solicitar Visita</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={handleMeusAgendamentosPress}
        >
          <Ionicons name="calendar" size={40} color="#17322D" style={styles.icon} />
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
                keyExtractor={(_, index) => index.toString()}
                renderItem={({ item }) => (
                  <>
                    <View style={styles.infoContainer}>
                      <Ionicons name="checkmark-circle-outline" size={40} color="#4CAF50" style={styles.icon} />
                      <Text style={styles.infoText}>Aprovado</Text>
                    </View>
                    <Text style={styles.messageText}>Você vai consultar com o médico: {item.medico_responsavel} no dia:</Text>
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
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  tittleText: {
    fontSize: 28,
    marginTop: 15,
    fontWeight: '600',
    color: '#1B3422',
  },
  button: {
    backgroundColor: '#fff',
    height: 100,
    width: 330,
    marginBottom: 5,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5, // Para Android
    marginTop: 20, // Adiciona margem superior para mover os botões para cima
  },
  messageText: {
    paddingBottom: 10,
    fontWeight: '500',
  },
  buttonText: {
    color: '#17322D',
    fontSize: 24, // Aumenta o tamanho da fonte
    fontWeight: 'bold',
    marginLeft: 15, // Adiciona espaço entre o ícone e o texto
  },
  icon: {
    color: '#17322D',
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
