import { firebase } from '../firebaseConfig';

// 🔹 Sign up new user
export const signUp = async (email, password) => {
  try {
    const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Signup error:', error.message);
    throw error;
  }
};

// 🔹 Sign in existing user
export const signIn = async (email, password) => {
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error('Signin error:', error.message);
    throw error;
  }
};

// 🔹 Sign out
export const signOut = async () => {
  try {
    await firebase.auth().signOut();
    console.log('User signed out successfully');
  } catch (error) {
    console.error('Signout error:', error.message);
  }
};
