import React, {useState} from "react";
import { Text, View, TextInput, KeyboardAvoidingView, Alert, UIManager, SafeAreaView, LayoutAnimation, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Modal from "react-native-modal";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import {signOut} from '_api/firebase-auth';
import {
    getActivitiesByCategory,
    getActivities,
    getCurrentCompetition,
    deleteActivity,
    addActivity,
    updateActivity,
    getAllUsers,
  } from '_api/firebase-db';
// const startDate = new Date(2022, 1, 30);
// const endDate = new Date(2022, 2, 30);

const totalActivities = [
    {
        category: 'Physical',
        activities: [
            {
                title: 'Track Star',
                text: 'Run 1 mile this week and earn 10 points',
                points: 10,
                available: true
            },
            {
                title: 'Work Ready',
                text: 'Walk to work 3 days this week and earn 5 points',
                points: 5,
                available: false
            },
            {
                title: 'The Swimmer',
                text: 'Swim for a total of 10 minutes today and earn 15 points',
                points: 15,
                available: false
            },
            {
                title: 'Always Working',
                text: 'Go to the gym and workout for at least 15 minutes to earn 10 points',
                points: 10,
                available: false
            },
            {
                title: 'The Cruiser',
                text: 'Ride your bike for 5 minutes today and earn 5 points',
                points: 5,
                available: true
            },
            {
                title: 'Stair Master',
                text: 'Take the stairs at work today and earn 2 points',
                points: 2,
                available: true
            },
            {
                title: 'Track Star',
                text: 'Run 1 mile this week and earn 10 points',
                points: 10,
                available: false
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
                available: true
            },
            {
                title: 'The Swimmer',
                text: 'Swim for a total of 10 minutes today and earn 15 points',
                points: 15,
                available: false
            },
            {
                title: 'Always Working',
                text: 'Go to the gym and workout for at least 15 minutes to earn 10 points',
                points: 10,
                available: true
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
                available: true
            },
            {
                title: 'Always Working',
                text: 'Go to the gym and workout for at least 15 minutes to earn 10 points',
                points: 10,
                available: true
            },
            {
                title: 'The Cruiser',
                text: 'Ride your bike for 5 minutes today and earn 5 points',
                points: 5,
                available: true
            },
            {
                title: 'Stair Master',
                text: 'Take the stairs at work today and earn 2 points',
                points: 2,
                available: true
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
                available: false
            },
            {
                title: 'Always Working',
                text: 'Go to the gym and workout for at least 15 minutes to earn 10 points',
                points: 10,
                available: false
            },
            {
                title: 'The Cruiser',
                text: 'Ride your bike for 5 minutes today and earn 5 points',
                points: 5,
                available: true
            },
            {
                title: 'Stair Master',
                text: 'Take the stairs at work today and earn 2 points',
                points: 2,
                available: true
            },
            {
                title: 'Track Star',
                text: 'Run 1 mile this week and earn 10 points',
                points: 10,
                available: false
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
                available: true
            },
            {
                title: 'Stair Master',
                text: 'Take the stairs at work today and earn 2 points',
                points: 2,
                available: false
            },
            {
                title: 'Track Star',
                text: 'Run 1 mile this week and earn 10 points',
                points: 10,
                available: true
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
                available: true
            },
        ]
    },
];

if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
}

const Stack = createNativeStackNavigator();

const competitionStatus = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const date = new Date();
    let startDate = getCurrentCompetition()['startTime'].toDate();
    let endDate = getCurrentCompetition()['endTime'].toDate();
    let exists = (startDate != null && endDate != null);
    let compText;
    let compButton = null;
    if(!exists) {
        compText = <Text style={styles.font}>No Competition Set</Text>;
        compButton = (
            <TouchableOpacity style={styles.resultsBtn} onPress={() => toggleModal()}>
                <Text style={styles.btnFont}>Create Competition</Text>
            </TouchableOpacity>
        );
    }
    else if(date > startDate && date < endDate) {
        compText = <Text style={styles.font}>Competition Currently Active</Text>;
        //https://github.com/react-native-clipboard/clipboard#example
        compButton = <Text style={styles.font}>Join Code: {getCurrentCompetition().id}</Text>;
    }
    else if(date < startDate && date < endDate) {
        compText = <Text style={styles.font}>Competition starting soon</Text>;
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
const CompetitionModal = () => {

    const [title, onChangeTitle] = useState(activity != null ? activity.title : '');

    return (
        <KeyboardAvoidingView behavior='padding' style={{backgroundColor: 'white', borderRadius: 10, flex: 1}}>
            <View style={{margin: 20, justifyContent: 'space-between'}}>
                
                <View>
                    <Text style={{color: '#0155A4', fontSize: 18, fontWeight: '600'}}>Title</Text>
                    <TextInput 
                        value={title}
                        onChangeText={text => onChangeTitle(text)}
                        style={{fontSize: 16, borderWidth: 1, borderRadius: 5, borderColor: 'grey'}}
                    />
                </View>
                <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress={() => toggleModal()} style={{borderRadius: 5, margin: 20, width: '30%', backgroundColor: 'grey'}}>
                        <Text style={{alignSelf: 'center', fontSize: 20, padding: 5, color: 'white', fontWeight: '600'}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={saveActivity} style={{borderRadius: 5, margin: 20, width: '30%', backgroundColor: '#0155A4'}}>
                        <Text style={{alignSelf: 'center', fontSize: 20, padding: 5, color: 'white', fontWeight: '600'}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}
const AdminActivitiesScreen = ({navigation}) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const [refresh, setRefresh] = useState(false);

    const refreshFlatList = () => {
        setRefresh(!refresh);
    }

    return (
        <View style={{flex: 1, backgroundColor: 'white'}}>
            <View style={{flexDirection: "row",  borderBottomWidth: 2, borderColor: 'grey'}}>
                <View style={{paddingTop: 7, paddingLeft: 10}}>
                    <TouchableOpacity style={{borderRadius: 5, alignSelf: 'flex-start', width: 45}} onPress={() => navigation.navigate('Main')}>
                        <Text style={{color: '#0155A4', fontWeight: '600', fontSize: 18}}>Back</Text>
                    </TouchableOpacity>
                </View>
                <Text style={{flex: 1, paddingTop: 5, height: 35, fontWeight: '600', fontSize: 22, paddingRight: 15, textAlign: 'center', color: '#0155A4'}}>Edit Activities</Text>
                <View style={{paddingRight: 10}}>
                    <TouchableOpacity style={{height: 40, borderRadius: 5, alignSelf: 'flex-end', width: 30}} onPress={toggleModal}>
                        <Text style={{color: 'green', fontWeight: '600', fontSize: 30, alignSelf: 'center'}}>+</Text>
                    </TouchableOpacity>
                    <Modal isVisible={isModalVisible} propagateSwipe={true} statusBarTranslucent={true} style={{marginTop: 100, marginBottom: 100}}>
                        <ActivityModal wellnessCategory={null} activity={null} toggleModal={() => toggleModal()} />
                    </Modal>
                </View>
            </View>
            <View style={{flex: 1}}>
                <FlatList 
                    data={getActivities()}
                    extraData={refresh}
                    renderItem={({ item }) => (
                        <CategoryHeader
                            category={item.category}
                            activities={item.activities}
                            refresh={refreshFlatList}
                        />
                    )}
                />
            </View>
        </View>
    );
}

const ActivityModal = ({
    wellnessCategory,
    activity,
    toggleModal,
}) => {

    const [title, onChangeTitle] = useState(activity != null ? activity.title : '');
    const [category, setCategory] = useState(activity != null ? wellnessCategory : 'Physical');
    const [description, onChangeDescription] = useState(activity != null ? activity.description : '');
    const [points, onChangePoints] = useState(activity != null ? activity.points : 0);
    const [available, onChangeAvailability] = useState(activity != null ? activity.available : true);

    const saveActivity = () => {
        if(title == '' || points == 0) {
            Alert.alert(
                "Whoops!",
                "Make sure to include a title and points value for this activity before saving.",
                [
                    {
                        text: 'OK'
                    }
                ]
            );
            return;
        }

        const newActivity = {
            title: title,
            category: category,
            description: description,
            points: parseInt(points),
            available: available,
        }

        if(activity != null) {
            newActivity.uid = activity.uid;
            updateActivity(newActivity);
        } else {
            addActivity(newActivity);
        }
        
        toggleModal();
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={{backgroundColor: 'white', borderRadius: 10, flex: 1}}>
            <View style={{margin: 20, justifyContent: 'space-between'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{width: '50%'}}>
                        <Text style={{color: '#0155A4', fontSize: 18, fontWeight: '600'}}>Wellness Category</Text>
                        <Picker 
                            mode='dropdown'
                            selectedValue={category}
                            style={{ height: 50, width: '100%' , borderWidth: 1, bordercolor: 'grey', borderRadius: 5}}
                            onValueChange={(itemValue, itemIndex) => setCategory(itemValue)}
                        >
                            <Picker.Item style={{fontSize: 14}} label='Physical' value='Physical' />
                            <Picker.Item style={{fontSize: 14}} label='Emotional' value='Emotional' />
                            <Picker.Item style={{fontSize: 14}} label='Intellectual' value='Intellectual' />
                            <Picker.Item style={{fontSize: 14}} label='Occupational' value='Occupational' />
                            <Picker.Item style={{fontSize: 14}} label='Spiritual' value='Spiritual' />
                            <Picker.Item style={{fontSize: 14}} label='Social' value='Social' />
                        </Picker>
                    </View>
                    <View style={{alignItems: 'center', width: '50%'}}>
                        <Text style={{color: '#0155A4', fontSize: 18, fontWeight: '600'}}>
                            {available ? 'Enabled' : 'Disabled'}
                        </Text>
                        <CheckBox
                            value={available}
                            onChange={() => onChangeAvailability(!available)}
                            style={{ color: '#0155A4', transform: [{ scaleX: 1.25 }, { scaleY: 1.25 }] }}
                        />
                    </View>
                </View>
                <View>
                    <Text style={{color: '#0155A4', fontSize: 18, fontWeight: '600'}}>Title</Text>
                    <TextInput 
                        value={title}
                        onChangeText={text => onChangeTitle(text)}
                        style={{fontSize: 16, borderWidth: 1, borderRadius: 5, borderColor: 'grey'}}
                    />
                </View>
                <View>
                    <Text style={{color: '#0155A4', fontSize: 18, fontWeight: '600'}}>Points</Text>
                    <TextInput 
                        value={points.toString()}
                        onChangeText={text => onChangePoints(text)}
                        keyboardType="numeric"
                        style={{fontSize: 16, borderWidth: 1, borderRadius: 5, borderColor: 'grey'}}
                    />
                </View>
                <View>
                    <Text style={{color: '#0155A4', fontSize: 18, fontWeight: '600'}}>Description</Text>
                    <TextInput 
                        value={description}
                        onChangeText={text => onChangeDescription(text)}
                        multiline={true}
                        numberOfLines={5}
                        style={{fontSize: 16, borderWidth: 1, borderRadius: 5, borderColor: 'grey'}}
                    />
                </View>
                <View style={{marginTop: 10, flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity onPress={() => toggleModal()} style={{borderRadius: 5, margin: 20, width: '30%', backgroundColor: 'grey'}}>
                        <Text style={{alignSelf: 'center', fontSize: 20, padding: 5, color: 'white', fontWeight: '600'}}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={saveActivity} style={{borderRadius: 5, margin: 20, width: '30%', backgroundColor: '#0155A4'}}>
                        <Text style={{alignSelf: 'center', fontSize: 20, padding: 5, color: 'white', fontWeight: '600'}}>Save</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    )
}

const CategoryHeader = ({
    category,
    activities,
    refresh,
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
            {open && activities.length > 0 &&
                <FlatList
                    style={{paddingBottom: 5}}
                    data={activities}
                    renderItem={({ item }) => (
                        <ActivityItem
                            category={category}
                            activity={item}
                            refresh={refresh}
                        />
                    )}
                />
            }
        </View>
    );
}

const ActivityItem = ({
    category,
    activity,
    refresh,
}) => {

    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
        refresh();
    };

    return (
        <View>
            <TouchableOpacity onPress={() => toggleModal()} style={[styles.activityItemView, {backgroundColor: activity.available ? 'white' : 'lightgray'}]}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                    <View style={{
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        maxWidth: '80%'
                    }}>
                        <Text style={{
                            fontSize: 18,
                            color: '#0155A4',
                            }}>
                            {activity.title ?? "Activity"}
                        </Text>
                        <Text>
                            {activity.points} pts
                        </Text>
                    </View>
                    <View>
                        <Text>
                            {activity.available ? 'enabled': 'disabled'}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} propagateSwipe={true} statusBarTranslucent={true} style={{marginTop: 100, marginBottom: 100}}>
                <ActivityModal wellnessCategory={category} activity={activity} toggleModal={toggleModal} />
            </Modal>
        </View>
        
    );
};

const AdminMainScreen = ({navigation}) => {
    const startDate = getCurrentCompetition()['startTime'].toDate();
    const endDate = getCurrentCompetition()['endTime'].toDate();
    return (
        <SafeAreaView style={{backgroundColor: '#0155A4', flex: 1, alignItems: "center"}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <TouchableOpacity style={{borderRadius: 5, margin: 15, alignSelf: 'flex-start', width: 75}} onPress={() => signOut()}>
                    <Text style={{color: 'white', fontWeight: '600', fontSize: 18}}>Sign Out</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 30, fontWeight: "800", padding: 5, paddingRight: 125, color: 'white'}}>Admin Page</Text>
            </View>
            <View style={styles.compPage}>
                {competitionStatus()}
            </View>
            <View style={{padding: 10}} />
            <View style={styles.btnPage}>
                    <View style={{padding: 5, width: "80%"}}>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                            <Text>Start Date: {startDate != null ? startDate.toLocaleDateString() : 'No date set'}</Text>
                            <Text>End Date: {endDate != null ? endDate.toLocaleDateString() : 'No date set'}</Text>
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
                    <View style={{padding: 5, width: "80%"}}>
                        <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Activities')}>
                            <Text style={styles.btnFont}>Edit Activities</Text>
                        </TouchableOpacity>
                    </View>
            </View>
            <View style={{padding: 5}}/>
        </SafeAreaView>
    )
}

const Admin = ({navigation}) => {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen
                name='Main'
                component={AdminMainScreen}
            />
            <Stack.Screen
                name='Activities'
                component={AdminActivitiesScreen}
            />
        </Stack.Navigator>
        
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
    activityItemView: {
        padding: 15,
        paddingLeft: 25,
        paddingRight: 25,
        marginTop: 5,
        marginLeft: 5,
        marginRight: 5,
        borderColor: '#eee',
        borderRadius: 50,

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    }
});

const actStyles = StyleSheet.create({

});

export default Admin;