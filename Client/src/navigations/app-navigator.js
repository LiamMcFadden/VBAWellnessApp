import { createBottomTabNavigator } from 'react-navigation-tabs';
import AddScreen from '_scenes/addScreen/addScreen';
import Compete from '_scenes/compete/compete';
import Home from '_scenes/home/home';
import Settings from '_scenes/settings/settings';





const TabNavigatorConfig = {
  initialRouteName: 'Home',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  Home: {
    screen: Home,
    tabBarLabel: 'pp'
  },
  Compete: {
    screen: Compete
  },
  Add: {
    screen: AddScreen
  },
  Settings: {
    screen: Settings
  }
};


export default AppNavigator =
  createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);