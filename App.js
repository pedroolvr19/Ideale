import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BoletimDiarioScreen from './src/Home/Boletim/MeuBoletimScreen';
import NossoguiaScreen from './src/Home/Duvidas/NossoguiaScreen';
import AgendamentoPacienteScreen from './src/Home/Paciente/AgendamentoPacienteScreen';
import NosconhecaScreen from './src/Home/NosconhecaScreen';
import RedefinirSenhaScreen from './src/Login/RedefinirSenhaScreen';
import LoginScreen from './src/Login/LoginScreen';
import PerfilScreen from './src/Home/Paciente/PerfilScreen';
import SelecionarMedicoScreen from './src/Home/Agendamento/SelecionarMedicoScreen';
import ContatoScreen from './src/Home/Duvidas/ContatoScreen';
import HomePacienteScreen from './src/Home/Paciente/HomePacienteScreen';
import HomeMedicoScreen from './src/Home/Medico/HomeMedicoScreen';
import PopUpScreen from './src/Home/Medico/BoletimDiarioMScreen';
import ArquivosM from './src/Home/Medico/ArquivosM';
import AgendarConsultaScreen from './src/Home/Paciente/AgendarConsultaScreen';
import ConfirmarScreen from './src/Home/Paciente/ConfirmarScreen';
import CadastroScreen from './src/Login/CadastroScreen';
import InicioScreen from './src/Login/InicioScreen';
import PreloadScreen from './src/Login/PreloadScreen';
import AgendamentoGestorScreen from './src/Home/Gestor/AgendamentoGestorScreen';
import BoletimDiarioMScreen from './src/Home/Medico/BoletimDiarioMScreen';
const Stack = createStackNavigator();

export default function App() {
 
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#17322D',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      ><Stack.Screen name ='Preload' component={PreloadScreen}options={{ headerShown: false }}  />
        <Stack.Screen name='Inicio' component={InicioScreen}options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro" component={CadastroScreen}options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="BoletimDiario" component={BoletimDiarioScreen} options={{ title: 'Boletim DiÃ¡rio', headerStyle: { backgroundColor: '#17322D' } }} />
        <Stack.Screen name="AgendamentoPacienteScreen" component={AgendamentoPacienteScreen} options={{ title: 'Inicio', headerStyle: { backgroundColor: '#17322D' } }} />
        <Stack.Screen name="NosconhecaScreen" component={NosconhecaScreen} options={{ title: 'Quem somos', headerStyle: { backgroundColor: '#17322D' } }} />
        <Stack.Screen name="Nossoguia" component={NossoguiaScreen} options={{ title: 'Nossoguia', headerStyle: { backgroundColor: '#17322D' } }} />
        <Stack.Screen name='BoletimDiarioMScreen'component={BoletimDiarioMScreen}/>
        <Stack.Screen name="RedefinirSenha" component={RedefinirSenhaScreen} options={{ title: 'Redefinir Senha', headerStyle: { backgroundColor: '#17322D' } }} />
        <Stack.Screen name="PerfilScreen" component={PerfilScreen} options={{ headerShown: false }} />
        <Stack.Screen name="SelecionarMedico" component={SelecionarMedicoScreen} />
        <Stack.Screen name='ContatoScreen' component={ContatoScreen}options={{ title: 'Contatos', headerStyle: { backgroundColor: '#17322D' } }} />
        <Stack.Screen name='HomePaciente' component={HomePacienteScreen} options={{ headerShown: false }} />
       <Stack.Screen name='HomeMedico' component={HomeMedicoScreen}options={{ headerShown: false }} />
        <Stack.Screen name="PopUpScreen" component={PopUpScreen} />
        <Stack.Screen name='ArquivosM' component={ArquivosM}/>
        <Stack.Screen name= 'AgendarConsultaScreen' component={AgendarConsultaScreen}/>
        <Stack.Screen name= 'ConfirmarScreen' component={ConfirmarScreen}/>
        <Stack.Screen name='AgendamentoGestorScreen' component={AgendamentoGestorScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}