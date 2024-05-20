import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { PacienteStack } from '../../../Home/Paciente/routes/stack';
import ArquivosScreen from '../../../Home/ArquivosScreen';
import PerfilScreen from '../../../Home/Paciente/PerfilScreen';
import { styles } from '../../../Home/Paciente/HomePacienteScreen';

const Tab = createBottomTabNavigator();

export const RootPacienteTab = () => {
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
                component={PacienteStack}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" size={size} color={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Arquivos"
                component={ArquivosScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="document-text" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={PerfilScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}
