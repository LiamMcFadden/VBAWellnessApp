import React, {useContext, useEffect, useState} from 'react'
import Modal from 'react-native-modal'
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Dimensions,
  View,
  Text,
} from 'react-native'
import Activity from '../../components/atoms/activity/activity'
import {UserContext} from '_components/Authentication/user'

const windowWidth = Dimensions.get('window').width

/**
  * Activities list component for obtaining 
  * the flatlast of activities with modal
  * overlays
  *
  * @params
  *    activities
  *       List of Activities
  *    activityCompleted
  *       Function to complete when an activity is completed 
  *       This can be used for rerenders
  * */
const Activities = ({activities, activityCompleted}) => {
  const [isModalVisible, setModalVisible] = useState(false)
  const [modalActivity, setModalActivity] = useState(null)

  const {completeActivity} = useContext(UserContext)

  const handleActivitiyCompletion = (activity) => {
    completeActivity(activity)
    activityCompleted() // Tells main state to update
  }

  const openModal = activity => {
    setModalActivity(activity)
    setModalVisible(true)
  }

  return (
    <View style={{ width: 0.95 * windowWidth, alignSelf: 'center'}}>
      <FlatList
        contentContainerStyle={{paddingBottom: 20}}
        data={activities}
        renderItem={({item}) => { if (item.available) {
            return <ListItem activity={item} openModal={openModal} />
          }
        }}
      />
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <Activity
          activity={modalActivity /* Activity Item? */}
          action={
            handleActivitiyCompletion /* Function to complete activity? */
          }
          toggleView={setModalVisible /* modal flag */}
        />
      </Modal>
    </View>
  )
}

const ActivityList = ({data, openModal}) => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        contentContainerStyle={{paddingBottom: 20}}
        data={data}
        renderItem={({item}) => {
          return <ListItem activity={item} openModal={openModal} />
        }}
      />
    </View>
  )
}

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

export default Activities
