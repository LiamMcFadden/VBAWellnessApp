import React, {useState, useRef} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {step0} from 'react-native/Libraries/Animated/Easing';
import {SafeAreaView} from 'react-navigation';
import {
  getActivitiesByCategory,
  getCurrentUser,
  updateCurrentUserFields,
  completeActivityForCurrentUser,
} from '_api/firebase-db';
import {Header, ListItem} from '_atoms';
import Card from './card';
import {OutlinedButton} from '../../globals/styledcomponents';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  buttons: {
    width: 0.95 * windowWidth,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#0155A4',
    borderTopColor: '#fefefe',
    borderTopWidth: 1,
  },
  text: {
    color: 'white',
  },
  //Profile Card
  profileCard: {
    width: 0.95 * windowWidth,
    height: (0.95 * windowWidth) / 1.5,
    alignSelf: 'center',
    backgroundColor: '#0155A4',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
  },

  nameText: {
    margin: 7,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },

  bodyText: {
    marginLeft: 7,
    color: 'white',
    fontSize: 14,
  },

  profileButton: {
    width: windowWidth / 4,
    height: 25,
    marginLeft: 7,
    marginTop: 15,
    borderRadius: 3,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 5,
    paddingRight: 10,
  },

  profileButtonText: {
    color: '#0155A4',
    fontSize: 18,
  },

  pcardContainer: {},
  // End Profile Cdard
});

const pcard = {
  width: 0.95 * windowWidth,
  height: (0.95 * windowWidth) / 2,
};

const ActivityItem = ({activity, addPoints}) => (
  <TouchableOpacity onPress={() => addPoints()} />
);

const PCard = ({name, description, navigation}) => {};

/**
 * Shows the users profile with a button that will link to
 * the users full profile
 *
 * // TODO This will need to be moved into its own file later
 * // TODO Check Styles for responsiveness --> this might not be good Right now
 */
const ProfileCard = ({navigation}) => {
  const name = getCurrentUser().firstName + ' ' + getCurrentUser().lastName;
  return (
    <View style={styles.profileCard}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.bodyText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc molestie
        posuere congue. Donec hendrerit, diam eget viverra pretium, lacus ligula
        scelerisque felis, eu finibus neque massa eget justo.
      </Text>
      <TouchableOpacity
        style={styles.profileButton}
        onPress={() => navigation.navigate('Profile')}
      >
        <Ionicons name="person-circle-outline" size={20} color={'#0155A4'} />
        <Text style={styles.profileButtonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};
const Home = ({navigation}) => {
  const [items, setItems] = useState(getActivitiesByCategory('Physical'));

  const [totalPoints, setTotalPoints] = useState(getCurrentUser().points);

  const scrollRef = useRef();
  const scrollUp = index => {
    scrollRef.current?.scrollTo({
      y: index * 85,
      x: 0,
      animated: true,
    });
    //console.log(e.target.measure);
    //if (e) {
    //e.target.measure((x, y, width, height, pageX, pageY) => {
    //scrollRef.current?.scrollTo({
    //y: 85 * {index}, //Math.max(pageY, 0), // This should be max
    //x: 0,
    //animated: true,
    //});
    //});
    //} else {
    //scrollRef.current?.scrollTo({y: 0, x: 0, animated: true});
    //}
  };

  const addPoints = points => {
    let newTotal = totalPoints + points;
    setTotalPoints(newTotal);
    updateCurrentUserFields({points: newTotal}).catch(err => {
      setTotalPoints(newTotal - points);
      console.error(err);
      //TODO: Alert connection error
    });
  };
  const action = item => {
    const newTotal = totalPoints + item.points;

    setTotalPoints(newTotal);
    completeActivityForCurrentUser(item.uid).catch(err => {
      setTotalPoints(newTotal - points);
      console.error(err);
      //TODO: Alert connection error
    });
  };
  return (
    <SafeAreaView style={{backgroundColor: '#F3F4F7', height: '100%'}}>
      <ProfileCard navigation={navigation} />
      <ScrollView ref={scrollRef}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(i => (
          <Card onClick={scrollUp} index={i} />
        ))}
      </ScrollView>

      <TouchableOpacity onPress={scrollUp}>
        <OutlinedButton width={10}>HELLO</OutlinedButton>
      </TouchableOpacity>
      {/*
       *<FlatList
       *  data={items}
       *  renderItem={({item}) => <ListItem item={item} action={action} />}
       */}
    </SafeAreaView>
  );
};

export default Home;
