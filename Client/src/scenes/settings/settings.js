import React, { useContext } from "react";
import { Button, Text, View } from 'react-native';
import { AuthContext } from "_components/Authentication/auth";

export default Settings = () => {
    const { signOut } = useContext(AuthContext)?.functions
    return (
        <View style={{
            flex: 1, justifyContent: "center", alignItems: "center"
        }}>
            <Text>Settings</Text>
            <Button title="Sign out" onPress={signOut} />
        </ View>
    )
}