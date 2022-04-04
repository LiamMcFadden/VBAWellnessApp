import React from 'react';
import {Button, Text, View} from 'react-native';
//import { AuthContext } from "_components/Authentication/auth";
import {signOut} from '_api/firebase-auth';
export default Settings = () => {
  //const { signOut } = useContext(AuthContext)?.functions

  function signOutValidation() {
    signOut()
      .then(() => {
        console.log('signed out');
      })
      .catch(err => {
        console.error(err);
      });
  }
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Settings</Text>
      <Button title="Sign out" onPress={signOutValidation} />
    </View>
  );
};
