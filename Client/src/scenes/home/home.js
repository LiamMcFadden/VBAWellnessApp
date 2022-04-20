import React, {useState, useContext} from 'react';
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {SafeAreaView} from 'react-navigation';
import {Header, ListItem} from '_atoms';
import {UserContext} from '_components/Authentication/user';

import {getActivitiesByCategory} from '_api/firebase-db';

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
    height: windowHeight / 4,
    alignSelf: 'center',
    backgroundColor: '#0155A4',
    borderRadius: 5,
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

  // End Profile Cdard
});

/**
 * Shows the users profile with a button that will link to
 * the users full profile
 *
 * // TODO This will need to be moved into its own file later
 * // TODO Check Styles for responsiveness --> this might not be good Right now
 */
const ProfileCard = () => {
  const context = useContext(UserContext);
  const name = context.state.firstName + ' ' + context.state.lastName;
  return (
    <View style={styles.profileCard}>
      <Text style={styles.nameText}>{name}</Text>
      <Text style={styles.bodyText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc molestie
        posuere congue. Donec hendrerit, diam eget viverra pretium, lacus ligula
        scelerisque felis, eu finibus neque massa eget justo.
      </Text>
      <TouchableOpacity style={styles.profileButton}>
        <Ionicons name="person-circle-outline" size={20} color={'#0155A4'} />
        <Text style={styles.profileButtonText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
};
const Home = () => {
  const {state, completeActivity} = useContext(UserContext);

  const [items, setItems] = useState(getActivitiesByCategory('Physical'));

  return (
    <SafeAreaView>
      <ProfileCard />
      <Header title={state.points} width={0.95 * windowWidth} />
      <View style={styles.buttons}>
        <Text
          style={styles.text}
          onPress={() => setItems(getActivitiesByCategory('Physical'))}>
          Physical
        </Text>
        <Text
          style={styles.text}
          onPress={() => setItems(getActivitiesByCategory('Emotional'))}>
          Emotional
        </Text>
        <Text
          style={styles.text}
          onPress={() => setItems(getActivitiesByCategory('Intellectual'))}>
          Intellectual
        </Text>
        <Text
          style={styles.text}
          onPress={() => setItems(getActivitiesByCategory('Occupational'))}>
          Occupational
        </Text>
        <Text
          style={styles.text}
          onPress={() => setItems(getActivitiesByCategory('Spiritual'))}>
          Spiritual
        </Text>
        <Text
          style={styles.text}
          onPress={() => setItems(getActivitiesByCategory('Social'))}>
          Social
        </Text>
      </View>
      <FlatList
        data={items}
        renderItem={({item}) => (
          <ListItem item={item} action={completeActivity} />
        )}
      />
    </SafeAreaView>
  );
};

export default Home;
