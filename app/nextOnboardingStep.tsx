import React, { useState } from 'react';
import { 
  SafeAreaView, 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet
} from 'react-native';
import { Button } from '~/components/nativewindui/Button';
import { useRouter } from 'expo-router';

export default function NextOnboardingStep() {
  const router = useRouter();

  // If you have any form logic or stored answers, handle them here
  const [formData, setFormData] = useState({
    ageRange: '',
    jobRole: '',
    state: '',
    ethnicity: '',
  });

  // Example placeholder function to update a field
  function handleSelect(fieldName: string, value: string) {
    setFormData(prev => ({ ...prev, [fieldName]: value }));
  }

  // For enabling/disabling Continue, check if all fields are filled, etc.
  const canContinue = true; // Adjust logic if needed.

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Top Header */}
        <Text style={styles.header}>Create an Account</Text>

        {/* Progress bar and step text for step 2 */}
        <View style={styles.progressContainer}>
          <Text style={styles.stepText}>2 of 3</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFillStep2} />
          </View>
        </View>

        {/* Explanation Text */}
        <Text style={styles.infoText}>
          We use your info to personalize news, bills, and actions relevant to you. 
          Your data is secure and only used to enhance your experience.
        </Text>

        {/* Four questions similar to the first screenshot */}
        <Text style={styles.formQuestion}>Select your age range:</Text>
        <TouchableOpacity 
          style={styles.dropdownField} 
          onPress={() => handleSelect('ageRange', '25-34')}>
          <Text style={styles.dropdownPlaceholder}>
            {formData.ageRange ? formData.ageRange : 'Select your age range'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.formQuestion}>Which best describes your job or role?</Text>
        <TouchableOpacity 
          style={styles.dropdownField} 
          onPress={() => handleSelect('jobRole', 'Student')}>
          <Text style={styles.dropdownPlaceholder}>
            {formData.jobRole ? formData.jobRole : 'Select your job or role'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.formQuestion}>What state do you live in?</Text>
        <TouchableOpacity 
          style={styles.dropdownField} 
          onPress={() => handleSelect('state', 'California')}>
          <Text style={styles.dropdownPlaceholder}>
            {formData.state ? formData.state : 'Select your state'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.formQuestion}>Which best describes your ethnic background?</Text>
        <TouchableOpacity 
          style={styles.dropdownField} 
          onPress={() => handleSelect('ethnicity', 'Hispanic')}>
          <Text style={styles.dropdownPlaceholder}>
            {formData.ethnicity ? formData.ethnicity : 'Select your ethnic background'}
          </Text>
        </TouchableOpacity>

        {/* Continue button */}
        <TouchableOpacity 
          style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
          disabled={!canContinue}
          onPress={() => {
            console.log('Continue pressed, formData:', formData);
            // For example, navigate to the next step or finish onboarding:
            router.push('/finishOnboarding');
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
    marginBottom: 10,
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
  // For step 2, the fill is 66% width
  progressFillStep2: {
    width: '66%',
    height: '100%',
    backgroundColor: '#4ade80',
  },
  // Explanation text, similar to first screenshot
  infoText: {
    fontSize: 10,
    color: '#333',
    marginBottom: 40,
  },
  // Each question label
  formQuestion: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 6,
    color: '#222',
  },
  // The field that looks like a dropdown
  dropdownField: {
    backgroundColor: '#FAF7F3',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    justifyContent: 'center',
  },
  dropdownPlaceholder: {
    fontSize: 14,
    color: '#666',
  },
  continueButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 20,
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