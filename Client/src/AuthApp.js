import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import Login from './login/login';
import BottomTabs from './navigation/app-navigator';

import {subscribeToAuthState, currentUser} from '_api/firebase-auth';
import {fetch, clear} from '_api/firebase-db';

const LoadingScreen = () => (
  <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    <Text>VBA wellness</Text>
    <Text>Loading...</Text>
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
    }
    let subscription = subscribeToAuthState(subscriptionCallback);
    return subscription;
  }, []);

  return isLoading ? (
    <LoadingScreen />
  ) : authenticated ? (
    <BottomTabs />
  ) : (
    <Login />
  );
};
