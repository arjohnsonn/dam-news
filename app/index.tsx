import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet
} from 'react-native';
import { Button } from '~/components/nativewindui/Button';
import { useRouter } from 'expo-router'; // For Expo Router navigation

// List of topics
const topics = [
  'Arts & Culture',
  'Human Rights',
  'Tech',
  'Health & Wellness',
  'Environment & Sustainability',
  'Animal Wellness',
  'Education',
  'Mental Health',
  'Science',
  'Disaster Relief',
  'Economics',
  'Politics',
  'Sports',
  'Fashion',
  'Entertainment',
  'Media',
  'Travel',
  'Crime',
  'Housing',
  'Immigration',
  'Transportation',
  'Innovation',
  'Startups',
  'Space',
  'Diversity',
  'Law',
  'Justice',
  'Religion',
  'Cybersecurity',
  'Privacy',
  'Employment',
  'Gender',
  'Military',
];

export default function TopicsScreen() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const router = useRouter();

  function toggleTopic(topic: string) {
    setSelectedTopics(prev =>
      prev.includes(topic)
        ? prev.filter(item => item !== topic)
        : [...prev, topic]
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header */}
        <Text style={styles.header}>Create an Account</Text>

        {/* Progress bar and step text */}
        <View style={styles.progressContainer}>
          <Text style={styles.stepText}>1 of 3</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>

        {/* Sub-header */}
        <Text style={styles.subHeader}>Choose the topics you want to explore</Text>

        {/* Horizontal ScrollView wrapping a multi-row grid */}
        <ScrollView 
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipsScrollContent}
        >
          {/* A wide container so that chips wrap into multiple rows */}
          <View style={styles.chipsContainer}>
            {topics.map(topic => {
              const isSelected = selectedTopics.includes(topic);
              return (
                <TouchableOpacity
                  key={topic}
                  onPress={() => toggleTopic(topic)}
                  style={[
                    styles.chip, 
                    isSelected && styles.chipSelected
                  ]}
                >
                  <Text 
                    style={[
                      styles.chipText,
                      isSelected && styles.chipTextSelected
                    ]}
                  >
                    {topic}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>

        {/* Continue button */}
        <TouchableOpacity 
          style={[
            styles.continueButton, 
            selectedTopics.length === 0 && styles.continueButtonDisabled
          ]}
          disabled={selectedTopics.length === 0}
          onPress={() => {
            console.log('Continue pressed, selected:', selectedTopics);
            router.push('/nextOnboardingStep'); // Navigate to next step
          }}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 40,
    textAlign: 'center',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  stepText: {
    marginRight: 16,
    color: '#666',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    width: '33%', // 1/3 step (step 1)
    height: '100%',
    backgroundColor: '#4ade80',
  },
  subHeader: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 25,
    color: '#222',
    textAlign: 'left',
  },
  chipsScrollContent: {
    paddingVertical: 10,
  },
  chipsContainer: {
    width: 1000,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    marginRight: 12,
    marginBottom: 30,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#c3edec',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chipSelected: {
    backgroundColor: '#76b5c5',
  },
  chipText: {
    color: '#333',
    fontWeight: '500',
    textAlign: 'center',
  },
  chipTextSelected: {
    color: '#065f46',
  },
  continueButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginBottom: 100,
  },
  continueButtonDisabled: {
    backgroundColor: '#fecaca',
  },
  continueButtonText: {
    fontSize: 16,
    color: '#FFF',
    fontWeight: '600',
  },
});