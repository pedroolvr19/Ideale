import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, Modal } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { signInService } from '../../services/signIn';

export const Login = ({ navigation }) => { // Adicione 'navigation' como parâmetro
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [isChecked, setIsChecked] = useState(false); // Estado para verificar se os termos foram aceitos

    const handleOpenTermsModal = () => {
        setShowTermsModal(true);
    };

    const handleCloseTermsModal = () => {
        setShowTermsModal(false);
    };

    const handleEsqueciSenha = () => {
        navigation.navigate("RedefinirSenha");
    };

    const handleCheckboxPress = () => {
        setIsChecked(!isChecked);
    };

    const handleSignIn = async () => {
        await signInService({ email, senha, isChecked });
    }

    return (
        <LinearGradient
            colors={["#10C2A2", "#11D26E"]}
            style={styles.container}
        >
            <View style={styles.content}>
                <Image
                    source={require("../../../../../assets/logos/logo2.png")}
                    style={styles.logo}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                />
                <View style={styles.checkboxContainer}>
                    <TouchableOpacity onPress={handleCheckboxPress}>
                        <View
                            style={[styles.checkbox, isChecked ? styles.checked : null]}
                        />
                    </TouchableOpacity>
                    <Text style={styles.checkboxLabel}>Aceito os termos</Text>
                </View>
                <TouchableOpacity onPress={handleOpenTermsModal}>
                    <Text style={styles.openTermsButton}>Ver Termos</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignIn}
                    disabled={!isChecked}
                >
                    <Text style={styles.buttonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleEsqueciSenha}>
                    <Text style={styles.footerLink}>Esqueci minha senha</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
                    <Text style={styles.footerLink}>Não tem uma conta? Cadastre-se</Text>
                </TouchableOpacity>

                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showTermsModal}
                    onRequestClose={handleCloseTermsModal}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalText}>Termos e Condições</Text>
                            <Text style={styles.modalText}>
                                A Lei Geral de Proteção de Dados (LGPD) exige que o aplicativo
                                solicite o consentimento do usuário para coletar, armazenar e
                                processar seus dados pessoais. Isso inclui informar claramente
                                como os dados serão usados, quem terá acesso a eles e como o
                                usuário pode exercer seus direitos de privacidade, como acessar,
                                corrigir ou excluir seus dados. O aplicativo também deve
                                garantir medidas de segurança para proteger esses dados contra
                                acessos não autorizados ou vazamentos. Ao aceitar os termos da
                                LGPD, o usuário está concordando com essas práticas de proteção
                                de dados.
                            </Text>
                            <TouchableOpacity onPress={handleCloseTermsModal}>
                                <Text style={styles.acceptButton}>Aceitar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        </LinearGradient>
    );
}
