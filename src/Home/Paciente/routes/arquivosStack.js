import { createStackNavigator } from "@react-navigation/stack";
import { ArquivoDoPaciente } from "../../../Module/Paciente/screens/ArquivoDoPaciente";
import ArquivoPaciente from "../../../Module/BackOffice/Component/ArquivoPaciente";

const Stack = createStackNavigator();

export const ArquivosStack = () => {
    return (
        <Stack.Navigator
        initialRouteName="ArquivosHome"
        >
            <Stack.Screen
                name="ArquivosHome"
                component={ArquivoPaciente}
                options={{ headerShown: false }}
                

            />
            <Stack.Screen
                name="ArquivosDoPaciente"
                component={ArquivoDoPaciente}
            />
        
        </Stack.Navigator>
    );
}