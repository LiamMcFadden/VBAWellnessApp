import React from 'react';
import {AppRouter} from './AuthApp';
import {NavigationContainer} from '@react-navigation/native';
import 'react-native-gesture-handler';
import { LogBox } from "react-native";

LogBox.ignoreLogs(["EventEmitter.removeListener"]);

const App = () => {
  return (
    <NavigationContainer>
      <AppRouter />
    </NavigationContainer>
  );
};
export default App;
