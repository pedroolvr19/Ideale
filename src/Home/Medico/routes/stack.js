import { createStackNavigator } from "@react-navigation/stack";
import BoletimGestor from "../../../Module/BackOffice/Component/BoletimGestor";
import HomeMedicoScreen from "../HomeMedicoScreen";
import { Agenda } from "../../../Module/BackOffice/Screen/Agenda";
import ArquivoMedico from "../../../Module/BackOffice/Component/ArquivoMedico";
const Stack = createStackNavigator();
export const MedicoStack = () => {
    return (
        <Stack.Navigator initialRouteName="HomeMedico" screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="HomeMedico"
                component={HomeMedicoScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="BoletimGestor"
                component={BoletimGestor}
            />
            <Stack.Screen name="Arquivos" component={ArquivoMedico} />
            <Stack.Screen
                name="Agenda"
                component={Agenda}
            />
        </Stack.Navigator>
    );
}