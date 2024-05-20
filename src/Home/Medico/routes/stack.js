import { createStackNavigator } from "@react-navigation/stack";
import BoletimDiarioMScreen from "../BoletimDiarioMScreen";
import ArquivosM from "../ArquivosM";
import HomeMedicoScreen from "../HomeMedicoScreen";
import { Agenda } from "../../../Module/BackOffice/Screen/Agenda";
const Stack = createStackNavigator();
export const MedicoStack = () => {
    return (
        <Stack.Navigator initialRouteName="HomeMedico" screenOptions={{ headerShown: false }}>
            <Stack.Screen
                name="HomeMedico"
                component={HomeMedicoScreen}
            />
            <Stack.Screen
                name="BoletimDiarioMScreen"
                component={BoletimDiarioMScreen}
            />
            <Stack.Screen name="ArquivosM" component={ArquivosM} />
            <Stack.Screen
                name="Agenda"
                component={Agenda}
            />
        </Stack.Navigator>
    );
}