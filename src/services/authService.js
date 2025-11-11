import { firebase,auth } from '../firebaseConfig';

// 🔹 Sign up new user
export const signUp = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Signup error:', error.message);
    throw error;
  }
};

// 🔹 Sign in existing user
export const signIn = async (email, password) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Signin error:', error.message);
    throw error;
  }
};

// 🔹 Sign out
export const signOut = async () => {
  try {
    await auth().signOut();
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Signout error:', error.message);
  }
};
