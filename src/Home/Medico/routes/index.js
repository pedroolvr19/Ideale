import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../HomeMedicoScreen';
import { MedicoStack } from './stack';
import ArquivoMedico from '../../.././Module/BackOffice/Component/ArquivoMedico';
import PerfilPM from '../../../Module/BackOffice/Component/PerfilPM';
const Tab = createBottomTabNavigator();
export const RootMedicoTab = () => {
    return (
        <Tab.Navigator
            initialRouteName="HomeTab"
            screenOptions={{
              tabBarActiveTintColor: '#308168',
              tabBarInactiveTintColor: '#308168',
              tabBarStyle: styles.tabBar,
            }}
        >
            <Tab.Screen
                name="Home"
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
                    headerShown: false
                }}
            />
            <Tab.Screen
                name="Perfil"
                component={PerfilPM}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people" size={size} color={color} />
                    ),
                    headerShown: false
                }}
            />
        </Tab.Navigator>
    );
}