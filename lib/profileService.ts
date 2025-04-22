//need to integrate with index.tsx to actually store user onboard info

import { collection, addDoc } from 'firebase/firestore';
import { db } from './firebaseConfig';
import {doc, updateDoc} from 'firebase/firestore';

type UserProfile = {
  age?: string;
  job?: string;
  state?: string;
  ethnicity?: string;
  topics?: string[];
  goalMinutes?: number;
  createdAt: Date;
};

export async function saveUserProfile(profile: UserProfile) {
  try {
    const docRef = await addDoc(collection(db, 'profiles'), {
      ...profile,
      createdAt: new Date()
    });
    console.log('Document written with ID:', docRef.id);
    return docRef.id;
  } catch (e) {
    console.error('Error adding document:', e);
    throw e;
  }
}

export async function updateUserInterests(docId: string, interests: string[]) {
    try {
      const docRef = doc(db, 'profiles', docId);
      await updateDoc(docRef, {
        interests,
      });
      console.log('Interests updated!');
    } catch (e) {
      console.error('Error updating interests:', e);
    }
  }