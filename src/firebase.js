import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDoc, doc, setDoc} from 'firebase/firestore'; // Import Firestore related functions
 
 
const firebaseConfig = {
    apiKey: "AIzaSyCD1O-ZsDQnPNxen6doqcInKGqjIUP4QHc",
    authDomain: "eshiptech-1.firebaseapp.com",
    projectId: "eshiptech-1",
    storageBucket: "eshiptech-1.appspot.com",
    messagingSenderId: "891560147426",
    appId: "1:891560147426:web:851ed0866f7c9e7603e1bb",
    measurementId: "G-50BG4V1R88"
};
 
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Get auth instance
 
// Export auth and createUserWithEmailAndPassword without curly braces
export { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword };
 
export const signup = async (email, password, userData) => {
  // try {
  //     const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  //     const user = userCredential.user;
 
  //     // Save user data to Firestore
  //     await addDoc(collection(db, 'users'), {
  //         uid: user.uid,
  //         email: user.email,
  //         workspace: userData.workspace
  //       //   ...userData // Additional user data (e.g., name, age, etc.)
  //     });
 
  //     return user;
  // } catch (error) {
  //     console.error('Signup error:', error.code, error.message);
  //     throw error;
  // }
  try {
    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Use UID as document name in Firestore
    const userDocRef = doc(db, "users", user.uid);

    // Set user data in Firestore document
    await setDoc(userDocRef, {
      email: user.email,
      uid: user.uid,
      workspace: userData.workspace
      // Add any other user data you want to store
    });

    console.log("User signed up successfully:", user);
  } catch (error) {
    console.error("Signup failed:", error);
  }
};
 
export const login = async (email, password) => {
  try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
 
      // Retrieve user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
 
      return { user, userData };
  } catch (error) {
      console.error('Login error:', error.code, error.message);
      throw error;
  }
};
