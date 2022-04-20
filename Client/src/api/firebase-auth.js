import auth from '@react-native-firebase/auth';
import {clear} from './firebase-db';

const signIn = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};
const register = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};
const signOut = async () => {
  const res = await auth().signOut();
  clear();
  return res;
};
const currentUser = () => {
  return auth().currentUser;
};
const subscribeToAuthState = callback => {
  return auth().onAuthStateChanged(callback);
};
export {signIn, register, signOut, currentUser, subscribeToAuthState};
