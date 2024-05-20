import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ArquivosM from '../ArquivosM';
import PerfilScreen from '../Perfilmedico';
import { Ionicons } from '@expo/vector-icons';
import { styles } from '../HomeMedicoScreen';
import { MedicoStack } from './stack';
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
                component={ArquivosM}
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