import { createStackNavigator } from "@react-navigation/stack";
import BoletimPaciente from "../../../Module/BackOffice/Component/BoletimPaciente";
import HomePacienteScreen from "../HomePacienteScreen";
import NosconhecaScreen from "../../NosconhecaScreen";
import NossoguiaScreen from "../Nossoguia/Nossoguia";
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
                options={{ headerShown: false }}
                

            />
            <Stack.Screen
                name="BoletimPaciente"
                component={BoletimPaciente}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Agenda"
                component={Agenda}
                options={{ headerShown: false }}
                    
            
                
            />
            <Stack.Screen
                name="NosconhecaScreen"
                component={NosconhecaScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Nossoguia"
                component={NossoguiaScreen}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    );
}
