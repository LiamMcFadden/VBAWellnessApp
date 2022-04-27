import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import Login from './login/login';
import BottomTabs from './navigation/app-navigator';

import {UserProvider} from './components/Authentication/user';
import {subscribeToAuthState, currentUser} from '_api/firebase-auth';
import {fetch, clear} from '_api/firebase-db';

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 25,
    paddingTop: 20,
    //color: '#0155A4',
    color: 'dimgray',
    fontWeight: '600',
    fontStyle: 'italic'
  }
});

const LoadingScreen = () => (
  // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
  //   <Text>VBA wellness</Text>
  //   <Text>Loading...</Text>
  // </View>
  <View style={styles.background}>
    <Image source={require('_assets/images/VBALogo.png')} style={styles.logo}/>
    <Text style={styles.text}>Wellness Challenge</Text>
  </View>
);
export const AppRouter = () => {
  const [isLoading, setLoading] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  function subscriptionCallback(userState) {
    if (userState != null) {
      setLoading(true);
      fetch(userState.uid)
        .then(() => {
          setLoading(false);
          setAuthenticated(true);
          console.log('authed with ' + userState.uid);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    } else {
      clear();
      setAuthenticated(false);
    }
  }

  useEffect(() => {
    if (currentUser() != null) {
      subscriptionCallback(currentUser());
    } else {
      let subscription = subscribeToAuthState(subscriptionCallback);
    }
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : authenticated ? (
    <UserProvider>
      <BottomTabs />
    </UserProvider>
  ) : (
    <Login />
  );
};
