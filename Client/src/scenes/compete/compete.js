import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfilePicture from 'react-native-profile-picture';

// TODO: replace this with db query of some sort
import {
    top10
} from '../compete/data';

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
    },
    secondandthird: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    first: {
        marginTop: 20,
        alignSelf: 'center',
    },
    playerCard: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        width: (windowWidth*.75),
        padding: 10,
        paddingLeft: 15,
        paddingRight: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,  
        elevation: 5
    },
    playerRank: {
        alignSelf: 'center',
        fontSize: 25,
        marginRight: 10,
        color: 'black',
        fontWeight: 'bold'
    },
    playerName: {
        fontSize: 16,
        marginLeft: 10,
        alignSelf: 'center',
        color: "#0155A4"
    },
    playerPoints: {
        alignSelf: 'center',
        marginLeft: 'auto',
        fontWeight: '500',
        color: 'black'
    },
    pfpName: {
        alignSelf: 'center',
        marginTop: 5,
        fontSize: 16,
        fontWeight: 'bold',
        color: "#0155A4",
        marginBottom: 10
    }
});

/*
 * Selector switch for displaying either points or badges
 * uses 'react-native-switch-selector'
 */
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

/*
 * Displays the pfp/icon for first place user
 */
const First = () => {
    // TODO: replace with query to db
    //let pfp = require('./test.png')
    let pfp = null;

    // use default icon if no pfp is found
    if (pfp === null) {
        pfp = 
            <Ionicons 
                style={styles.cardIcon} 
                name="person-circle-outline" 
                size={50} 
                color={'#0155A4'} 
            />;
    }
    else {
        pfp = 
            <ProfilePicture 
                isPicture={true}
                requirePicture={pfp}
                shape='circle'
            />
    }

    return (
        <View style={styles.first}>
            {pfp}
        </View>
    );
}

const FirstLabel = () => {
    // TODO: replace with query to db
    let name = "Jim";
    return (
        <Text style={styles.pfpName}>{name}</Text>
    );
}

/*
 * Displays the pfp/icon for second and third place user
 */
const SecondAndThird = () => {
    // TODO: replace with query to db
    //let pfpSecond = require('./test.png');
    let pfpSecond = null;

    // use default icon if no pfp is found
    if (pfpSecond === null) {
        pfpSecond = 
            <Ionicons 
                style={styles.cardIcon} 
                name="person-circle-outline" 
                size={50} 
                color={'#0155A4'} 
            />;
    }
    else {
        pfpSecond = 
            <ProfilePicture 
                isPicture={true}
                requirePicture={pfpSecond}
                shape='circle'
            />
    }

    //let pfpThird = require('./test.png');
    let pfpThird = null;

    // use default icon if no pfp is found
    if (pfpThird === null) {
        pfpThird = <Ionicons 
                style={styles.cardIcon} 
                name="person-circle-outline" 
                size={50} 
                color={'#0155A4'} 
            />;
    }
    else {
        pfpThird = 
            <ProfilePicture 
                isPicture={true}
                requirePicture={pfpThird}
                shape='circle'
            />
    }

    return (
        <View style={styles.secondandthird}>
            {pfpSecond}
            {pfpThird}
        </View>
    );
}

const SecondAndThirdLabels = () => {
    // TODO: replace with query to db
    let nameFirst = "Bob"
    let nameSecond = "Sally"
    return (
        <View style={styles.secondandthird}>
            <Text style={styles.pfpName}>{nameFirst}</Text>
            <Text style={styles.pfpName}>{nameSecond}</Text>
        </View>
    );
}

/*
 * Displays a users name, rank, pfp/icon, and score/badges
 */
const PlayerCard = (props) => {
    let backgroundColor = 'white';

    // TODO: replace with DB query
    //let pfp = require('./test.png');
    let pfp = null;
    // use default icon if no pfp is found
    if (pfp === null) {
        pfp = 
            <Ionicons 
                style={styles.cardIcon} 
                name="person-circle-outline" 
                size={50} 
                color={'#0155A4'} 
            />;
    }
    else {
        pfp = 
            <ProfilePicture 
                isPicture={true}
                requirePicture={pfp}
                shape='circle'
            />
    }

    switch (props.props.rank) {
        case 1:
            backgroundColor = 'gold';
            break;
        case 2:
            backgroundColor = 'silver';
            break;
        case 3:
            backgroundColor = '#CD7F32';
            break;
    }

    return (
        <View style={[styles.playerCard, {backgroundColor: backgroundColor}]}>
            <Text style={styles.playerRank}> {props.props.rank} </Text>
            {pfp}
            <Text style={styles.playerName}>{props.props.name}</Text>
            <Text style={styles.playerPoints}>{props.props.points} pts</Text>
        </View>
    );
}

const Compete = () => {
    return (
        <View style={{flex:1}}>
            <PointsorBadges/>
            <First/>
            <FirstLabel/>
            <SecondAndThird/>
            <SecondAndThirdLabels/>
            <View style={{flex:1}}>
                <FlatList
                    data={top10}
                    renderItem={({item}) => (
                        <PlayerCard
                            props={item}
                        />
                    )}
                />
            </View>
        </View>
    );
}

export default Compete;