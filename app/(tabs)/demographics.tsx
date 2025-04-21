import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';

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
  { label: 'Software Developer', value: 'Software Developer' },
  { label: 'Data Scientist', value: 'Data Scientist' },
  { label: 'Marketing Manager', value: 'Marketing Manager' },
  { label: 'Sales Representative', value: 'Sales Representative' },
  { label: 'Project Manager', value: 'Project Manager' },
  { label: 'Business Analyst', value: 'Business Analyst' },
  { label: 'Graphic Designer', value: 'Graphic Designer' },
  { label: 'Consultant', value: 'Consultant' },
  { label: 'Customer Service Rep', value: 'Customer Service Rep' },
  { label: 'Human Resources', value: 'Human Resources' },
  { label: 'Retail Manager', value: 'Retail Manager' },
  { label: 'Chef', value: 'Chef' },
  { label: 'Mechanic', value: 'Mechanic' },
  { label: 'Technician', value: 'Technician' },
  { label: 'Receptionist', value: 'Receptionist' },
  { label: 'Pharmacist', value: 'Pharmacist' },
  { label: 'Dentist', value: 'Dentist' },
  { label: 'Veterinarian', value: 'Veterinarian' },
  { label: 'Judge', value: 'Judge' },
  { label: 'Prosecutor', value: 'Prosecutor' },
  { label: 'Public Defender', value: 'Public Defender' },
  { label: 'Court Administrator', value: 'Court Administrator' },
  { label: 'Probation Officer', value: 'Probation Officer' },
  { label: 'Corrections Officer', value: 'Corrections Officer' },
  { label: 'Legislator', value: 'Legislator' },
  { label: 'Senator', value: 'Senator' },
  { label: 'Representative', value: 'Representative' },
  { label: 'City Council Member', value: 'City Council Member' },
  { label: 'Lobbyist', value: 'Lobbyist' },
  { label: 'Union Member', value: 'Union Member' },
  { label: 'Small Business Owner', value: 'Small Business Owner' },
  { label: 'Landlord', value: 'Landlord' },
  { label: 'Tenant', value: 'Tenant' },
  { label: 'Farmer', value: 'Farmer' },
  { label: 'Veteran', value: 'Veteran' },
  { label: 'Gig Worker', value: 'Gig Worker' },
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
  { label: 'American', value: 'American' },
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

  const handleValueChange =
    (key: keyof typeof formData) => (action: ((prev: string) => string) | string) => {
      const newValue =
        typeof action === 'function' ? (action as (prev: string) => string)(formData[key]) : action;
      setFormData((f) => ({ ...f, [key]: newValue }));
    };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Pressable className="flex-1 px-5 pb-24 pt-5" onPress={closeAll}>
        {/* Header */}
        <Text className="mb-10 mt-4 text-center text-lg font-semibold">Create an Account</Text>

        {/* Progress */}
        <View className="mb-2.5 w-full flex-row items-center">
          <Text className="mr-4 text-xs text-gray-500">2 of 3</Text>
          <View className="h-1.5 flex-1 overflow-hidden rounded bg-gray-300">
            <View
              className="h-full bg-green-400"
              style={{ width: '67%' }} // width computed inline
            />
          </View>
        </View>
        <Text className="mb-10 text-xs text-gray-800">
          We use your info to personalize news, bills, and actions relevant to you. Your data is
          secure and only used to enhance your experience.
        </Text>
        <Text className="mb-1.5 text-base font-semibold text-gray-900">Select your age range:</Text>
        <View style={{ zIndex: DROPDOWN_ZINDEX.age }}>
          <DropDownPicker
            open={ageOpen}
            value={formData.ageRange}
            items={ageItems}
            setOpen={(open) => {
              closeAll();
              setAgeOpen(open);
            }}
            setItems={setAgeItems}
            setValue={handleValueChange('ageRange')}
            placeholder="Select your age range"
            style={{
              backgroundColor: '#FAF7F3',
              padding: 12,
              borderRadius: 8,
              marginBottom: 16,
            }}
            dropDownContainerStyle={{
              backgroundColor: '#FAF7F3',
              borderRadius: 8,
            }}
            maxHeight={150}
          />
        </View>
        <Text className="mb-1.5 text-base font-semibold text-gray-900">
          Which best describes your job or role?
        </Text>
        <View style={{ zIndex: DROPDOWN_ZINDEX.job }}>
          <DropDownPicker
            open={jobOpen}
            value={formData.jobRole}
            items={jobItems}
            setOpen={(open) => {
              closeAll();
              setJobOpen(open);
            }}
            setItems={setJobItems}
            setValue={handleValueChange('jobRole')}
            placeholder="Select your job or role"
            style={{
              backgroundColor: '#FAF7F3',
              padding: 12,
              borderRadius: 8,
              marginBottom: 16,
            }}
            dropDownContainerStyle={{
              backgroundColor: '#FAF7F3',
              borderRadius: 8,
            }}
            maxHeight={150}
          />
        </View>
        <Text className="mb-1.5 text-base font-semibold text-gray-900">
          What state do you live in?
        </Text>
        <View style={{ zIndex: DROPDOWN_ZINDEX.state }}>
          <DropDownPicker
            open={stateOpen}
            value={formData.state}
            items={stateItems}
            setOpen={(open) => {
              closeAll();
              setStateOpen(open);
            }}
            setItems={setStateItems}
            setValue={handleValueChange('state')}
            placeholder="Select your state"
            style={{
              backgroundColor: '#FAF7F3',
              padding: 12,
              borderRadius: 8,
              marginBottom: 16,
            }}
            dropDownContainerStyle={{
              backgroundColor: '#FAF7F3',
              borderRadius: 8,
            }}
            maxHeight={150}
          />
        </View>
        <Text className="mb-1.5 text-base font-semibold text-gray-900">
          Which best describes your ethnic background?
        </Text>
        <View style={{ zIndex: DROPDOWN_ZINDEX.ethnicity }}>
          <DropDownPicker
            open={ethnicityOpen}
            value={formData.ethnicity}
            items={ethnicityItems}
            setOpen={(open) => {
              closeAll();
              setEthnicityOpen(open);
            }}
            setItems={setEthnicityItems}
            setValue={handleValueChange('ethnicity')}
            placeholder="Select your ethnic background"
            style={{
              backgroundColor: '#FAF7F3',
              padding: 12,
              borderRadius: 8,
              marginBottom: 16,
            }}
            dropDownContainerStyle={{
              backgroundColor: '#FAF7F3',
              borderRadius: 8,
            }}
            maxHeight={150}
          />
        </View>
        <TouchableOpacity
          disabled={!canContinue}
          className={`mt-5 items-center rounded-2xl py-3 ${
            canContinue ? 'bg-red-500' : 'bg-red-200'
          }`}
          onPress={() => {
            router.push('/goal');
            // TODO: Save demographics to the database
          }}>
          <Text className="text-base font-semibold text-white">Continue</Text>
        </TouchableOpacity>
      </Pressable>
    </SafeAreaView>
  );
}
