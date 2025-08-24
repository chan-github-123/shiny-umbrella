import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore, collection, query, where, getDocs, doc, updateDoc, addDoc, deleteDoc, Timestamp } from 'firebase/firestore';
import { firebaseConfig } from '@/lib/firebase'; // Assuming firebaseConfig is exported from firebase.ts

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

interface TimeSlot {
  id: string;
  date: string | Timestamp;
  time: string;
  isBooked: boolean;
  // Add optional fields for reservation details
  name?: string;
  contact?: string;
  email?: string;
  consultationType?: string;
}
interface ReservationDetails {
  isBooked: boolean;
}

const availableSlotsCollection = collection(db, 'availableSlots');

/**
 * Gets available time slots for a given date.
 * @param dateString - The date string in 'YYYY-MM-DD' format.
 * @returns A promise that resolves with an array of TimeSlot objects.
 */
export const getAvailableTimeSlots = async (dateString: string): Promise<TimeSlot[]> => {
  try {
    const q = query(availableSlotsCollection, where('date', '==', dateString), where('isBooked', '==', false));
    const querySnapshot = await getDocs(q);
    const slots: TimeSlot[] = [];
    querySnapshot.forEach((doc) => {
      slots.push({ id: doc.id, ...doc.data() } as TimeSlot);
    });
    return slots;
  } catch (error) {
    console.error('Error getting available time slots:', error);
    throw new Error('Failed to fetch available time slots.');
  }
};

interface BookTimeSlotDetails {
  name: string;
  contact: string;
  email: string;
  consultationType: string;
  date: string; // Assuming date is passed for confirmation or logging
}

/**
 * Books a specific time slot.
 * @param slotId - The ID of the time slot to book.
 * @param reservationDetails - The details of the person making the reservation.
 * @returns A promise that resolves when the update is complete.
 */
export const bookTimeSlot = async (slotId: string, reservationDetails: BookTimeSlotDetails): Promise<void> => {
  try {
    const slotRef = doc(db, 'availableSlots', slotId);
    await updateDoc(slotRef, { isBooked: true, ...reservationDetails });
  } catch (error) {
    console.error('Error booking time slot:', error);
    throw new Error('Failed to book time slot.');
  }
};

// You can add functions here later for: (Already added bookTimeSlot above)
// - Adding new time slots
// - Updating a slot's booking status
// - Deleting time slots