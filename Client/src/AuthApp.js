
import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { AuthContext } from './components/Authentication/auth';
import Login from "./login/login";
import BottomTabs from "./navigation/app-navigator";


const LoadingScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>VBA wellness</Text>
        <Text>Loading...</Text>
    </View>
)
export const AuthApp = () => {
    const { authData } = useContext(AuthContext)

    return (authData?.isLoading)
        ? LoadingScreen
        : ((authData?.isAuthenticated) ? <BottomTabs /> : <Login />)
}