import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import BoletimDiarioScreen from '../Home/Boletim/MeuBoletimScreen';
import NossoguiaScreen from '../Home/Duvidas/NossoguiaScreen';
import AgendamentoPacienteScreen from '../Home/Paciente/AgendamentoPacienteScreen';
import NosconhecaScreen from '../Home/NosconhecaScreen';
import RedefinirSenhaScreen from '../Login/RedefinirSenhaScreen';
import LoginScreen from '../Login/LoginScreen';
import PerfilScreen from '../Home/Medico/Perfilmedico';
import SelecionarMedicoScreen from '../Home/Agendamento/SelecionarMedicoScreen';
import ContatoScreen from '../Home/Duvidas/ContatoScreen';
import HomePacienteScreen from '../Home/Paciente/HomePacienteScreen';
import HomeMedicoScreen from '../Home/Medico/HomeMedicoScreen';
import PopUpScreen from '../Home/Medico/BoletimDiarioMScreen';
import ArquivosM from '../Home/Medico/ArquivosM';
import AgendarConsultaScreen from '../Home/Paciente/AgendarConsultaScreen';
import ConfirmarScreen from '../Home/Paciente/ConfirmarScreen';
import CadastroScreen from '../Login/CadastroScreen';
import InicioScreen from '../Login/InicioScreen';
import PreloadScreen from '../Login/PreloadScreen';
import AgendamentoGestorScreen from '../Home/Gestor/AgendamentoGestorScreen';
import BoletimDiarioMScreen from '../Home/Medico/BoletimDiarioMScreen';
import { RootPacienteTab } from "../Home/Paciente/routes";


const Stack = createStackNavigator();

export const RootNavigate = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const userEmail = auth().currentUser.email;
  const handleStateChange = (userPlayload) => {
    setUser(userPlayload);
    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(handleStateChange);
    return subscribe;
  }, []);

  const StackMedico = () => {
    return (
      <>
        <Stack.Screen
          name="BoletimDiarioMScreen"
          component={BoletimDiarioMScreen}
        />
        <Stack.Screen
          name="HomeMedico"
          component={HomeMedicoScreen}
          options={{ headerShown: true }}
        />
        <Stack.Screen name="PopUpScreen" component={PopUpScreen} />
        <Stack.Screen name="ArquivosM" component={ArquivosM} />
        <Stack.Screen name="ConfirmarScreen" component={ConfirmarScreen} />
        <Stack.Screen
          name="AgendamentoGestorScreen"
          component={AgendamentoGestorScreen}
        />
      </>
    );
  }

  const handleUserType = () => {
    return (
      <>
        {
          email.endsWith("@ideale.com")
            ? (
              <StackMedico />
            ) : (
              <Stack.Screen
                name="HomePaciente"
                component={RootPacienteTab}
                options={{ headerShown: false }}
              />
            )
        }
        <Stack.Screen
          name="PerfilScreen"
          component={PerfilScreen}
          options={{ headerShown: false }}
        />
      </>
    );

  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#17322D",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        {user ?
          handleUserType() : (
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#17322D",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            >
              <Stack.Screen
                name="Preload"
                component={PreloadScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Inicio"
                component={InicioScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Cadastro"
                component={CadastroScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RedefinirSenha"
                component={RedefinirSenhaScreen}
                options={{
                  title: "Redefinir Senha",
                  headerStyle: { backgroundColor: "#17322D" },
                }}
              />
            </Stack.Navigator>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
