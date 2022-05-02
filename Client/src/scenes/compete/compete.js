import React, {useContext, useState, useEffect} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  RefreshControl,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import SwitchSelector from 'react-native-switch-selector';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfilePicture from 'react-native-profile-picture';
import {getAllUsers, getCurrentUser} from '../../api/firebase-db';
import { currentUser } from '_api/firebase-auth';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  header: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    color: '#0155A4',
    marginBottom: 10,
  },
  selector: {
    width: windowWidth * 0.75,
    alignSelf: 'center',
    marginBottom: 10
  },
  secondandthird: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    width: windowWidth * 0.75,
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  playerRank: {
    alignSelf: 'center',
    fontSize: 25,
    marginRight: 10,
    color: 'black',
    fontWeight: 'bold',
  },
  playerName: {
    fontSize: 16,
    marginLeft: 10,
    alignSelf: 'center',
    color: '#0155A4',
  },
  playerPoints: {
    alignSelf: 'center',
    marginLeft: 'auto',
    fontWeight: '500',
    color: 'black',
  },
  pfpName: {
    alignSelf: 'center',
    marginTop: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0155A4',
    marginBottom: 10,
  },
  refreshButton: {
    alignSelf: 'flex-end',
    marginRight: 20,
    marginTop: 20,
  },
  badge: {
      alignSelf: 'center',
      marginLeft: 'auto',
      width: 20,
      aspectRatio: 0.873,
      resizeMode: 'contain',
      marginRight: 5,
  },
  badgeContainer: {
    alignSelf: 'center',
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  badgeLabel: {
    alignSelf: 'center',
    marginRight: 3,
    fontWeight: 'bold',
  }
});

/*
 * Selector switch for displaying either points or badges
 * uses 'react-native-switch-selector'
 */
const PointsorBadges = ({onChange}) => {
  const options = [
    {label: 'Points', value: 'points'},
    {label: 'Badges', value: 'badges'},
  ];

  return (
    <View>
      <Text style={styles.header}>Leaderboard</Text>
      <SwitchSelector
        style={styles.selector}
        options={options}
        initial={0}
        onPress={value => onChange(value)}
        on
        backgroundColor={'#A9A9A9'}
        buttonColor={'white'}
        textColor={'#0155A4'}
        selectedColor={'#0155A4'}
      />
    </View>
  );
};

/*
 * Displays the pfp/icon for first place user
 */
const First = ({props}) => {
  let pfp = props ? props.profileImage : null;

  // use default icon if no pfp is found
  if (!props || pfp === undefined) {
    pfp = (
      <Ionicons
        style={styles.cardIcon}
        name="person-circle-outline"
        size={50}
        color={'#0155A4'}
      />
    );
  } else {
    pfp = (
      <ProfilePicture isPicture={true} URLPicture={pfp} shape="circle" />
    );
  }

  return <View style={styles.first}>{pfp}</View>;
};

const FirstLabel = ({props}) => {
  let name = props ? props.firstName : "";
  return <Text style={styles.pfpName}>{name}</Text>;
};

/*
 * Displays the pfp/icon for second and third place user
 */
const SecondAndThird = ({props}) => {
  let pfpSecond = props[0] ? props[0].profileImage : null;

  // use default icon if no pfp is found
  if (!props[0] || pfpSecond === undefined) {
    pfpSecond = (
      <Ionicons
        style={styles.cardIcon}
        name="person-circle-outline"
        size={50}
        color={'#0155A4'}
      />
    );
  } else {
    pfpSecond = (
      <ProfilePicture
        isPicture={true}
        URLPicture={pfpSecond}
        shape="circle"
      />
    );
  }

  let pfpThird = props[1] ? props[1].profileImage : null;

  // use default icon if no pfp is found
  if (!props[1] || pfpThird === undefined) {
    pfpThird = (
      <Ionicons
        style={styles.cardIcon}
        name="person-circle-outline"
        size={50}
        color={'#0155A4'}
      />
    );
  } else {
    pfpThird = (
      <ProfilePicture
        isPicture={true}
        URLPicture={pfpThird}
        shape="circle"
      />
    );
  }

  return (
    <View style={styles.secondandthird}>
      {pfpSecond}
      {pfpThird}
    </View>
  );
};

const SecondAndThirdLabels = ({props}) => {
  let nameSecond = props[0] ? props[0].firstName : "";
  let nameThird = props[1] ? props[1].firstName : "";
  return (
    <View style={styles.secondandthird}>
      <Text style={styles.pfpName}>{nameSecond}</Text>
      <Text style={styles.pfpName}>{nameThird}</Text>
    </View>
  );
};

/**
 * Displays a users name, rank, pfp/icon, and score/badges
 */
const PlayerCard = ({navigation, props, sortType}) => {
  props = props ? props : {};
  let backgroundColor = 'white';
  let pfp = props.profileImage;
  let badges = props.badges ? props.badges : {bronze: 0, silver: 0, gold: 0};
  let rank = sortType === 'points' ? props.rank : props.badgeRank;

  // use default icon if no pfp is found
  if (pfp === undefined) {
    pfp = (
      <Ionicons
        style={styles.cardIcon}
        name="person-circle-outline"
        size={50}
        color={'#0155A4'}
      />
    );
  } else {
    pfp = (
      <ProfilePicture isPicture={true} URLPicture={pfp} shape="circle" />
    );
  }

  if (rank) {
    switch (rank) {
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
  }
  // onPress={navigation.navigate('Profile', {userId: props.uid})}
  return (
    <TouchableOpacity style={[styles.playerCard, {backgroundColor: backgroundColor}]} onPress={() => {navigation.navigate('Profile', {userId: props.uid})}}>
      <Text style={styles.playerRank}> {rank} </Text>
      {pfp}
      <Text style={styles.playerName} >{props.firstName}</Text>
      {sortType === 'points' ? (
        <Text style={styles.playerPoints}>{props.points} pts.</Text>
      ) : (
        <View style={styles.badgeContainer}>
          <Text style={styles.badgeLabel}>{badges.bronze}</Text>
          <Image source={require('_assets/images/BronzeBadgeIcon.png')} style={styles.badge}/>
          <Text style={styles.badgeLabel}>{badges.silver}</Text>
          <Image source={require('_assets/images/SilverBadgeIcon.png')} style={styles.badge}/>
          <Text style={styles.badgeLabel}>{badges.gold}</Text>
          <Image source={require('_assets/images/GoldBadgeIcon.png')} style={styles.badge}/>
        </View>
      )}
    </TouchableOpacity>
  );
};

const Compete = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [usersByPoints, setUsersByPoints] = useState([]);
  const [usersByBadges, setUsersByBadges] = useState([]);
  const [currUser, setCurrUser] = useState([]);
  const [first, setFirst] = useState([]);
  const [second, setSecond] = useState([]);
  const [third, setThird] = useState([]);
  const [badgesTop3, setBadgesTop3] = useState([]); // array of top 3 users by badges
  const [pointsTop3, setPointsTop3] = useState([]); // array of top 3 users by points
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sortType, setSort] = useState('points');


  // background refresh
  // rate is set to 15 secs by default
  //const REFRESH_INTERVAL = 15000;
  //useEffect(() => {
  //  const interval = setInterval(() => {
  //    getUsers();
  //  }, REFRESH_INTERVAL);
  //  return () => clearInterval(interval);
  //}, []);

  // used for pull to refresh functionality
  const onRefresh = () => {
    setRefreshing(true);
    getUsers();
    setRefreshing(false);
  }



  /**
   * Gets all users from the database, sorts them by points, and then sets the first, second, and third place users
   */
  const getUsers = () => {
    getAllUsers().then(allUsers => {
      let tempUsers = [];
      let tempCurrUser = [];

      // get array of user data
      allUsers.docs.map(doc => {
        let data = doc.data();
        data.uid = doc.id;

        // ignore admins
        if (!data.admin) {
          // set badgePoints
          let badgePoints = 0;
          if (data.badges) {
            badgePoints += data.badges.bronze;
            badgePoints += data.badges.silver * 2;
            badgePoints += data.badges.gold * 3;
          }
          data.badgePoints = badgePoints;
          tempUsers.push(data);
        }
      });

      let tempUsersByPoints = [...tempUsers];
      let tempUsersByBadges = [...tempUsers];

      /**
       * Get list of users ordered by points from activites
       */
      tempUsersByPoints.sort((a, b) => (a.points < b.points ? 1 : -1));
      let prev = tempUsersByPoints[0];
      let top3 = [null, null, null]
      tempUsersByPoints.map((user, index) => {
        // handle ties
        if (user.points === prev.points && prev.rank) {
          user.rank = prev.rank;
        } else if (user.points === prev.points && !prev.rank) {
          user.rank = index + 1;
        } else {
          user.rank = prev.rank + 1;
        }
        prev = user;

        /**
         * set first, second, and third place users for use as props later on
         * I'm doing this so we don't have to pass the the entire array of users
         * as a prop
         */
        if (index < 3) {
          top3[index] = user;
        }

        if (user.uid === currentUser().uid) {
          tempCurrUser = user;
        }
      });
      if (sortType === 'points') {
        setFirst(top3[0]);
        setSecond(top3[1]);
        setThird(top3[2]);
      }
      setPointsTop3(top3);
      setUsersByPoints(tempUsersByPoints);

      /**
       * Get list of users ordered by badges from activites
       */
      tempUsersByBadges.sort((a, b) => (a.badgePoints < b.badgePoints ? 1 : -1));
      prev = tempUsersByBadges[0];
      top3 = [null, null, null]
      tempUsersByBadges.map((user, index) => {
        // handle ties
        if (user.badgePoints === prev.badgePoints && prev.badgeRank) {
          user.badgeRank = prev.badgeRank;
        } else if (user.badgePoints === prev.badgePoints && !prev.badgeRank) {
          user.badgeRank = index + 1;
        } else {
          user.badgeRank = prev.badgeRank + 1;
        }
        prev = user;

        /**
         * set first, second, and third place users for use as props later on
         * I'm doing this so we don't have to pass the the entire array of users
         * as a prop
         */
        if (index < 3) {
          top3[index] = user;
        }

        if (user.uid === currentUser().uid) {
          tempCurrUser = user;
        }
      });
      if (sortType === 'badges') {
        setFirst(top3[0]);
        setSecond(top3[1]);
        setThird(top3[2]);
      }
      setBadgesTop3(top3);
      setUsersByBadges(tempUsersByBadges);

      if (sortType === 'points') 
        setUsers(tempUsersByPoints);
      else if (sortType === 'badges')
        setUsers(tempUsersByBadges);

      setCurrUser(tempCurrUser);
      setLoading(false);
    });
  };

  useEffect(getUsers, []);

  const setOrder = (value) => {
    if (value === 'points') {
      setFirst(pointsTop3[0]);
      setSecond(pointsTop3[1]);
      setThird(pointsTop3[2]);
      setUsers(usersByPoints);
    } else if (value === 'badges') {
      setFirst(badgesTop3[0]);
      setSecond(badgesTop3[1]);
      setThird(badgesTop3[2]);
      setUsers(usersByBadges);
    }

    setSort(value);
  };

  if (loading) {
    return (
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
    //<RefreshButton/> -- deleted for now
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={{flex: 1}}>
          { !getCurrentUser().admin && 
          <PlayerCard navigation={navigation} props={currUser} sortType={sortType} />
          }
          <PointsorBadges onChange={setOrder} />
          <View style={{flex: 1}}>
            <FlatList
              data={users}
              renderItem={({item}) => <PlayerCard navigation={navigation} props={item} sortType={sortType} />}
              ListHeaderComponent={
                <>
                  <First props={first} />
                  <FirstLabel props={first} />
                  <SecondAndThird props={[second, third]} />
                  <SecondAndThirdLabels props={[second, third]} />
                </>
              }
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
};

export default Compete;

  // refresh button, refreshed with no indicator at the moment
  //const RefreshButton = () => {
  //  return (
  //    <View style={styles.refreshButton}>
  //      <Ionicons
  //        name="md-refresh"
  //        size={30}
  //        color="#0155A4"
  //        onPress={() => onRefresh()}
  //      />
  //    </View>
  //  );
  //};
