import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, StyleSheet, Alert } from 'react-native';
import { signIn, signUp } from '../services/authService';

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignIn = async () => {
        try {
            await signIn(email, password);
            navigation.replace('Dashboard');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    const handleSignUp = async () => {
        try {
            await signUp(email, password);
            navigation.replace('Dashboard');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Email"
                placeholderTextColor="#888"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor="#888"
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry
            />

            <Pressable style={styles.btn} onPress={handleSignIn}>
                <Text style={styles.btnText}>Sign In</Text>
            </Pressable>

            <Pressable style={[styles.btn, { backgroundColor: '#24b04b' }]} onPress={handleSignUp}>
                <Text style={styles.btnText}>Sign Up</Text>
            </Pressable>
        </View>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 30,
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        color: '#000',
    },
    btn: {
        backgroundColor: '#222',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginBottom: 10,
    },
    btnText: {
        color: 'white',
        fontWeight: '600',
        fontSize: 16,
    },
});
