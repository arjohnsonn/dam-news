//need to integrate with index.tsx to actually store user onboard info

import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';

type UserProfile = {
  age: number;
  interests: string[];
  createdAt: Date;
};

export async function saveUserProfile(profile: UserProfile) {
  try {
    const docRef = await addDoc(collection(db, 'profiles'), {
      ...profile,
      createdAt: new Date()
    });
    console.log('Document written with ID:', docRef.id);
  } catch (e) {
    console.error('Error adding document:', e);
  }
}
