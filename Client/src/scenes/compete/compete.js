import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
let pointsOrBadges = "points";

const styles = StyleSheet.create({
    header: {
        textAlign: "center",
        fontSize: 25,
        fontWeight: 'bold',
        color: "#0155A4",
        marginBottom: 10
    },
    pointsorbadges: {
        marginTop: 20
    },
    selector: {
        width: (windowWidth*.75),
        marginLeft: (windowWidth*.25/2)
    }
});

const PointsorBadges = () => {
    const options = [
        { label: 'Points', value: 'points' },
        { label: 'Badges', value: 'badges' },
    ];

    return (
        <View style={styles.pointsorbadges}>
            <Text style={styles.header}>Leaderboard</Text>
            <SwitchSelector 
                style={styles.selector}
                options={options} 
                initial={0} 
                onPress={value => pointsOrBadges=value} 
                backgroundColor={"#A9A9A9"}
                buttonColor={"white"}
                textColor={"#0155A4"} 
                selectedColor={"#0155A4"} 
            />
        </View>
    );
}

const Compete = () => {
    return (
        <PointsorBadges/>
    );
}

export default Compete;


