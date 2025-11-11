import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Easing,
} from 'react-native';
import React, { useRef, useEffect, use } from 'react';
import { firebase,auth } from '../firebaseConfig';

const HeroPage = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const imageScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Animate intro
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.spring(imageScale, {
          toValue: 1,
          friction: 4,
          tension: 70,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
  }, []);
  const user = auth().currentUser;


  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.header}>
          <Pressable style={[styles.loginbtn, user ? { display: 'none' }:{display: 'flex'}]}
            onPress={() => navigation.navigate("Login")}>
            <Text>Sign in</Text>
          </Pressable>
        </View>
        <Animated.Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/4762/4762314.png',
          }}
          style={[styles.heroImage, { transform: [{ scale: imageScale }] }]}
        />

        <Text style={styles.title}>Smart Stock Manager</Text>
        <Text style={styles.subtitle}>
          Simplify your business with effortless inventory tracking and instant
          low-stock alerts.
          Manage smarter, not harder.
        </Text>

        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>Track stock in real-time</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>Instant low-stock warnings</Text>
          </View>
          <View style={styles.featureItem}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.featureText}>Add and update items easily</Text>
          </View>
        </View>

        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          }}
        >
          <Pressable
            style={styles.button}
            onPress={() => {

              if (user) {
                navigation.replace('Dashboard');
              } else {
                navigation.navigate('Login');
              }
            }}
          >
            <Text style={styles.btnText}>Get Started</Text>
          </Pressable>

        </Animated.View>
      </Animated.View>
    </View>
  );
};

export default HeroPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fdf6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 25,
  },
  heroImage: {
    width: 150,
    height: 150,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#1b1b1b',
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  featureList: {
    marginBottom: 40,
    width: '100%',
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bullet: {
    fontSize: 18,
    color: '#24b04b',
    marginRight: 8,
  },
  featureText: {
    fontSize: 15,
    color: '#333',
  },
  button: {
    backgroundColor: '#24b04b',
    paddingVertical: 14,
    paddingHorizontal: 55,
    borderRadius: 35,
    shadowColor: '#24b04b',
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 6,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 17,
    letterSpacing: 0.5,
  },
  header: {
    width: '100%',
    alignItems: 'flex-end',
    position: 'absolute',
    top: -150,
    right: 25,
  },
  loginbtn: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#1dd332b0',
    backgroundColor: 'white',
  }
});
