import React, { useState } from 'react';
import { View, TextInput, Pressable, Text, Alert } from 'react-native';
import { signIn } from '../services/authService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = async () => {
    try {
      setLoading(true);
      await signIn(email, password);
      setLoading(false);
      navigation.replace('Dashboard');
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gradient-to-b from-emerald-100 to-white px-6">
      <Text className="text-3xl font-bold text-emerald-700 mb-8">Welcome Back</Text>

      <View className="w-full max-w-sm">
        <TextInput
          placeholder="Email"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 mb-4 text-gray-800 shadow-sm"
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#777"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          className="w-full border border-gray-300 bg-white rounded-xl px-4 py-3 mb-6 text-gray-800 shadow-sm"
        />

        <Pressable
          onPress={handleSignIn}
          className={`w-full rounded-xl py-3 ${
            loading ? 'bg-emerald-300' : 'bg-emerald-600'
          }`}
        >
          <Text className="text-white text-center text-base font-semibold">
            {loading ? 'Signing in...' : 'Sign In'}
          </Text>
        </Pressable>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Don't have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Signup')}>
            <Text className="text-emerald-600 font-semibold ml-1">Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
