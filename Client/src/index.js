import React from 'react';
import {AppRouter} from './AuthApp';
import {NavigationContainer} from '@react-navigation/native';
// import BottomTabs from './navigation/app-navigator';
import 'react-native-gesture-handler';
import { AppRouter } from './AuthApp';

const App = () => {
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  );
};
export default App;
