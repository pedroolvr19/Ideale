import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './styles';
import { signUpService } from '../../services/signUp';
import { useNavigation } from '@react-navigation/native'; // Importe o hook useNavigation

export const Cadastro = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');
    const [nome, setNome] = useState('');
    const [numeroPaciente, setNumeroPaciente] = useState('');
    const [senhaVisivel, setSenhaVisivel] = useState(false);
    const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);

    const navigation = useNavigation(); // Use o hook useNavigation para obter o objeto navigation

    const lidarComCriacaoConta = async () => {
        await signUpService({confirmarSenha, email, nome, senha, numero: numeroPaciente});
    }

    return (
        <LinearGradient
            colors={['#10C2A2', '#11D26E']}
            style={styles.container}
        >
            <View style={styles.container}>
                <Image
                    source={require('../../../../../assets/logos/logo2.png')}
                    style={styles.logo}
                />
                <Text style={styles.title}>Criar Conta</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Nome"
                    value={nome}
                    onChangeText={setNome}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Número para Contato"
                    keyboardType="numeric"
                    value={numeroPaciente}
                    onChangeText={setNumeroPaciente}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Senha"
                        secureTextEntry={!senhaVisivel}
                        value={senha}
                        onChangeText={setSenha}
                    />
                    <TouchableOpacity onPress={() => setSenhaVisivel(!senhaVisivel)}>
                        <Ionicons name={senhaVisivel ? "eye-off" : "eye"} size={24} color="#17322D" />
                    </TouchableOpacity>
                </View>
                <View style={styles.passwordContainer}>
                    <TextInput
                        style={styles.inputPassword}
                        placeholder="Confirmar Senha"
                        secureTextEntry={!confirmarSenhaVisivel}
                        value={confirmarSenha}
                        onChangeText={setConfirmarSenha}
                    />
                    <TouchableOpacity onPress={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)}>
                        <Ionicons name={confirmarSenhaVisivel ? "eye-off" : "eye"} size={24} color="#17322D" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.button} onPress={lidarComCriacaoConta}>
                    <Text style={styles.buttonText}>Criar Conta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.footerLink}>Já tem uma conta? Faça login</Text>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
}