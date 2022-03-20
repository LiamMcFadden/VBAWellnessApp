import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Header, ListItem } from '_atoms';
//activity lists for each wellness category
//once database is setup, these will be pulled from there
import {
    emotionalActs,
    intellectualActs,
    occupationalActs,
    physicalActs,
    socialActs,
    spiritualActs
} from '../home/data';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: 'steelblue',
    },
    text: {
        color: 'white'
    },

    //Profile Card
    profileCard: {
        width: (0.95 * windowWidth),
        height: (0.2 * windowHeight),
        flex: 1,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "red"
    }

});


const ProfileCard = () => {
    <View style={styles.profileCard}>
        <Text>Hello</Text>
    </View>

}

const ActivitiesScreen = () => {
    const [items, setItems] = useState(physicalActs);

    const addPoints = points => {
        console.log('adding')
        setTotalPoints(totalPoints + points);
    };

    const [totalPoints, setTotalPoints] = useState(0);

    return (
        <SafeAreaView>
            <ProfileCard />
            <Header title={totalPoints} />
            <View style={styles.buttons}>
                <Text style={styles.text} onPress={() => setItems(physicalActs)}>
                    Physical
                </Text>
                <Text style={styles.text} onPress={() => setItems(emotionalActs)}>
                    Emotional
                </Text>
                <Text style={styles.text} onPress={() => setItems(intellectualActs)}>
                    Intellectual
                </Text>
                <Text style={styles.text} onPress={() => setItems(occupationalActs)}>
                    Occupational
                </Text>
                <Text style={styles.text} onPress={() => setItems(spiritualActs)}>
                    Spiritual
                </Text>
                <Text style={styles.text} onPress={() => setItems(socialActs)}>
                    Social
                </Text>
            </View>
            <FlatList
                data={items}
                renderItem={({ item }) => (
                    <ListItem
                        item={item}
                        addPoints={addPoints}
                    />
                )}
            />
        </SafeAreaView>
    );
};


export default ActivitiesScreen;
