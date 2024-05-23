import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PacienteStack } from './stack';
import { styles } from '../HomePacienteScreen';
import { Ionicons } from '@expo/vector-icons';
import ArquivoPaciente from '../../.././Module/BackOffice/Component/ArquivoPaciente';
import PerfilPM from '../../../Module/BackOffice/Component/PerfilPM';

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
                name="Home"
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
                component={ArquivoPaciente}
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