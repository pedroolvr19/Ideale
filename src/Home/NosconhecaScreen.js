import React from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const NosConhecaScreen = () => {
  return (
    <LinearGradient
      colors={['#10C2A2', '#11D26E']}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        <Text style={styles.title}>Quem Somos</Text>
        <Text style={styles.text}>
          Somos uma empresa dedicada a oferecer os melhores serviços de saúde para nossos pacientes.
          Nossa missão é proporcionar um atendimento humanizado e de qualidade, garantindo o bem-estar
          e a satisfação de todos que confiam em nosso trabalho.
        </Text>
        <Text style={styles.text}>
          Com uma equipe altamente qualificada e instalações modernas, estamos sempre prontos para
          atender às necessidades de nossos pacientes, oferecendo um cuidado personalizado e eficiente.
          Nossa visão é ser referência em saúde, inovando e melhorando constantemente nossos serviços.
        </Text>
        <Text style={styles.text}>
          Agradecemos por escolher nossos serviços. Estamos comprometidos em cuidar de você e de sua saúde
          com todo o respeito e dedicação que você merece.
        </Text>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  text: {
    fontSize: 18,
    color: "#fff",
    marginBottom: 15,
    textAlign: "center",
  },
});

export default NosConhecaScreen;