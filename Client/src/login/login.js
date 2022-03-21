

import React, { useContext, useState } from "react";
import { Text, TextInput, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../components/Authentication/auth";
// https://reactnavigation.org/docs/auth-flow
const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const { signIn } = useContext(AuthContext)?.functions;


    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'orange', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <TextInput placeholder="Username" />
            <TextInput placeholder="Password" />

            <TouchableOpacity
                style={{ backgroundColor: 'blue' }}
                onPress={() => signIn(username, password)}
            >
                <Text style={{ color: '#fff' }}>Sign In</Text>
            </TouchableOpacity>

        </SafeAreaView>
    )

}

export default Login;