/* eslint-disable react-native/no-inline-styles */
import {useFocusEffect} from '@react-navigation/native'
import React, {useState, useEffect, useRef} from 'react'
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  View,
  ScrollView,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {SafeAreaView} from 'react-navigation'
import {
  getCurrentUserActivityStats,
  getActivitiesByCategory,
  getCurrentUser,
  updateCurrentUserFields,
  completeActivityForCurrentUser,
  getActivitiesAndCurrentUserStats,
  getActivitiesSortedByDate,
  getActivityById,
} from '_api/firebase-db'
import {OutlinedButton} from '../../globals/styledcomponents'
import {TYPESCALE, COLORS} from '../../globals/styles'
import ActivityList from './activityList'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const profileStyles = StyleSheet.create({
  profileContainer: {
    width: 0.95 * windowWidth,
    height: (0.95 * windowWidth) / 1.6,
    alignSelf: 'center',
    backgroundColor: '#0155A4',
    borderRadius: 10,
    marginTop: 30,
    marginBottom: 10,
    paddingTop: 5,
    justifyContent: 'space-evenly',
    paddingLeft: '2.5%',
    paddingRight: '2.5%',
    paddingBottom: 7,
  },
  profileUsername: {
    ...TYPESCALE.h5,
    color: '#fff',
    margin: 5,
  },
  profileText: {
    ...TYPESCALE.body1,
    color: '#fff',
  },
  pfpBtnContents: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
})
/**
 * Shows the users profile with a button that will link to
 * the users full profile
 *
 * // TODO This will need to be moved into its own file later
 * // TODO Check Styles for responsiveness --> this might not be good Right now
 */
const ProfileCard = ({navigation}) => {
  const name = getCurrentUser().firstName + ' ' + getCurrentUser().lastName
  return (
    <View style={profileStyles.profileContainer}>
      <Text style={profileStyles.profileUsername}>{name}</Text>
      <Text style={profileStyles.profileText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc molestie
        posuere congue.{' '}
      </Text>
      {/* <OutlinedButton
        width={'40%'}
        height={35}
        buttonStyle={{marginBottom: 0, marginLeft: 0}}
        onPress={() => navigation.navigate('Profile')}>
        <View style={profileStyles.pfpBtnContents}>
          <Ionicons name="person-circle-outline" size={25} color={'#0155A4'} />
          <Text
            style={[
              TYPESCALE.button,
              {marginLeft: 20, textAlign: 'center', color: COLORS.primary},
            ]}>
            Profile
          </Text>
        </View>
      </OutlinedButton> */}
      <TouchableHighlight
        underlayColor={COLORS.tintPrimary(0.2)}
        onPress={() => navigation.navigate('Profile')}
        style={{
          width: '40%',
          height: 35,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fefefe', //offwhiteish
          borderWidth: 1,
          borderColor: '#0155A4',
          borderRadius: 4,
          margin: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 1, //might be better to use 2 and 1 for w and h
            height: 0,
          },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          elevation: 4,
          paddingLeft: 16,
          paddingRight: 16,
          marginBottom: 0,
          marginLeft: 0,
        }}
      >
        <View style={profileStyles.pfpBtnContents}>
          <Ionicons name='person-circle-outline' size={25} color={'#0155A4'} />
          <Text
            style={[
              TYPESCALE.button,
              {marginLeft: 20, textAlign: 'center', color: COLORS.primary},
            ]}
          >
            Profile
          </Text>
        </View>
      </TouchableHighlight>
    </View>
  )
}
const Home = ({navigation}) => {
  const [items, setItems] = useState([])
  const [totalPoints, setTotalPoints] = useState(getCurrentUser().points)
  // const [activities, setActivities] = useState(getActivitiesSortedByDate());

  useFocusEffect(
    React.useCallback(() => {
      let isActive = false
      let userActivitiyIDList = getActivitiesSortedByDate()
      let i = 0
      let recentActivities = []
      for (; i < userActivitiyIDList, i < 5; i++) {
        recentActivities.push(getActivityById(userActivitiyIDList[i][0]))
      }
      console.log(recentActivities)
      setItems(recentActivities)
      return () => (isActive = true)
    }, []),
  )

  // useEffect(() => {
  //   let userActivitiyIDList = getActivitiesSortedByDate()
  //   let i = 0
  //   let recentActivities = []
  //   for (; i < userActivitiyIDList, i < 5; i++) {
  //     recentActivities.push(getActivityById(userActivitiyIDList[i][0]))
  //   }
  //   console.log(recentActivities)
  //   setItems(recentActivities)
  // }, [])
  //
  const addPoints = points => {
    let newTotal = totalPoints + points
    setTotalPoints(newTotal)
    updateCurrentUserFields({points: newTotal}).catch(err => {
      setTotalPoints(newTotal - points)
      console.error(err)
      //TODO: Alert connection error
    })
  }
  const action = item => {
    const newTotal = totalPoints + item.points
  }

  return (
    <SafeAreaView style={{backgroundColor: '#F3F4F7', height: '100%'}}>
      <ProfileCard navigation={navigation} />
      <ActivityList data={items} openModal={null} />
    </SafeAreaView>
  )
}

export default Home
