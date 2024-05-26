import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export default function BoletimPaciente() {
   
  const [boletins, setBoletins] = useState([]);
  const [selectedBoletim, setSelectedBoletim] = useState(null);

  useEffect(() => {
    const fetchBoletins = async () => {
      try {
        const userEmail = auth()?.currentUser?.email
        console.log("Começando busca por boletim")
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
        {selectedBoletim ? (
          <View style={styles.boletimContent}>
            <Text style={styles.boletimTitle}>{selectedBoletim.titulo}</Text>
            <Text style={styles.boletimText}>{selectedBoletim.conteudo}</Text>
            <TouchableOpacity style={styles.backButton} onPress={() => setSelectedBoletim(null)}>
              <Text style={styles.backButtonText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={boletins}
            renderItem={renderBoletim}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContainer}
          />
        )}
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
    marginBottom: 20,
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
  boletimContent: {
    width: "100%",
    alignItems: "center",
  },
  boletimText: {
    color: "#fff",
    fontSize: 16,
    marginVertical: 20,
    textAlign: "center",
  },
  backButton: {
    backgroundColor: "#17322D",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  backButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});

