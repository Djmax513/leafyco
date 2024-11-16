import React from 'react'
import { Stack } from 'expo-router'
import { StyleSheet, View } from 'react-native'

import { ScreenContent } from '~/components/ScreenContent';

export default function ProfilePage() {
  return (
    <>
      <Stack.Screen options={{ title: 'Perfil' }} />
      <View style={styles.container}>
        
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
});