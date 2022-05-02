import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ListItem = ({activity, openModal}) => {

  return (
      <TouchableOpacity
      style={styles.listItem}
      onPress={() => openModal(activity)}>
      <View style={styles.listItemView}>
          <View
          style={{
              flexDirection: 'column',
              justifyContent: 'space-between',
          }}>
              <Text style={styles.listItemTitleText}>{activity.title ?? 'Activity'}</Text>
              {/* <Text style={styles.listItemText}>{activity.description}</Text> */}
          </View>
  
          <View style={styles.iconView}>
              <Text style={{color: '#0155A4'}}>{activity.points} pts</Text>
          </View>
      </View>
      </TouchableOpacity>
)};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    //backgroundColor: '#f8f8f8',
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#eee',
    borderRadius: 50,

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
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
});

export default ListItem;
