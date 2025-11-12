import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { firebase } from '../firebaseConfig';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      await firebase.auth().createUserWithEmailAndPassword(email, password);
      navigation.replace('Dashboard');
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <View className="flex-1 justify-center items-center bg-gradient-to-b from-emerald-100 to-white px-6">
      <Text className="text-3xl font-bold text-emerald-700 mb-8">Create Account</Text>

      <View className="w-full max-w-sm">
        <TextInput
          placeholder="Email"
          placeholderTextColor="#777"
          value={email}
          onChangeText={setEmail}
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
          onPress={handleSignup}
          className="w-full bg-emerald-600 rounded-xl py-3"
        >
          <Text className="text-white text-center text-base font-semibold">Sign Up</Text>
        </Pressable>

        <View className="flex-row justify-center mt-6">
          <Text className="text-gray-600">Already have an account?</Text>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text className="text-emerald-600 font-semibold ml-1">Sign In</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
