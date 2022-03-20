import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AppNavigator from './app-navigator';
import AuthNavigator from './auth-navigator';


const RootNavigator = createSwitchNavigator(
  {
    Auth: AuthNavigator,
    App: AppNavigator,
  },
  {
    initialRouteName: 'Auth',
  },
);

export default createAppContainer(RootNavigator);