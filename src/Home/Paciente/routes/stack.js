import { createStackNavigator } from "@react-navigation/stack";
import BoletimDiarioMScreen from "../../Medico/BoletimDiarioMScreen";
import HomePacienteScreen from "../HomePacienteScreen";
import AgendamentoPacienteScreen from "../AgendamentoPacienteScreen";

const Stack = createStackNavigator();
export const PacienteStack = () => {
    return (
        <Stack.Navigator
        initialRouteName="HomePacienteScreen"
        >
            <Stack.Screen
                name="HomePacienteScreen"
                component={HomePacienteScreen}
                options={{
                    title: "Boletim Diário",
                    headerStyle: { backgroundColor: "#17322D" },
                }}

            />
            <Stack.Screen
                name="BoletimDiario"
                component={BoletimDiarioMScreen}
                options={{
                    title: "Boletim Diário",
                    headerStyle: { backgroundColor: "#17322D" },
                }}

            />
            <Stack.Screen
                name="AgendamentoPacienteScreen"
                component={AgendamentoPacienteScreen}
                options={{
                    title: "Inicio",
                    headerStyle: { backgroundColor: "#17322D" },
                }}
            />
            <Stack.Screen
                name="NosconhecaScreen"
                component={NosconhecaScreen}
                options={{
                    title: "Quem somos",
                    headerStyle: { backgroundColor: "#17322D" },
                }}
            />
            <Stack.Screen
                name="Nossoguia"
                component={NossoguiaScreen}
                options={{
                    title: "Nossoguia",
                    headerStyle: { backgroundColor: "#17322D" },
                }}
            />
        </Stack.Navigator>
    );
}