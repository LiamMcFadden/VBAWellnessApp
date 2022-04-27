import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { AuthContext } from '_components/Authentication/auth';
import ActivitiesScreen from '_scenes/activities';
import Compete from '_scenes/compete/compete';
import Home from '_scenes/home/home';
import Settings from '_scenes/settings/settings';




const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;


const styles = StyleSheet.create({
    // Top Level Of Tab Bar <></>
    containerView: {
        flexDirection: 'row',
        height: 75,
        backgroundColor: '#0155A4',
    },

    // Each Tab Item
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 5
    },

    //Tab Content Text
    tabContentText: {
        fontWeight: 'bold'
    },

    // Used for foreground color of tab bar
    contentColor: {
        color: '#0155A4',
        color: 'rgba(255, 255, 255, 0.7)'
    },

    // Tab Selected
    selectedContentColor: {
        color: '#4CA1FE'
    }

})

const routeConfig = {
    Home: {
        iconName: 'home'
    },
    Activities: {
        iconName: 'plus-circle'
    },
    Leaderboard: {
        iconName: 'leaderboard'
    },
    Settings: {
        iconName: 'settings'
    }
}

const getIcon = (routeName, style) => {
    if (routeName === 'Leaderboard' || routeName === 'Settings') {
        return <MaterialIcon
            name={routeConfig[routeName].iconName}
            style={style}
            size={windowWidth / 12
            }
        />
    } else {
        return (
            <Icon
                name={routeConfig[routeName].iconName}
                style={style}
                size={windowWidth / 12}
            />
        )
    }
}



function CustomTabBar({ state, descriptors, navigation }) {
    return (
        <View style={styles.containerView}>

            {
                state.routes.map((route, idx) => {

                    //Descriptors[route.key] gives descripter for this route
                    const { options } = descriptors[route.key]
                    const label = options.tabBarLabels ?? options.title ?? route.name

                    // Handle Navigation Transaction
                    const handleOnPress = () => {

                        // Call emit function on navigation object
                        const event = navigation.emit({
                            type: 'tabPress',
                            target: route.key,
                        });
                        console.log('event', event)

                        // Check index and commit navigation if
                        // Not already committed
                        if (state.index !== idx && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    }

                    const selectStyle = (idx) => {
                        return state.index === idx ? styles.selectedContentColor : styles.contentColor
                    }

                    return (
                        <TouchableOpacity
                            key={route.name + idx}
                            style={{ ...styles.tabItem, width: (windowWidth / state.routes.length) }}
                            onPress={handleOnPress}
                        >
                            <View style={styles.tabItem}>
                                {getIcon(label, selectStyle(idx))}
                                <Text style={{ ...styles.tabContentText, ...selectStyle(idx) }}>{label}</Text>
                            </View>
                        </TouchableOpacity>
                    )

                })
            }

        </View >
    )
}


const TabBar = createBottomTabNavigator()


export default function BottomTabs() {
    const context = useContext(AuthContext);
    return (
            <TabBar.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
            >
                <TabBar.Screen
                    name='Home'
                    component={Home}
                    options={{ headerShown: false }}
                />
                <TabBar.Screen name='Leaderboard' component={Compete} options={{ headerShown: false }} />
                <TabBar.Screen name='Activities' component={ActivitiesScreen} options={{ headerShown: false }} />
                <TabBar.Screen name='Settings' component={Settings} options={{ headerShown: false }} />
            </TabBar.Navigator>
    )
}
