import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    view: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    pointsOrBadges: {
        borderRadius: 5,
        marginTop: 15,
        width: 0.95*windowWidth,
        alignSelf: 'center',
        alignItems: "center",
        justifyContent: "center",
        padding: 20,
        flexDirection: "row",
        backgroundColor: '#0155A4'
    },
    points: {
        color: "white",
        marginRight: (.95*windowWidth)*.3
    },
    badges: {
        color: "white",
        marginLeft: (.95*windowWidth)*.3
    }

});

const PointsOrBadges = () => {
    return (
        <View style={styles.pointsOrBadges}>
            <Text style={styles.points}> Points </Text>
            <Text style={styles.badges}> Badges </Text>
        </View>
    );
};

export default PointsOrBadges;

//export default Compete = () => (
//    <View style={styles.view}>
//        <Text>Compete</Text>
//    </View>
//)

