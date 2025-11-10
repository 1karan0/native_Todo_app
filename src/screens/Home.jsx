import {
    Animated,
    Pressable,
    StyleSheet,
    Text,
    View,
    Easing,
} from 'react-native';
import React, { useState, useRef, useEffect } from 'react';
import AllItems from './AllItems';
import CreateItems from './CreateItems';
import { SafeAreaView } from 'react-native-safe-area-context';
import { firebase } from '../firebaseConfig';

const Home = ({navigation}) => {
    const [view, setview] = useState(0);
    const [data, setdata] = useState([
        { id: 1, name: 'Wheat', stock: 5, unit: 'kg' },
        { id: 2, name: 'Rice', stock: 10, unit: 'kg' },
        { id: 3, name: 'Black Rice', stock: 5, unit: 'kg' },
        { id: 4, name: 'Corn', stock: 12, unit: 'kg' },
        { id: 5, name: 'Potato', stock: 5, unit: 'kg' },
    ]);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.out(Easing.ease),
            useNativeDriver: true,
        }).start();
    }, []);

    const switchView = (val) => {
        setview(val);
        Animated.sequence([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start();
    };
    const handleLogout = async () => {
        try {
            await firebase.auth().signOut();
            navigation.replace('Home');
        } catch (error) {
            console.error('Logout error:', error.message);
        }
    };


    return (
        <SafeAreaView style={styles.container}>
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
                <View style={{ alignItems: 'flex-end', marginBottom: 20 }}>
                    <Pressable
                        onPress={handleLogout}
                        style={{
                            borderColor: '#24b04b',
                            borderWidth: 1,
                            paddingHorizontal: 14,
                            paddingVertical: 6,
                            borderRadius: 20,
                            backgroundColor: 'white',
                        }}
                    >
                        <Text style={{ color: '#24b04b', fontWeight: '600' }}>Logout</Text>
                    </Pressable>
                </View>
                <Text style={styles.title}>Dashboard</Text>
                <Text style={styles.subtitle}>
                    Manage your stock, track inventory, and stay updated.
                </Text>

                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.button, view === 0 && styles.activeButton]}
                        onPress={() => switchView(0)}
                    >
                        <Text
                            style={[styles.btntext, view === 0 && styles.activeButtonText]}
                        >
                            All Items
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, view === 1 && styles.activeButton]}
                        onPress={() => switchView(1)}
                    >
                        <Text
                            style={[styles.btntext, view === 1 && styles.activeButtonText]}
                        >
                            Low Stock
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[styles.button, view === 2 && styles.activeButton]}
                        onPress={() => switchView(2)}
                    >
                        <Text
                            style={[styles.btntext, view === 2 && styles.activeButtonText]}
                        >
                            Create
                        </Text>
                    </Pressable>
                </View>

                <Animated.View style={{ opacity: fadeAnim }}>
                    {view === 0 && <AllItems data={data} />}
                    {view === 1 && (
                        <AllItems data={data.filter((item) => item.stock < 10)} />
                    )}
                    {view === 2 && <CreateItems data={data} setdata={setdata} />}
                </Animated.View>
            </Animated.View>
        </SafeAreaView>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '15%',
        backgroundColor: '#f8fff9',
    },
    title: {
        fontSize: 26,
        fontWeight: '700',
        color: '#1b1b1b',
        marginBottom: 5,
    },
    subtitle: {
        fontSize: 15,
        color: '#777',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },
    button: {
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: '#1dd332b0',
        backgroundColor: 'white',
    },
    btntext: {
        fontSize: 13,
        color: '#1dd332b0',
        fontWeight: '500',
    },
    activeButton: {
        backgroundColor: '#1dd332b0',
    },
    activeButtonText: {
        color: 'white',
    },
});
