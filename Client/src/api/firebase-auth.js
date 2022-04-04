import auth from '@react-native-firebase/auth';
import {clear} from 'react-native/Libraries/LogBox/Data/LogBoxData';
import {addUser} from './firebase-db';

const signIn = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};
const register = async (
  email,
  password,
  firstName,
  lastName,
  competitionId,
) => {
  const res = await auth().createUserWithEmailAndPassword(email, password);
  addUser(res.uid, email, firstName, lastName, competitionId);
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
