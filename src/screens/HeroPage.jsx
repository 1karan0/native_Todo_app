import { Pressable, StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const HeroPage = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={{ uri: 'https://cdn-icons-png.flaticon.com/512/4762/4762314.png' }}
          style={styles.heroImage}
        />
        <Text style={styles.title}>Smart Stock Manager</Text>
        <Text style={styles.subtitle}>
          Track inventory, manage low stock, and stay ahead with real-time insights.
        </Text>

        <Pressable style={styles.button} onPress={() => navigation.navigate('Dashboard')}>
          <Text style={styles.btnText}>Get Started</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default HeroPage

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
    width: 140,
    height: 140,
    marginBottom: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1c1c1c',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
    color: '#555',
    textAlign: 'center',
    marginBottom: 40,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#24b04b',
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 30,
    shadowColor: '#24b04b',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  btnText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
})
