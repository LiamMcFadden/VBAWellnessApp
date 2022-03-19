import React, {useState} from 'react';
import {FlatList, View, Text} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import {Header, ListItem} from '_atoms';

const ActivitiesScreen = () => {
    //activity lists for each wellness category
    //once database is setup, these will be pulled from there
    const physicalActs = [
        {
            text: 'Run a Mile',
            points: 10,
        },
        {
            text: 'Walk to Work',
            points: 5,
        },
        {
            text: 'Go for a Swim',
            points: 15,
        },
        {
            text: 'Workout at the Gym',
            points: 10,
        },
    ];
    const emotionalActs = [
        {
            text: 'Emotional Filler 1',
            points: 5,
        },
        {
            text: 'Emotional Filler 2',
            points: 10,
        },
        {
            text: 'Emotional Filler 3',
            points: 10,
        },
        {
            text: 'Emotional Filler 4',
            points: 15,
        },
    ];
    const intellectualActs = [
        {
            text: 'Intellectual Filler 1',
            points: 12,
        },
        {
            text: 'Intellectual Filler 2',
            points: 13,
        },
        {
            text: 'Intellectual Filler 3',
            points: 19,
        },
        {
            text: 'Intellectual Filler 4',
            points: 4,
        },
    ];
    const occupationalActs = [
        {
            text: 'Occupational Filler 1',
            points: 10,
        },
        {
            text: 'Occupational Filler 2',
            points: 5,
        },
        {
            text: 'Occupational Filler 3',
            points: 8,
        },
        {
            text: 'Occupational Filler 4',
            points: 3,
        },
    ];
    const spiritualActs = [
        {
            text: 'Spiritual Filler 1',
            points: 15,
        },
        {
            text: 'Spiritual Filler 2',
            points: 30,
        },
        {
            text: 'Spiritual Filler 3',
            points: 5,
        },
        {
            text: 'Spiritual Filler 4',
            points: 25,
        },
    ];
    const socialActs = [
        {
            text: 'Social Filler 1',
            points: 7,
        },
        {
            text: 'Social Filler 2',
            points: 20,
        },
        {
            text: 'Social Filler 3',
            points: 10,
        },
        {
            text: 'Social Filler 4',
            points: 10,
        },
    ];

    const [items, setItems] = useState(physicalActs);

    const addPoints = points => {
        setTotalPoints(totalPoints + points);
    };

    const [totalPoints, setTotalPoints] = useState(0);

    return (
        <SafeAreaView>
            <Header title={totalPoints}/>
            <View>
                <Text onPress={() => setItems(physicalActs)}>
                    Physical
                </Text>
                <Text onPress={() => setItems(emotionalActs)}>
                    Emotional
                </Text>
                <Text onPress={() => setItems(intellectualActs)}>
                    Intellectual
                </Text>
                <Text onPress={() => setItems(occupationalActs)}>
                    Occupational
                </Text>
                <Text onPress={() => setItems(spiritualActs)}>
                    Spiritual
                </Text>
                <Text onPress={() => setItems(socialActs)}>
                    Social
                </Text>
            </View>
            <FlatList
                data={items}
                renderItem={({item}) => (
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
