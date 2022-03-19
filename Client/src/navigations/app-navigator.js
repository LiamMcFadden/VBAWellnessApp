import {createBottomTabNavigator} from 'react-navigation-tabs';

import ActivitiesScreen from '_scenes/activities';

const TabNavigatorConfig = {
  initialRouteName: 'Activities',
  header: null,
  headerMode: 'none',
};

const RouteConfigs = {
  Activities:{
    screen:ActivitiesScreen,
  },
};

const AppNavigator = createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);

export default AppNavigator;