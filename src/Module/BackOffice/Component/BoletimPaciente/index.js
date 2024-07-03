import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TouchableHighlight, ImageBackground } from "react-native";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function BoletimPaciente() {
  const [boletins, setBoletins] = useState([]);
  const [selectedBoletim, setSelectedBoletim] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchBoletins = async () => {
      try {
        const userEmail = auth()?.currentUser?.email;
        console.log("Começando busca por boletim");
        const boletimSnapshot = await firestore().collection('Boletim').where("paciente_email", "==", userEmail).get();
        const boletimList = boletimSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setBoletins(boletimList);
      } catch (error) {
        console.error("Erro ao buscar boletins: ", error);
      }
    };

    fetchBoletins();
  }, []);

  const handleBoletimPress = (boletim) => {
    setSelectedBoletim(boletim);
    setModalVisible(true);
  };

  const renderBoletim = ({ item }) => (
    <TouchableOpacity style={styles.boletimItem} onPress={() => handleBoletimPress(item)}>
      <Text style={styles.boletimTitle}> Boletim do dia: {item.date}</Text>
    </TouchableOpacity>
  );

  return (
    <ImageBackground
      source={require('../../../../Home/img/bck2.jpg')}
      style={styles.backgroundImage}
    >
        <View style={styles.container}>
          <Text style={styles.title}>Boletim Diário</Text>
          <FlatList
            data={boletins}
            renderItem={renderBoletim}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <Text style={styles.modalText}><Text style={{fontWeight: 'bold'}}>Dia:</Text> {selectedBoletim?.date}</Text>
    <Text style={styles.modalText}>{selectedBoletim?.artigo}</Text>
    <Text style={styles.modalText}><Text style={{fontWeight: 'bold'}}>Observações:</Text> {selectedBoletim?.observacoes}</Text>
                <TouchableHighlight
                  style={styles.openButton}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Text style={styles.textStyle}>Fechar</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 15,
  },
  title: {
    marginTop: 50,
    fontSize: 28,
    fontWeight: "bold",
    color: "#1B3422",
  },
  listContainer: {
    marginTop: 75,
    width: "100%",
  },
  boletimItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 15,
    width: 330,
    height: 70,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 6,
    justifyContent: 'center',
  },
  boletimTitle: {
    color: "#17322D",
    fontWeight: "bold",
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adiciona sombreamento mais escuro
  },
  modalView: {
    width: '90%',
    height: '80%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    justifyContent: 'space-between', // Ajusta a posição dos elementos
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 22
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  openButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
  },
  textStyle: {
    color: "#17322D",
    fontWeight: "bold",
    textAlign: "center",
    fontSize:15,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#17322D",
    fontSize: 18,
  }
});