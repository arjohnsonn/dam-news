// LastOnboardingStep.js
import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useRouter } from 'expo-router';
import Slider from '@react-native-community/slider';

export default function LastOnboardingStep() {
  const router = useRouter();
  const [minutes, setMinutes] = useState(30);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Header */}
        <Text style={styles.header}>Create an Account</Text>

        {/* Progress */}
        <View style={styles.progressContainer}>
          <Text style={styles.stepText}>3 of 3</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
        </View>

        {/* Title & Subtitle */}
        <Text style={styles.title}>Set your daily goal to start your streak</Text>
        <Text style={styles.subtitle}>
          How much time would you like to spend reading each day?
        </Text>

        {/* Numeric Display */}
        <Text style={styles.valueText}>{minutes}</Text>

        {/* Slider */}
        <Slider
          style={styles.slider}
          minimumValue={5}
          maximumValue={120}
          step={5}
          value={minutes}
          onValueChange={setMinutes}
          minimumTrackTintColor="#4ade80"
          maximumTrackTintColor="#d1f5d3"
          thumbTintColor="#FFFFFF"
        />

        {/* Helper Text */}
        <Text style={styles.helperText}>Please use the slider</Text>

        {/* Continue Button */}
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.push('/home')}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 100,
  },
  header: { fontSize: 18, fontWeight: '600', marginBottom: 40, marginTop: 16, textAlign: 'center' },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  stepText: {
    marginRight: 16,
    color: '#666',
    fontSize: 14,
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#4ade80',
  },
  title: {
    fontSize: 35,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    paddingLeft: '40',
    paddingRight: '40',
    marginBottom: 24,
  },
  valueText: {
    fontSize: 64,
    fontWeight: '700',
    marginBottom: 16,
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    height: 20,         // <-- taller track
    marginBottom: 8,
  },
  helperText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
});