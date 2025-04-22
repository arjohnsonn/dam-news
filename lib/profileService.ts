//need to integrate with index.tsx to actually store user onboard info

import { collection, addDoc, getDocs } from 'firebase/firestore';
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

export type SavedImpact = {
    id: string;
    title: string;
    date: string;
    summary: string;
    highlights?: string[];
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

  export async function getUserImpact(docId: string) {
    const impactsRef = collection(db, 'profiles', docId, 'impacts');
    const snapshot = await getDocs(impactsRef);

    return snapshot.docs.map((doc) => {
        const data = doc.data(); // <-- extract data first
        return {
          id: doc.id,
          title: data.title,
          date: data.date,
          summary: data.summary,
          highlights: data.highlights || [],
        };
      });

  }

  export async function addImpactToProfile(docId: string, impact: Omit<SavedImpact, 'id'>) {
    try {
      const impactsRef = collection(db, 'profiles', docId, 'impacts');
      await addDoc(impactsRef, impact);
      console.log('Impact added to Firestore');
    } catch (e) {
      console.error('Error adding impact:', e);
    }
  }

  export async function saveArticle(docId: string, article: { title: string; summary: string; url: string }) {
    try {
      const articlesRef = collection(db, 'profiles', docId, 'savedArticles');
      await addDoc(articlesRef, {
        ...article,
        savedAt: new Date()
      });
      console.log('Article saved successfully');
    } catch (e) {
      console.error('Error saving article:', e);
    }
  }
  
  