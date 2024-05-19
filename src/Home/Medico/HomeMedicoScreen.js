import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native';
import ArquivosScreen from '../ArquivosScreen';
import PerfilScreen from '../Medico/Perfilmedico';

const Tab = createBottomTabNavigator();

const HomeMedicoScreen = ({ navigation }) => {
  const handleVerAgendamentos = () => {
    navigation.navigate('AgendamentoGestorScreen');
    
    <View style={styles.container}>
    <Text style={styles.title}>Bem-vindo, Médico!</Text>
    <Button title="Ver Agendamentos" onPress={handleVerAgendamentos} />
  </View>


  };

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#308168',
        inactiveTintColor: '#308168',
        style: styles.tabBar,
        labelStyle: styles.tabLabel,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeTab}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Arquivos"
        component={ArquivosM}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

function HomeTab({ navigation }) {
  return (
    <ImageBackground
      source={require('../img/background.png')}
      style={styles.container}
    >
      <View style={styles.containerPrincipal}>
        <Image
          source={require('../img/logo2.png')}
          style={styles.image}
        />
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('BoletimDiarioMScreen')}
          >
            <Ionicons name="book" size={76} color="#308168" />
            <Text style={styles.buttonText}>Boletim Diário</Text>
           
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('AgendamentoGestorScreen')} // Navegue para AgendamentoPacienteScreen
          >
            <Ionicons name="calendar" size={76} color="#308168" />
            <Text style={styles.buttonText}>Agendamentos</Text>
            
          </TouchableOpacity>
         
            
         
          
        
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
  },
  safeArea: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  containerPrincipal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  image: {
    width: 400,
    height: 300,
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '90%', // Ajustado para 90% da largura da tela para evitar problemas de layout
    marginTop: 10,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%', // Largura ajustada para ocupar 45% da largura da tela (50% para deixar espaço entre os botões)
    aspectRatio: 1, // Mantém a proporção quadrada
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 250,
  },
  buttonText: {
    color: '#3D5945',
    fontSize: 19,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  buttonSubtext: {
    color: '#308168',
    fontSize: 18,
    marginTop: 5,
    fontWeight: '400',
  },
});
export default HomeMedicoScreen;