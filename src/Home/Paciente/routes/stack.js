import { createStackNavigator } from "@react-navigation/stack";
import BoletimDiarioMScreen from "../../Medico/BoletimDiarioMScreen";
import HomePacienteScreen from "../HomePacienteScreen";
import NosconhecaScreen from "../../NosconhecaScreen";
import NossoguiaScreen from "../../Duvidas/NossoguiaScreen";
import { Agenda } from "../../../Module/BackOffice/Screen/Agenda";

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
                name="Agenda"
                component={Agenda}
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