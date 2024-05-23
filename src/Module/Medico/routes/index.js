import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../HomeMedicoScreen';
import { MedicoStack } from './stack';
import ArquivoMedico from '../../BackOffice/Component/ArquivoMedico';
import PerfilPM from '../../BackOffice/Component/PerfilPM';
const Tab = createBottomTabNavigator();
export const RootMedicoTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            tabBarOptions={{
                activeTintColor: '#308168',
                inactiveTintColor: '#308168',
                style: styles.tabBar,
                labelStyle: styles.tabLabel,
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={MedicoStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Arquivos"
                component={ArquivoMedico}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={PerfilPM}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}