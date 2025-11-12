import React, { useState, useRef, useEffect } from 'react';
import { Animated, Pressable, Text, View, Easing } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../firebaseConfig';
import { firestore, auth } from '../firebaseConfig';
import AllItems from './AllItems';
import CreateItems from './CreateItems';

const Home = ({ navigation }) => {
  const [view, setView] = useState(0);
  const [data, setData] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Animate on mount
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, []);

  // Fetch user items
  useEffect(() => {
    const userId = auth().currentUser.uid;
    const unsubscribe = firestore()
      .collection('items')
      .where('userId', '==', userId)
      .onSnapshot(querySnapshot => {
        const items = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(items);
      });

    return () => unsubscribe();
  }, []);

  // Switch between tabs
  const switchView = val => {
    setView(val);
    Animated.sequence([
      Animated.timing(fadeAnim, { toValue: 0, duration: 200, useNativeDriver: true }),
      Animated.timing(fadeAnim, { toValue: 1, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  // Logout
  const handleLogout = async () => {
    try {
      await auth().signOut();
      navigation.replace('Home');
    } catch (error) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-emerald-50 px-6 py-8">
      <Animated.View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [20, 0],
              }),
            },
          ],
        }}
      >
        {/* Header */}
        <View className="flex-row justify-between items-start mb-8">
          <View className="w-3/4">
            <Text className="text-3xl font-bold text-emerald-900">Dashboard</Text>
            <Text className="text-sm text-gray-500 mt-1">
              Manage your stock, track inventory, and stay updated.
            </Text>
          </View>

          <Pressable
            onPress={handleLogout}
            className="border border-emerald-500 bg-white px-4 py-1.5 rounded-full"
          >
            <Text className="text-emerald-600 font-semibold">Logout</Text>
          </Pressable>
        </View>

        {/* Button Group */}
        <View className="flex-row justify-around mb-5">
          {['All Items', 'Low Stock', 'Create'].map((label, idx) => (
            <Pressable
              key={label}
              onPress={() => switchView(idx)}
              className={`px-5 py-2 rounded-full border border-emerald-400 ${
                view === idx ? 'bg-emerald-500' : 'bg-white'
              }`}
            >
              <Text
                className={`font-medium text-sm ${
                  view === idx ? 'text-white' : 'text-emerald-500'
                }`}
              >
                {label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Animated content */}
        <Animated.View style={{ opacity: fadeAnim }}>
          {view === 0 && <AllItems data={data} />}
          {view === 1 && <AllItems data={data.filter(item => item.stock < 10)} />}
          {view === 2 && <CreateItems data={data} setdata={setData} />}
        </Animated.View>
      </Animated.View>
    </SafeAreaView>
  );
};

export default Home;
