import React from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, Image, Text, View } from 'react-native';
import { State } from 'react-native-gesture-handler';

import {
    getCurrentUserActivityStats,
} from '_api/firebase-db';


const Activity = ({activity, action, toggleView}) => {

    let stats = getCurrentUserActivityStats(activity.uid);
    if(stats == undefined) {
        stats = {
            timesTotal: 0,
        };
    }

    const completeActivity = () => {
        action(activity);
        toggleView(false);
    }

    return (
        <View style={styles.modalBackground}>
            <View style={{flexDirection: 'row', flexshrink: 1, justifyContent: 'space-between'}}>
                <Text style={styles.titleText}>{activity.title}</Text>
                <Text style={styles.points}>
                    {activity.points}
                    <Text style={styles.pointsSuffix}> pts</Text>
                </Text>
            </View>
            <View style={{flexDirection: 'row', flexshrink: 1, justifyContent: 'space-between'}}>
                {/* TODO: change below value to activity.timesTotal when updating database works */}
                <Text style={styles.timesCompletedText}>Times Completed: {stats.timesTotal}</Text>
                <View style={{flexDirection: 'row'}}>
                    {stats.timesTotal >= 3 
                        ? <Image source={require('_assets/images/BronzeBadgeIcon.png')} style={styles.badge}/>
                        : <Image source={require('_assets/images/MissingBadgeIcon.png')} style={styles.badge}/>
                    }
                    {stats.timesTotal >= 5 
                        ? <Image source={require('_assets/images/SilverBadgeIcon.png')} style={styles.badge}/>
                        : <Image source={require('_assets/images/MissingBadgeIcon.png')} style={styles.badge}/>
                    }
                    {stats.timesTotal >= 10 
                        ? <Image source={require('_assets/images/GoldBadgeIcon.png')} style={styles.badge}/>
                        : <Image source={require('_assets/images/MissingBadgeIcon.png')} style={styles.badge}/>
                    }
                </View>
            </View>
            <ScrollView style={{margin: 15}} contentContainerStyle={{flexGrow: 1}}>
                {/* PLACEHOLDER: the image for the activity can be rendered in this view */}
                {/* <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'lightgrey', width: '100%', height: 150, marginBottom: 10}}>
                    <Text style={{fontSize: 15}}>Filler for where an optional image will go</Text>
                </View> */}
                <Text style={{flex: 1, fontWeight: '600', color: 'dimgrey'}}>{activity.description}</Text>
            </ScrollView>
            <TouchableOpacity style={styles.completeButton} onPress={completeActivity}>
                <Text style={styles.compBtnText}>Complete Activity</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    modalBackground: {
        padding: 15,
        flex: 0,
        backgroundColor: 'white',
        borderRadius: 10,
        maxHeight: '90%',
    },
    titleText: {
        width: '75%',
        fontSize: 32,
        color: '#0155A4',
        fontWeight: '600'
    },
    points: {
        fontSize: 32,
        color: '#0155A4',
        fontWeight: '600'
    },
    pointsSuffix: {
        paddingTop: 5,
        fontSize: 20,
        color: '#0155A4',
        fontWeight: '600'
    },
    completeButton: {
        padding: 5,
        backgroundColor: '#0155A4',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    compBtnText: {
        width: '75%',
        fontSize: 28,
        color: 'white',
        textAlign: 'center'
    },
    timesCompletedText: {
        margin: 5, 
        marginLeft: 10, 
        color: '#0155A4', 
        fontWeight: '600'
    },
    badge: {
        width: 30,
        aspectRatio: 0.873,
        resizeMode: 'contain',
        marginRight: 5,
    }
});

export default Activity;
