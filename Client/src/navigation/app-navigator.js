import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddScreen from '_scenes/addScreen/addScreen';
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
        paddingBottom: 10
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

const routeConfig = [
    { title: 'Home', image: '😁' },
    { title: 'Add', image: '👍' },
    { title: 'Compete', image: '✌🏽' },
    { title: 'Settings', image: '🍎' }
]

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

                        // Check index and commit navigation
                        if (state.index !== idx && !event.defaultPrevented) {
                            navigation.navigate(route.name);
                        }
                    }

                    const selectStyle = (idx) => {
                        return state.index === idx ? styles.selectedContentColor : styles.contentColor
                    }

                    return (
                        <TouchableOpacity
                            style={{ ...styles.tabItem, width: (windowWidth / routeConfig.length) }}
                            onPress={handleOnPress}
                        >
                            <View style={styles.tabItem}>

                                <Text>😁</Text>
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
    return (
        <NavigationContainer>
            <TabBar.Navigator
                tabBar={(props) => <CustomTabBar {...props} />}
            >
                <TabBar.Screen
                    name='Home'
                    component={Home}
                />
                <TabBar.Screen name='Compete' component={Compete} />
                <TabBar.Screen name='Add' component={AddScreen} />
                <TabBar.Screen name='Settings' component={Settings} />
            </TabBar.Navigator>
        </NavigationContainer>
    )
}
/*
return (
        <View style={styles.containerView}>
            {
                routeConfig.map((tabInfo, index) =>
                    <View key={tabInfo.title + index} style={{ ...styles.tabItem, width: (windowWidth / routeConfig.length) }}>
                        <Text>
                            {tabInfo.image}
                        </Text>
                        <Text style={{ color: 'white' }}>
                            {tabInfo.title}
                        </Text>
                    </View>
                )
            }
        </View>
    )
*/