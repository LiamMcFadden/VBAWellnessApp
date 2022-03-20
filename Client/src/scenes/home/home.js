import React from 'react';
import { StyleSheet, Text, View } from 'react-native';


const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})


const Home = () => (
    <View style={styles.view}>
        <Text>Home</Text>
    </View>
);

export default Home;
