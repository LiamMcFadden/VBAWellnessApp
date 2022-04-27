import React from 'react';
import {Button, Text, View} from 'react-native';
//import { AuthContext } from "_components/Authentication/auth";
import {signOut} from '_api/firebase-auth';
import {getCurrentUser} from '_api/firebase-db';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Admin from '_scenes/admin/admin';

const Stack = createNativeStackNavigator();

const SettingsScreen = ({navigation}) => {
  //const { signOut } = useContext(AuthContext)?.functions

  function signOutValidation() {
    signOut()
      .then(() => {
        //navigation.navigate('Login')
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
      {/* {getCurrentUser().admin === true && (
        <View>
          <Text>Admin Settings</Text>
          <Button title="Admin" onPress={() => navigation.navigate('Admin')} />
        </View>
      )} */}
    </View>
  );
}

const Settings = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
            name='SettingsScreen'
            component={SettingsScreen}
        />
        {/* <Stack.Screen
            name='Admin'
            component={Admin}
        /> */}
    </Stack.Navigator>
    
);
}

export default Settings;
