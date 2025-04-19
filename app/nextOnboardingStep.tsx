import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';

// Static dropdown items
const AGE_ITEMS = [
  { label: '18-24', value: '18-24' },
  { label: '25-34', value: '25-34' },
  { label: '35-44', value: '35-44' },
  { label: '45-54', value: '45-54' },
  { label: '55+', value: '55+' },
];

const JOB_ITEMS = [
  { label: 'Doctor', value: 'Doctor' },
  { label: 'Teacher', value: 'Teacher' },
  { label: 'Lawyer', value: 'Lawyer' },
  { label: 'Engineer', value: 'Engineer' },
  { label: 'Nurse', value: 'Nurse' },
  { label: 'Accountant', value: 'Accountant' },
  { label: 'Architect', value: 'Architect' },
  { label: 'Police Officer', value: 'Police Officer' },
  { label: 'Journalist', value: 'Journalist' },
  { label: 'Other', value: 'Other' },
];

const STATE_ITEMS = [
  'Alabama',
  'Alaska',
  'Arizona',
  'Arkansas',
  'California',
  'Colorado',
  'Connecticut',
  'Delaware',
  'Florida',
  'Georgia',
  'Hawaii',
  'Idaho',
  'Illinois',
  'Indiana',
  'Iowa',
  'Kansas',
  'Kentucky',
  'Louisiana',
  'Maine',
  'Maryland',
  'Massachusetts',
  'Michigan',
  'Minnesota',
  'Mississippi',
  'Missouri',
  'Montana',
  'Nebraska',
  'Nevada',
  'New Hampshire',
  'New Jersey',
  'New Mexico',
  'New York',
  'North Carolina',
  'North Dakota',
  'Ohio',
  'Oklahoma',
  'Oregon',
  'Pennsylvania',
  'Rhode Island',
  'South Carolina',
  'South Dakota',
  'Tennessee',
  'Texas',
  'Utah',
  'Vermont',
  'Virginia',
  'Washington',
  'West Virginia',
  'Wisconsin',
  'Wyoming',
].map((v) => ({ label: v, value: v }));

const ETHNICITY_ITEMS = [
  { label: 'African', value: 'African' },
  { label: 'Asian', value: 'Asian' },
  { label: 'European', value: 'European' },
  { label: 'Middle Eastern', value: 'Middle Eastern' },
  { label: 'Hispanic/Latino', value: 'Hispanic/Latino' },
  { label: 'Indigenous', value: 'Indigenous' },
  { label: 'Pacific Islander', value: 'Pacific Islander' },
  { label: 'South Asian', value: 'South Asian' },
  { label: 'East Asian', value: 'East Asian' },
  { label: 'Mixed or Multiethnic', value: 'Mixed or Multiethnic' },
  { label: 'Prefer not to say', value: 'Prefer not to say' },
];

const DROPDOWN_ZINDEX = { age: 5000, job: 4000, state: 3000, ethnicity: 2000 };

export default function NextOnboardingStep() {
  const router = useRouter();
  const [formData, setFormData] = useState({ ageRange: '', jobRole: '', state: '', ethnicity: '' });

  // Track open and items state for each picker
  const [ageOpen, setAgeOpen] = useState(false);
  const [ageItems, setAgeItems] = useState(AGE_ITEMS);

  const [jobOpen, setJobOpen] = useState(false);
  const [jobItems, setJobItems] = useState(JOB_ITEMS);

  const [stateOpen, setStateOpen] = useState(false);
  const [stateItems, setStateItems] = useState(STATE_ITEMS);

  const [ethnicityOpen, setEthnicityOpen] = useState(false);
  const [ethnicityItems, setEthnicityItems] = useState(ETHNICITY_ITEMS);

  const canContinue =
    !!formData.ageRange && !!formData.jobRole && !!formData.state && !!formData.ethnicity;

  // close all open dropdowns
  const closeAll = () => {
    setAgeOpen(false);
    setJobOpen(false);
    setStateOpen(false);
    setEthnicityOpen(false);
  };

  const handleValueChange = (key) => (action) => {
    const newValue = typeof action === 'function' ? action(formData[key]) : action;
    setFormData((f) => ({ ...f, [key]: newValue }));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Pressable style={styles.container} onPress={closeAll}>
        {/* wrapper View stops Pressable from capturing dropdown taps */}
        <Text style={styles.header}>Create an Account</Text>

        <View style={styles.progressContainer}>
          <Text style={styles.stepText}>2 of 3</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFillStep2} />
          </View>
        </View>

        <Text style={styles.infoText}>
          We use your info to personalize news, bills, and actions relevant to you. Your data is
          secure and only used to enhance your experience.
        </Text>

        <Text style={styles.formQuestion}>Select your age range:</Text>
        <View style={{ zIndex: DROPDOWN_ZINDEX.age }}>
          <DropDownPicker
            open={ageOpen}
            value={formData.ageRange}
            items={ageItems}
            setOpen={setAgeOpen}
            setItems={setAgeItems}
            setValue={handleValueChange('ageRange')}
            placeholder="Select your age range"
            style={styles.dropdownField}
            dropDownContainerStyle={styles.dropdownContainer}
            maxHeight={150}
          />
        </View>

        <Text style={styles.formQuestion}>Which best describes your job or role?</Text>
        <View style={{ zIndex: DROPDOWN_ZINDEX.job }}>
          <DropDownPicker
            open={jobOpen}
            value={formData.jobRole}
            items={jobItems}
            setOpen={setJobOpen}
            setItems={setJobItems}
            setValue={handleValueChange('jobRole')}
            placeholder="Select your job or role"
            style={styles.dropdownField}
            dropDownContainerStyle={styles.dropdownContainer}
            maxHeight={150}
          />
        </View>

        <Text style={styles.formQuestion}>What state do you live in?</Text>
        <View style={{ zIndex: DROPDOWN_ZINDEX.state }}>
          <DropDownPicker
            open={stateOpen}
            value={formData.state}
            items={stateItems}
            setOpen={setStateOpen}
            setItems={setStateItems}
            setValue={handleValueChange('state')}
            placeholder="Select your state"
            style={styles.dropdownField}
            dropDownContainerStyle={styles.dropdownContainer}
            maxHeight={150}
          />
        </View>

        <Text style={styles.formQuestion}>Which best describes your ethnic background?</Text>
        <View style={{ zIndex: DROPDOWN_ZINDEX.ethnicity }}>
          <DropDownPicker
            open={ethnicityOpen}
            value={formData.ethnicity}
            items={ethnicityItems}
            setOpen={setEthnicityOpen}
            setItems={setEthnicityItems}
            setValue={handleValueChange('ethnicity')}
            placeholder="Select your ethnic background"
            style={styles.dropdownField}
            dropDownContainerStyle={styles.dropdownContainer}
            maxHeight={150}
          />
        </View>

        <TouchableOpacity
          style={[styles.continueButton, !canContinue && styles.continueButtonDisabled]}
          disabled={!canContinue}
          onPress={() => router.push('/finishOnboarding')}>
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
  container: { flex: 1, paddingHorizontal: 20, paddingTop: 20, paddingBottom: 100 },
  header: { fontSize: 18, fontWeight: '600', marginBottom: 40, textAlign: 'center' },
  progressContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  stepText: { marginRight: 16, color: '#666' },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E7EB',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFillStep2: { width: '66%', height: '100%', backgroundColor: '#4ade80' },
  infoText: { fontSize: 10, color: '#333', marginBottom: 40 },
  formQuestion: { fontSize: 16, fontWeight: '600', marginBottom: 6, color: '#222' },
  dropdownField: { backgroundColor: '#FAF7F3', padding: 12, borderRadius: 8, marginBottom: 16 },
  dropdownContainer: { backgroundColor: '#FAF7F3', borderRadius: 8 },
  continueButton: {
    backgroundColor: '#EF4444',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
    marginTop: 20,
  },
  continueButtonDisabled: { backgroundColor: '#fecaca' },
  continueButtonText: { fontSize: 16, color: '#FFF', fontWeight: '600' },
});
