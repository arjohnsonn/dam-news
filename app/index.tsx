import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Button } from '~/components/nativewindui/Button';
import { LinearGradient } from 'expo-linear-gradient';

// Updated list of interests with many entries.
const interests = [
  'World News',
  'Technology',
  'Business',
  'Politics',
  'Health',
  'Science',
  'Entertainment',
  'Sports',
  'Environment',
  'Fashion',
  'Lifestyle',
  'Finance',
  'Education',
  'Travel',
  'Culture',
  'Local News',
  'Music',
  'Art',
  'History',
  'Food',
  'Gaming',
  'Comedy',
  'DIY',
  'Fitness',
  'Parenting',
  'Literature',
  'Nature',
  'Other',
];

// Define dull gradient colors for chips.
const chipGradientUnselected = ['#A1A1AA', '#D4D4D8']; // Dull gray gradient
const chipGradientSelected = ['#4B5563', '#1F2937']; // Darker gray gradient

export default function InterestsSelection() {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev =>
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  return (
    <LinearGradient colors={['#000000', '#1F2937']} style={styles.background}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* Header */}
          <Text style={styles.header}>Choose Your Interests</Text>

          {/* Scrollable chips arranged in two columns */}
          <ScrollView contentContainerStyle={styles.chipsContainer}>
            {interests.map((interest) => {
              const isSelected = selectedInterests.includes(interest);
              return (
                <TouchableOpacity
                  key={interest}
                  onPress={() => toggleInterest(interest)}
                  style={styles.chipWrapper}
                >
                  <LinearGradient
                    colors={isSelected ? chipGradientSelected : chipGradientUnselected}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.chip}
                  >
                    <Text style={styles.chipText}>{interest}</Text>
                  </LinearGradient>
                </TouchableOpacity>
              );
            })}
          </ScrollView>

          {/* Continue button */}
          <Button
            disabled={selectedInterests.length === 0}
            style={styles.continueButton}
            onPress={() => {
              console.log('Selected interests:', selectedInterests);
              // navigation.navigate('NextStep'); // Uncomment if using navigation
            }}
          >
            <Text style={styles.continueText}>Continue</Text>
          </Button>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#FFF',
    textAlign: 'center',
  },
  chipsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  chipWrapper: {
    width: '45%',           // Two columns
    marginBottom: 20,        // Increased vertical spacing
    marginHorizontal: 4,
  },
  chip: {
    paddingVertical: 20,
    borderRadius: 9999,
    alignItems: 'center',
  },
  chipText: {
    fontSize: 18,
    color: '#FFF',
    fontWeight: '500',
  },
  continueButton: {
    //paddingTop: 20,
    marginTop: 7,
    marginBottom: 25,
    backgroundColor: '#8B5CF6',
    paddingVertical: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  continueText: {
    color: '#FFF',
    fontWeight: '600',
    fontSize: 20,
  },
});