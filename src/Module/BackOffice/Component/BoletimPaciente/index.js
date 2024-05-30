import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, TouchableHighlight } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
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
      <Text style={styles.boletimTitle}>{item.date}</Text>
      <Text style={styles.boletimTitle}>{item.artigo}</Text>
      <Text style={styles.boletimTitle}>{item.observacoes}</Text>
    </TouchableOpacity>
  );

  return (
    <LinearGradient
      colors={['#10C2A2', '#11D26E']}
      style={styles.container}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Boletins</Text>
        <Text style={styles.subtitle}>Lista de boletins Diários:</Text>
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
              <Text style={styles.modalText}>{selectedBoletim?.date}</Text>
              <Text style={styles.modalText}>{selectedBoletim?.artigo}</Text>
              <Text style={styles.modalText}>{selectedBoletim?.observacoes}</Text>
              <TouchableHighlight
                style={{ ...styles.openButton, backgroundColor: "#17322D" }}
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
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    fontWeight: "bold",
  },
  listContainer: {
    width: "100%",
  },
  boletimItem: {
    backgroundColor: "#17322D",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  boletimTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 25,
    padding: 55,
    alignItems: "center",
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
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 20,
    elevation: 0
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});