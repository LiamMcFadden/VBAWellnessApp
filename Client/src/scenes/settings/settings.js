import React from 'react';
import {Button, Text, View} from 'react-native';
//import { AuthContext } from "_components/Authentication/auth";
import {signOut} from '_api/firebase-auth';
import {getCurrentUser} from '_api/firebase-db';
export default Settings = ({navigation}) => {
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
      {getCurrentUser().admin === true && (
        <View>
          <Text>Admin Settings</Text>
          <Button title="Admin" onPress={navigation.navigate('Admin')} />
        </View>
      )}
    </View>
  );
};
