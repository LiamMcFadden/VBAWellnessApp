import React, {useState, useContext} from 'react'
import {
  FlatList,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Keyboard,
  Text,
  View,
} from 'react-native'
import {SafeAreaView} from 'react-navigation'
import Modal from 'react-native-modal'
import Carousel from 'react-native-snap-carousel'
import {ProgressBar} from '../../globals/styledcomponents'
import {Activity} from '_atoms'
//activity lists for each wellness category
//once database is setup, these will be pulled from there
import {getActivitiesByCategory} from '_api/firebase-db'
import {UserContext} from '_components/Authentication/user'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingTop: 15,
    paddingBottom: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#0155A4',
    backgroundColor: 'white',
    width: '100%',
    height: 'auto',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  headerText: {
    //color: 'white',
    color: '#0155A4',
    fontSize: 23,
    textAlign: 'center',
  },
  buttons: {
    //backgroundColor: '#0155A4',
    backgroundColor: 'white',
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  carouselItemText: {
    //color: 'white',
    color: '#0155A4',
    fontSize: 25,
    alignSelf: 'center',
  },
  arrowText: {
    fontSize: 27,
    //color: 'white',
    color: '#0155A4',
    fontWeight: '600',
  },
  text: {
    color: 'white',
  },
  listItem: {
    padding: 15,
    //backgroundColor: '#f8f8f8',
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#eee',
    borderRadius: 50,

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    alignItems: 'center',
  },

  listItemTextContainer: {
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  listItemTitleText: {
    fontSize: 18,
    maxWidth: windowWidth / 1.5,
    color: '#0155A4',
  },
  listItemText: {
    fontSize: 12,
    maxWidth: windowWidth / 1.5,
    color: '#0155A4',
  },
  iconView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 70,
  },
  customAct: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  customActView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  customActTitleText: {
    fontSize: 18,
    maxWidth: '85%',
    color: '#0155A4',
  },
  customActText: {
    fontSize: 12,
    maxWidth: '15%',
    color: '#0155A4',
  },
  customModalBackground: {
    paddingHorizontal: 15,
    flex: 0,
    backgroundColor: 'white',
    borderRadius: 10,
    maxHeight: '100%',
    height: 'auto',
    alignItems: 'center',
  },
  customModalTitleText: {
    width: '100%',
    fontSize: 32,
    color: '#0155A4',
    fontWeight: '600',
    textAlign: 'center',
  },
  customModalText: {
    padding: 5,
    fontWeight: '600',
    color: 'dimgrey',
    textAlign: 'center',
  },
  customModalTextInput: {
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'grey',
    width: '100%',
    height: 'auto',
    maxHeight: 80,
  },
  customModalSubmitButton: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customModalSubmitText: {
    width: '75%',
    fontSize: 15,
    color: '#0155A4',
  },
})

const ListItem = ({activity, openModal}) => {
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => openModal(activity)}
    >
      <View style={styles.listItemView}>
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <Text style={styles.listItemTitleText}>
            {activity.title ?? 'Activity'}
          </Text>
          {/* <Text style={styles.listItemText}>{activity.description}</Text> */}
        </View>

        <View style={styles.iconView}>
          <Text style={{color: '#0155A4'}}>{activity.points} pts</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const CategoryCarousel = ({setItems}) => {
  const items = [
    'Physical',
    'Emotional',
    'Intellectual',
    'Occupational',
    'Spiritual',
    'Social',
  ]

  let carousel

  return (
    <View style={styles.buttons}>
      <View style={{width: '10%', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            carousel.snapToPrev()
          }}
        >
          <Text style={[styles.arrowText, {paddingLeft: 15}]}>{'◁'}</Text>
        </TouchableOpacity>
      </View>
      <Carousel
        ref={c => {
          carousel = c
        }}
        data={items}
        renderItem={({item}) => {
          return (
            <View style={{backgroundColor: 'white', width: '100%'}}>
              <Text style={styles.carouselItemText}>{item}</Text>
            </View>
          )
        }}
        sliderWidth={0.8 * windowWidth}
        itemWidth={0.8 * windowWidth}
        onSnapToItem={slideIndex => {
          setItems(getActivitiesByCategory(items[slideIndex]))
        }}
        initialNumToRender={30}
        scrollEnabled={false}
      />
      <View style={{width: '10%', alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            carousel.snapToNext()
          }}
        >
          <Text style={[styles.arrowText, {paddingRight: 15}]}>{'▷'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const CustomActPrompt = ({toggleView}) => {
  const [description, onChangeDescription] = useState('')

  const submitActivity = () => {
    toggleView(false)
    //TODO: add this activity to the database for admins to review later
    //include the username or something to identify which user it came from, as well as the description text for the activity
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={styles.customModalBackground}
      onPress={() => Keyboard.dismiss()}
    >
      <Text style={styles.customModalTitleText}>Custom Activity</Text>
      <Text style={styles.customModalText}>
        Here is where you can describe a wellness activity that you did. Be as
        descriptive as you wish, and make sure that your activity is not already
        in the available list of activities!
      </Text>
      <Text style={styles.customModalText}>
        After submitting your activity, competition administrators will review
        it and award you with the number of points that they feel it deserves.
      </Text>
      <TextInput
        value={description}
        onChangeText={text => onChangeDescription(text)}
        multiline={true}
        numberOfLines={1}
        style={styles.customModalTextInput}
      />
      <TouchableOpacity
        style={styles.customModalSubmitButton}
        onPress={submitActivity}
      >
        <Text style={styles.customModalSubmitText}>Submit Activity</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

const ActivitiesScreen = () => {
  const [items, setItems] = useState(getActivitiesByCategory('Physical'))

  const {state, completeActivity} = useContext(UserContext)

  const [isModalVisible, setModalVisible] = useState(false)
  const [modalActivity, setModalActivity] = useState(null)

  const openModal = activity => {
    setModalActivity(activity)
    setModalVisible(true)
  }

  const [customModalVisible, setCustomModalVisible] = useState(false)

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{state.points}</Text>
        {/* <Text>Level 26</Text> */}
        <ProgressBar milestone={100} points={50} width={windowWidth * 0.6} />
        {/* <Text>50 points to the next level</Text> */}
        <CategoryCarousel setItems={setItems} />
      </View>

      <View style={{flex: 1}}>
        <FlatList
          contentContainerStyle={{paddingBottom: 20, width: 0.95 * windowWidth, alignSelf: 'center'}}
          data={items}
          renderItem={({item}) => {
            if (item.available) {
              return <ListItem activity={item} openModal={openModal} />
            }
          }}
        />
        <TouchableOpacity
          style={styles.customAct}
          onPress={() => setCustomModalVisible(true)}
        >
          <View style={styles.customActView}>
            <Text style={styles.customActTitleText}>
              Want points for something not listed?
            </Text>
            <Text style={styles.customActText}>Click here!</Text>
          </View>
        </TouchableOpacity>
      </View>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <Activity
          activity={modalActivity}
          action={completeActivity}
          toggleView={setModalVisible}
        />
      </Modal>
      <Modal
        isVisible={customModalVisible}
        onBackdropPress={() => setCustomModalVisible(false)}
      >
        <CustomActPrompt toggleView={setCustomModalVisible} />
      </Modal>
    </SafeAreaView>
  )
}

export default ActivitiesScreen
