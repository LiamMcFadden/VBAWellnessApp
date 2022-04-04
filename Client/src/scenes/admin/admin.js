import React, {useState} from "react";
import { Text, View, UIManager, SafeAreaView, LayoutAnimation, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Modal from "react-native-modal";

const startDate = new Date(2022, 2, 30);
const endDate = new Date(2022, 2, 30);

const totalActivities = [
    {
        category: 'Physical',
        activities: [
            {
                title: 'Track Star',
                text: 'Run 1 mile this week and earn 10 points',
                points: 10,
                available: 1
            },
            {
                title: 'Work Ready',
                text: 'Walk to work 3 days this week and earn 5 points',
                points: 5,
                available: 0
            },
            {
                title: 'The Swimmer',
                text: 'Swim for a total of 10 minutes today and earn 15 points',
                points: 15,
                available: 0
            },
            {
                title: 'Always Working',
                text: 'Go to the gym and workout for at least 15 minutes to earn 10 points',
                points: 10,
                available: 0
            },
            {
                title: 'The Cruiser',
                text: 'Ride your bike for 5 minutes today and earn 5 points',
                points: 5,
                available: 1
            },
            {
                title: 'Stair Master',
                text: 'Take the stairs at work today and earn 2 points',
                points: 2,
                available: 1
            },
            {
                title: 'Track Star',
                text: 'Run 1 mile this week and earn 10 points',
                points: 10,
                available: 0
            },
        ]
    },
    {
        category: 'Emotional',
        activities: [
            {
                title: 'Work Ready',
                text: 'Walk to work 3 days this week and earn 5 points',
                points: 5,
                available: 1
            },
            {
                title: 'The Swimmer',
                text: 'Swim for a total of 10 minutes today and earn 15 points',
                points: 15,
                available: 0
            },
            {
                title: 'Always Working',
                text: 'Go to the gym and workout for at least 15 minutes to earn 10 points',
                points: 10,
                available: 1
            },
        ]
    },
    {
        category: 'Intellectual',
        activities: [
            {
                title: 'The Swimmer',
                text: 'Swim for a total of 10 minutes today and earn 15 points',
                points: 15,
                available: 1
            },
            {
                title: 'Always Working',
                text: 'Go to the gym and workout for at least 15 minutes to earn 10 points',
                points: 10,
                available: 1
            },
            {
                title: 'The Cruiser',
                text: 'Ride your bike for 5 minutes today and earn 5 points',
                points: 5,
                available: 1
            },
            {
                title: 'Stair Master',
                text: 'Take the stairs at work today and earn 2 points',
                points: 2,
                available: 1
            }
        ]
    },
    {
        category: 'Occupational',
        activities: [
            {
                title: 'The Swimmer',
                text: 'Swim for a total of 10 minutes today and earn 15 points',
                points: 15,
                available: 0
            },
            {
                title: 'Always Working',
                text: 'Go to the gym and workout for at least 15 minutes to earn 10 points',
                points: 10,
                available: 0
            },
            {
                title: 'The Cruiser',
                text: 'Ride your bike for 5 minutes today and earn 5 points',
                points: 5,
                available: 1
            },
            {
                title: 'Stair Master',
                text: 'Take the stairs at work today and earn 2 points',
                points: 2,
                available: 1
            },
            {
                title: 'Track Star',
                text: 'Run 1 mile this week and earn 10 points',
                points: 10,
                available: 0
            },
        ]
    },
    {
        category: 'Spiritual',
        activities: [
            {
                title: 'The Cruiser',
                text: 'Ride your bike for 5 minutes today and earn 5 points',
                points: 5,
                available: 1
            },
            {
                title: 'Stair Master',
                text: 'Take the stairs at work today and earn 2 points',
                points: 2,
                available: 0
            },
            {
                title: 'Track Star',
                text: 'Run 1 mile this week and earn 10 points',
                points: 10,
                available: 1
            },
        ]
    },
    {
        category: 'Social',
        activities: [
            {
                title: 'Work Ready',
                text: 'Walk to work 3 days this week and earn 5 points',
                points: 5,
                available: 1
            },
        ]
    },
];

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

const competitionStatus = () => {
    const date = new Date();
    let compText;
    let compButton = null;
    if(date > startDate && date < endDate) {
        compText = <Text style={styles.font}>Competition Currently Active</Text>;
    }
    else if(date < startDate && date < endDate) {
        compText = <Text style={styles.font}>Competition starting soon</Text>;
    }
    else if(startDate == null || endDate == null) {
        compText = <Text style={styles.font}>No Competition Set</Text>;
    }
    else if(date > startDate && date > endDate) {
        compText = <Text style={styles.font}>Previous Competition Ended</Text>;
        compButton = (
            <TouchableOpacity style={styles.resultsBtn}>
                <Text style={styles.btnFont}>View Results</Text>
            </TouchableOpacity>
        );
    }
    else {
        compText = <Text style={styles.font}>No Competition Set</Text>;
    }
    return (
        <View style={{padding: 5, width: "80%", justifyContent: 'space-around', height: '100%'}}>
            {compText}
            {compButton}
        </View>
    );
}

const activitiesRender = () => {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    return (
        <View style={{padding: 5, width: "80%"}}>
            <TouchableOpacity style={styles.btn} onPress={toggleModal}>
                <Text style={styles.btnFont}>Edit Activities</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible}>
                <View style={{flex: 1, backgroundColor: 'white', borderRadius: 10}}>
                    <View style={{flexDirection: "row",  borderBottomWidth: 2, borderColor: 'grey'}}>
                        <View style={{paddingTop: 5, paddingLeft: 10}}>
                            <TouchableOpacity style={{height: 35, borderRadius: 5, alignSelf: 'flex-start', width: 45}} onPress={toggleModal}>
                                <Text style={{color: '#0155A4', fontWeight: '600', fontSize: 18}}>Back</Text>
                            </TouchableOpacity>
                        </View>
                        <Text style={{flex: 1, paddingTop: 5, height: 35, fontWeight: '600', fontSize: 22, paddingRight: 55, textAlign: 'center'}}>Edit Activities</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <FlatList 
                            data={totalActivities}
                            renderItem={({ item }) => (
                                <CategoryHeader
                                    category={item.category}
                                    activities={item.activities}
                                />
                            )}
                        />
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const CategoryHeader = ({
    category,
    activities,
}) => {

    const [open, setOpen] = useState(false);

    const toggleHeader = () => {
        LayoutAnimation.configureNext(LayoutAnimation.create(275, 'linear', 'opacity'));
        setOpen(!open);
    }

    return (
        <View style={{flex: 1}}>
            <TouchableOpacity activeOpacity={1} style={{padding: 15, backgroundColor: '#0155A4', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 2, borderColor: 'grey',}} onPress={toggleHeader}>
                <Text style={{color: 'white', fontSize: 18}}>{category}</Text>
                <Text style={{color: 'white', fontSize: 18}}>
                    {open ? '▲' : '▼'}
                </Text>
            </TouchableOpacity>
            {open &&
                <FlatList
                    data={activities}
                    renderItem={({ item }) => (
                        <ActivityItem
                            activity={item}
                        />
                    )}
                />
            }
        </View>
    );
}

const ActivityItem = ({
    activity,
}) => {
    initialState = (activity.available == 1) ? true : false;
    const [isAvailable, setAvailable] = useState(initialState);

    const updateAvailability = () => {
        setAvailable(!isAvailable);
        checkActivity(isAvailable);
    }

    return (
        <TouchableOpacity style={{padding: 15, backgroundColor: activity.available ? 'white' : 'lightgrey', borderBottomWidth: 2, borderColor: 'grey',}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <View style={{
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{
                        fontSize: 18,
                        color: '#0155A4'}}>
                        {activity.title ?? "Activity"}
                    </Text>
                    <Text>
                        {activity.points} pts
                    </Text>
                </View>
                <View>
                    {activity.available 
                        ? <Text>enabled</Text>
                        : <Text>disabled</Text>
                    }
                </View>
            </View>
        </TouchableOpacity>
    );
};

const Admin = () => {
    return (
        <SafeAreaView style={{backgroundColor: '#0155A4', flex: 1, alignItems: "center"}}>
            <Text style={{fontSize: 30, fontWeight: "800", padding: 5, color: 'white'}}>Admin Page</Text>
            <View style={styles.compPage}>
                {competitionStatus()}
            </View>
            <View style={{padding: 10}} />
            <View style={styles.btnPage}>
                    <View style={{padding: 5, width: "80%"}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                            <Text>Start Date: {startDate.toLocaleDateString()}</Text>
                            <Text>End Date: {endDate.toLocaleDateString()}</Text>
                        </View>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btnFont}>Set Competition Dates</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{padding: 5, width: "80%"}}>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btnFont}>Edit Users</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{padding: 5, width: "80%"}}>
                        <TouchableOpacity style={styles.btn}>
                            <Text style={styles.btnFont}>Edit Milestones</Text>
                        </TouchableOpacity>
                    </View>
                    {activitiesRender()}
            </View>
            <View style={{padding: 5}}/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    page:{
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 10,
        flex: 1, 
        alignItems: "center"
    },
    btnPage:{
        flex: 6,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center', 
        justifyContent: 'space-around',
    },
    compPage:{
        flex: 1,
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center'
    },
    btn:{
        backgroundColor: '#0155A4',
        width: "100%",
        height: 35,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    resultsBtn:{
        backgroundColor: 'green',
        width: "100%",
        height: 35,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
    },
    btnFont:{
        color: '#fff',
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: '600', // i.e semi-bold
        fontSize: 18
    },
    font:{
        height: 35,
        textAlign: 'center',
        alignItems: 'center',
        fontWeight: '600', // i.e semi-bold
        fontSize: 18
    },
});

const actStyles = StyleSheet.create({

});

export default Admin;