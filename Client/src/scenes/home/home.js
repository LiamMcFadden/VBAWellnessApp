/* eslint-disable react-native/no-inline-styles */
import { useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import {
  Dimensions, Image, StyleSheet,
  Text,
  TouchableOpacity, View
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { SafeAreaView } from 'react-navigation'
import {
  getActivitiesSortedByDate,
  getActivityById, getCurrentUser
} from '_api/firebase-db'
import { OutlinedButton, ProgressBar } from '../../globals/styledcomponents'
import { COLORS, TYPESCALE } from '../../globals/styles'
import Activities from './activityList'
import VBALogo from './cartoon.jpg'

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
  pfpImage: {
    position: 'absolute',
    width: 0.95 * windowWidth,
    height: "80%",
    top: 0,
    marginLeft: 0,
    padding: 0
  }

})

const PFP = ({ navigation }) => {
  const name = getCurrentUser().firstName + ' ' + getCurrentUser().lastName
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Profile')}
      style={[profileStyles.profileContainer,
      { padding: 0, alignItems: 'flex-start', justifyContent: 'flex-end', overflow: 'hidden', backgroundColor: "#fff" }]}
    >
      <Image style={profileStyles.pfpImage} source={VBALogo} />
      <View style={{ width: "100%", flexDirection: 'row', height: 30, justifyContent: "space-between" }}>
        <Text style={[{ color: "black", ...TYPESCALE.h6, marginLeft: 0, textAlign: 'center' }]}>{name}</Text>
        <View style={{ justifyContent: 'flex-start' }}>
          <Text style={{ ...TYPESCALE.body1 }}> Lvl 5 </Text>
          <ProgressBar width={(0.95 * windowWidth) * 0.5} points={50} milestone={100} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

/**
 * Shows the users profile with a button that will link to
 * the users full profile
 *
 * // TODO This will need to be moved into its own file later
 * // TODO Check Styles for responsiveness --> this might not be good Right now
 */
const ProfileCard = ({ navigation }) => {
  const name = getCurrentUser().firstName + ' ' + getCurrentUser().lastName
  return (
    <View style={profileStyles.profileContainer}>
      <Text style={profileStyles.profileUsername}>{name}</Text>
      <Text style={profileStyles.profileText}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc molestie
        posuere congue.{' '}
      </Text>
      <OutlinedButton
        width={'40%'}
        height={35}
        buttonStyle={{ marginBottom: 0, marginLeft: 0 }}
        onPress={() => navigation.navigate('Profile')}
      >
        <View style={profileStyles.pfpBtnContents}>
          <Ionicons name='person-circle-outline' size={25} color={'#0155A4'} />
          <Text
            style={[
              TYPESCALE.button,
              { marginLeft: 20, textAlign: 'center', color: COLORS.primary },
            ]}
          >
            Profile
          </Text>
        </View>
      </OutlinedButton>
    </View>
  )
}
const Home = ({ navigation }) => {
  const [items, setItems] = useState([])
  const [totalPoints, setTotalPoints] = useState(getCurrentUser().points)

  /**
    * Could potentially require sever requests
    * And often usage, best to memoize
    * Also plays well with useFocus
    * */
  const addPointsMemoized = useCallback(() => {
    let userActivitiyIDList = getActivitiesSortedByDate()
    let i = 0
    let recentActivities = []
    for (; i < userActivitiyIDList, i < 5; i++) {
      recentActivities.push(getActivityById(userActivitiyIDList[i][0]))
    }
    setItems(recentActivities)
    return () => ({})
  }, [])

  useFocusEffect(addPointsMemoized)


  const handlePointsUpdate = () => {
    addPointsMemoized()
  }
  return (
    <SafeAreaView style={{ backgroundColor: '#F3F4F7', height: '100%' }}>
      <PFP navigation={navigation} />
      <Activities activities={items} activityCompleted={handlePointsUpdate} />
    </SafeAreaView>
  )
}

export default Home
