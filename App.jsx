import { SafeAreaViewBase, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Home from './src/screens/Home'
import { SafeAreaView } from 'react-native-safe-area-context'

const App = () => {
  return (
    <SafeAreaView>
      <Home/>
    </SafeAreaView>
  )
}

export default App

const styles = StyleSheet.create({})