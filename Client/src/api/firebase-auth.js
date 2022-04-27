import auth from '@react-native-firebase/auth';

const signIn = (email, password) => {
  return auth().signInWithEmailAndPassword(email, password);
};
const register = (email, password) => {
  return auth().createUserWithEmailAndPassword(email, password);
};
const signOut = async () => {
  await auth().signOut();
};
const currentUser = () => {
  return auth().currentUser;
};
const subscribeToAuthState = callback => {
  return auth().onAuthStateChanged(callback);
};
export {signIn, register, signOut, currentUser, subscribeToAuthState};
