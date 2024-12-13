import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Investment } from '../types/investment';

export function useInvestments() {
  const [investments, setInvestments] = useState<Investment[]>([]);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const q = query(
      collection(db, 'investments'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const investmentData: Investment[] = [];
      snapshot.forEach((doc) => {
        investmentData.push({ 
          id: doc.id, 
          ...doc.data(),
          date: doc.data().date.toDate(),
          createdAt: doc.data().createdAt.toDate(),
          updatedAt: doc.data().updatedAt.toDate()
        } as Investment);
      });
      setInvestments(investmentData.sort((a, b) => b.date.getTime() - a.date.getTime()));
    });

    return () => unsubscribe();
  }, []);

  const addInvestment = async (investment: Partial<Investment>) => {
    try {
      const user = auth.currentUser;
      if (!user) return;

      const now = new Date();
      await addDoc(collection(db, 'investments'), {
        ...investment,
        userId: user.uid,
        createdAt: now,
        updatedAt: now
      });
    } catch (error) {
      console.error('Error adding investment:', error);
    }
  };

  const deleteInvestment = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'investments', id));
    } catch (error) {
      console.error('Error deleting investment:', error);
    }
  };

  return { investments, addInvestment, deleteInvestment };
}