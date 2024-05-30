import { NavigationContainer } from "@react-navigation/native";
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import RedefinirSenhaScreen from '../Login/RedefinirSenhaScreen';
import InicioScreen from '../Login/InicioScreen';
import PreloadScreen from '../Login/PreloadScreen';
import { RootPacienteTab } from "../Home/Paciente/routes";
import { RootMedicoTab } from "../Home/Medico/routes";
import PerfilPM from "../Module/BackOffice/Component/PerfilPM";
import { Login } from "../Module/Auth/screens/Login";
import { Cadastro } from "../Module/Auth/screens/Cadastro";

const Stack = createStackNavigator();

export const RootNavigate = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const userEmail = auth().currentUser?.email;
  const handleStateChange = (userPlayload) => {
    setUser(userPlayload);
    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    const subscribe = auth().onAuthStateChanged(handleStateChange);
    return subscribe;
  }, []);

  const handleUserType = () => {
    return (
      <>
        {
          userEmail.endsWith("@ideale.com")
            ? (
              <Stack.Screen
                name="HomeMedico"
                component={RootMedicoTab}
                options={{ headerShown: false }}
              />
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
          component={PerfilPM}
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
            <>
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
                component={Cadastro}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Login"
                component={Login}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="RedefinirSenha"
                component={RedefinirSenhaScreen}
                options={{ headerShown: false }}
              />
            </>
          )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
