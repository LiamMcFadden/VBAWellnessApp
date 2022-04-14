import React, { useState } from 'react';
import { FlatList, Dimensions, StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import Modal from "react-native-modal";
import { Activity } from "_atoms"
//activity lists for each wellness category
//once database is setup, these will be pulled from there
import {
    getCurrentUser,
    getActivitiesByCategory,
    updateCurrentUserFields,
    completeActivityForCurrentUser
} from '_api/firebase-db';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    header: {
        height: 60,
        padding: 15,
        alignSelf: 'center',
        backgroundColor: '#0155A4',
        width: '95%',
        marginTop: 10
    },
    headerText: {
        color: 'white',
        fontSize: 23,
        textAlign: 'center',
    },
    buttons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        backgroundColor: '#0155A4',
        width: '95%',
        alignSelf: 'center',
        marginTop: 1
    },
    text: {
        color: 'white'
    },
    listItem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    listItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        alignItems: 'center',
    },
    
    listItemTextContainer: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    listItemTitleText: {
        fontSize: 18,
        maxWidth: windowWidth / 1.5,
        color: '#0155A4',
    },
    listItemText: {
        fontSize: 12,
        maxWidth: windowWidth / 1.5,
        color: '#0155A4',
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 70,
    },
});

const ListItem = ({activity, openModal}) => {

    return (
        <TouchableOpacity
        style={styles.listItem}
        onPress={() => openModal(activity)}>
        <View style={styles.listItemView}>
            <View
            style={{
                flexDirection: 'column',
                justifyContent: 'space-between',
            }}>
                <Text style={styles.listItemTitleText}>{activity.title ?? 'Activity'}</Text>
                <Text style={styles.listItemText}>{activity.description}</Text>
            </View>
    
            <View style={styles.iconView}>
                <Text style={{color: '#0155A4'}}>{activity.points} pts</Text>
            </View>
        </View>
        </TouchableOpacity>
)};

const ActivitiesScreen = () => {
    const [items, setItems] = useState(getActivitiesByCategory('Physical'));

    const addPoints = points => {
        console.log('adding')
        setTotalPoints(totalPoints + points);
    };

    const action = item => {
        const newTotal = totalPoints + item.points;
    
        setTotalPoints(newTotal);
        completeActivityForCurrentUser(item.uid).catch(err => {
          setTotalPoints(newTotal - points);
          console.error(err);
          //TODO: Alert connection error
        });
    }

    const [totalPoints, setTotalPoints] = useState(getCurrentUser().points);

    const [isModalVisible, setModalVisible] = useState(false);
    const [modalActivity, setModalActivity] = useState(null);

    const openModal = (activity) => {
        setModalActivity(activity);
        setModalVisible(true);
    }

    return (
        <SafeAreaView style={{flex: 1}}>
            <View style={styles.header}>
                <Text style={styles.headerText}>{totalPoints}</Text>
            </View>
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
            <View style={{flex: 1}}>
                <FlatList
                    data={items}
                    renderItem={({ item }) => (
                        <ListItem
                            activity={item}
                            openModal={openModal}
                        />
                    )}
                />
            </View>
            <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)}>
                <Activity activity={modalActivity} action={action} toggleView={setModalVisible}/>
            </Modal>
        </SafeAreaView>
    );
};


export default ActivitiesScreen;
