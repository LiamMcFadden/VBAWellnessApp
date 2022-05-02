import React, {useState} from "react";
import { Text, View, TextInput, KeyboardAvoidingView, StatusBar, Alert, UIManager, SafeAreaView, LayoutAnimation, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import Modal from "react-native-modal";
import DatePicker from 'react-native-date-picker'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Picker} from '@react-native-picker/picker';
import CheckBox from '@react-native-community/checkbox';
import Compete from '_scenes/compete/compete';
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
import { UserContext } from "_components";

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

const CompetitionSettingsScreen = ({navigation}) => {

    const [startDate, setStartDate] = useState(getCurrentCompetition()['startTime'].toDate())
    const [endDate, setEndDate] = useState(getCurrentCompetition()['endTime'].toDate())

    const [datesChanged, setDatesChanged] = useState(false);

    const saveDates = () => {
        if(startDate > endDate) {
            Alert.alert(
                "Incorrect Dates",
                "Make sure that the start date is not later than the end date.",
                [
                    {
                        text: 'OK',
                    },
                ],
                {
                    cancelable: true
                }
            );
        }
        else {
            //TODO: make this save the start and end dates into the database, overwriting the old ones (so the admin can change the dates of the current competition)
        }
    };

    const discardDates = () => {
        setStartDate(getCurrentCompetition()['startTime'].toDate());
        setEndDate(getCurrentCompetition()['endTime'].toDate());
        setDatesChanged(false);
    }

    const startNewCompetition = () => {
        Alert.alert(
            "Start New Competition?",
            "If you start a new competition, all previous competition data will be wiped.\n\nRemember to set the competition dates after making the new competition.",
            [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        //TODO: make this function start a new competition (generate new competition code and wipe all previous competition data from the database)
                    }
                }
            ],
            {
                cancelable: true
            }
        );
    }

    const [startOpen, setStartOpen] = useState(false);
    const [endOpen, setEndOpen] = useState(false);

    return (
        <SafeAreaView behavior='padding' style={{flex: 1, alignItems: 'center'}}>
            <View style={{width: '100%', height: '100%', justifyContent: 'space-around', alignItems: 'center'}}>
                <View style={{height: '20%', width: '90%', borderRadius: 20, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5}}>
                    <Text style={{fontSize: 20, color: '#0155A4'}}>Join Code</Text>
                    <Text style={{fontSize: 40, color: 'dimgray'}}>{getCurrentCompetition().id}</Text>
                </View>
                <View style={{height: '70%', width: '90%', borderRadius: 20, backgroundColor: 'white', justifyContent: 'space-around', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5}}>
                    <TouchableOpacity onPress={() => navigation.navigate("Results")} style={{backgroundColor: '#2e8b57', width: '80%', alignItems: 'center', borderRadius: 50, paddingTop: 10, paddingBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5}}>
                        <Text style={{fontSize: 20, color: 'white'}}>View Competition Results</Text>
                    </TouchableOpacity>
                    <View style={{width: '100%', height: '50%', justifyContent: 'space-around', alignItems: 'center'}}>
                        <View style={{flexDirection: 'row', width: '100%', justifyContent: 'space-around'}}>
                            <View style={{width: '50%', alignItems: 'center'}}>
                                <Text style={{fontSize: 18, color: 'dimgray'}}>Start Date</Text>
                                <Text onPress={() => setStartOpen(true)} style={{paddingTop: 10, paddingBottom: 10, width: '80%', fontSize: 18, borderWidth: 1, borderRadius: 50, borderColor: 'lightgrey', color: 'dimgray', textAlign: 'center'}}>{startDate.toLocaleDateString()}</Text>
                                <DatePicker
                                    modal
                                    open={startOpen}
                                    date={startDate}
                                    onConfirm={(date) => {
                                    setStartOpen(false)
                                    setStartDate(date)
                                    setDatesChanged(true)
                                    }}
                                    onCancel={() => {
                                    setStartOpen(false)
                                    }}
                                    mode="date"
                                />
                            </View>
                            <View style={{width: '50%', alignItems: 'center'}}>
                                <Text style={{fontSize: 18, color: 'dimgray'}}>End Date</Text>
                                <Text onPress={() => setEndOpen(true)} style={{paddingTop: 10, paddingBottom: 10, width: '80%', fontSize: 18, borderWidth: 1, borderRadius: 50, borderColor: 'lightgrey', color: 'dimgray', textAlign: 'center'}}>{endDate.toLocaleDateString()}</Text>
                                <DatePicker
                                    modal
                                    open={endOpen}
                                    date={endDate}
                                    onConfirm={(date) => {
                                    setEndOpen(false)
                                    setEndDate(date)
                                    setDatesChanged(true)
                                    }}
                                    onCancel={() => {
                                    setEndOpen(false)
                                    }}
                                    mode="date"
                                />
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => saveDates()} disabled={!datesChanged} style={[{width: '40%', alignItems: 'center', borderRadius: 50, paddingTop: 10, paddingBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5}, datesChanged ? {backgroundColor: 'white'} : {backgroundColor: 'lightgray'}]}>
                            <Text style={{fontSize: 15, color: '#0155A4'}}>Save Changes</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => discardDates()} disabled={!datesChanged} style={[{width: '40%', alignItems: 'center', borderRadius: 50, paddingTop: 10, paddingBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5}, datesChanged ? {backgroundColor: 'white'} : {backgroundColor: 'lightgray'}]}>
                            <Text style={{fontSize: 15, color: '#0155A4'}}>Discard Changes</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => startNewCompetition()} style={{backgroundColor: '#a52a2a', width: '80%', alignItems: 'center', borderRadius: 50, paddingTop: 10, paddingBottom: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5}}>
                        <Text style={{fontSize: 20, color: 'white'}}>Start New Competition</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
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
        <SafeAreaView style={{flex: 1}}>
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
                <TouchableOpacity activeOpacity={0.9} style={{width: 50, height: 50, borderRadius: 100, backgroundColor: 'white', position: 'absolute', bottom: 10, right: 10, justifyContent: 'center', alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5}} onPress={toggleModal}>
                    <Text style={{color: 'green', fontWeight: '600', fontSize: 35}}>+</Text>
                </TouchableOpacity>
                <Modal isVisible={isModalVisible} propagateSwipe={true} statusBarTranslucent={true} style={{marginTop: 100, marginBottom: 100}}>
                    <ActivityModal wellnessCategory={null} activity={null} toggleModal={() => toggleModal()} />
                </Modal>
            </View>
        </SafeAreaView>
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
        <KeyboardAvoidingView behavior='position' style={{backgroundColor: 'white', borderRadius: 10, flex: 1}} contentContainerStyle={{backgroundColor: 'white', borderRadius: 10, flex: 1}}>
            <View style={{margin: 20, backgroundColor: 'white', justifyContent: 'space-between'}}>
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
                        style={{fontSize: 16, borderWidth: 1, borderRadius: 5, borderColor: 'grey', maxHeight: 120}}
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
            <TouchableOpacity activeOpacity={1} style={{padding: 15, backgroundColor: '#0155A4', flexDirection: 'row', justifyContent: 'space-between', borderBottomWidth: 2, borderColor: 'lightgrey',}} onPress={toggleHeader}>
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
            <Modal isVisible={isModalVisible} propagateSwipe={true} statusBarTranslucent={true} style={{marginTop: 100, marginBottom: 100, flex: 1}}>
                <ActivityModal wellnessCategory={category} activity={activity} toggleModal={toggleModal} />
            </Modal>
        </View>
        
    );
};

const AdminMainScreen = ({navigation}) => {
    const startDate = getCurrentCompetition()['startTime'].toDate();
    const endDate = getCurrentCompetition()['endTime'].toDate();
    return (
        <SafeAreaView style={{flex: 1, alignItems: "center"}}>
            <View style={{flexDirection: 'row', justifyContent: 'space-between', width: '100%'}}>
                <TouchableOpacity style={{borderRadius: 5, margin: 15, alignSelf: 'flex-start', width: 75}} onPress={() => signOut()}>
                    <Text style={{color: '#0155A4', fontWeight: '600', fontSize: 18}}>Sign Out</Text>
                </TouchableOpacity>
                <Text style={{fontSize: 30, fontWeight: "bold", padding: 5, color: '#0155A4'}}>Admin</Text>
                <View style={{paddingRight: 105}}/>
            </View>
            <View style={{width: '100%', flex: 1, justifyContent: 'space-around', alignItems: 'center'}}>
                <View style={styles.compPage}>
                    {competitionStatus()}
                </View>
                <View style={styles.btnPage}>
                        <View style={styles.btnContainer}>
                            {/* <View style={{flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                                <Text>Start Date: {startDate != null ? startDate.toLocaleDateString() : 'No date set'}</Text>
                                <Text>End Date: {endDate != null ? endDate.toLocaleDateString() : 'No date set'}</Text>
                            </View> */}
                            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Competition Settings')}>
                                <Text style={styles.btnFont}>Competition Settings</Text>
                            </TouchableOpacity>
                            {/* <TouchableOpacity style={styles.btn}>
                                <Text style={styles.btnFont}>Edit Users</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btn}>
                                <Text style={styles.btnFont}>Edit Milestones</Text>
                            </TouchableOpacity> */}
                            <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Edit Activities')}>
                                <Text style={styles.btnFont}>Edit Activities</Text>
                            </TouchableOpacity>
                        </View>
                </View>
            </View>
            <View style={{padding: 5}}/>
        </SafeAreaView>
    )
}

const Admin = ({navigation}) => {
    return (
        <Stack.Navigator screenOptions={{
            headerTintColor: '#0155A4',
            headerTitleStyle: {
                fontWeight: '600', fontSize: 25, color: '#0155A4'
            }
        }}>
            <Stack.Screen
                name='Main'
                component={AdminMainScreen}
                options={{headerShown: false}}
            />
            <Stack.Screen
                name='Edit Activities'
                component={AdminActivitiesScreen}
            />
            <Stack.Screen
                name='Competition Settings'
                component={CompetitionSettingsScreen}
            />
            <Stack.Screen
                name="Results"
                component={Compete}
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
        height: '50%',
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center', 
        justifyContent: 'space-around',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    btnContainer: {
        padding: 5, 
        width: "80%",
        justifyContent: 'space-around',
        height: '100%'
    },
    compPage:{
        height: '20%',
        width: "90%",
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: "center",
        justifyContent: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
    },
    btn:{
        padding: 15,
        width: '100%',
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#eee',
        borderRadius: 50,
        alignItems: 'center',

        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5,
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
        fontSize: 18,
        color: '#0155A4',
    },
    font:{
        fontSize: 18,
        color: 'dimgray',
        fontWeight: 'bold',
        textAlign: 'center'
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