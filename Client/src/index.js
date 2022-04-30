import React from 'react';
import {AppRouter} from './AuthApp';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  );
};
export default App;
