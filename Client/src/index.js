import React from 'react';
import {AppRouter} from './AuthApp';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  );
};

export default App;
