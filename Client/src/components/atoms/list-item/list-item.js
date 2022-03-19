import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const ListItem = ({
  item,
  addPoints,
}) => (
    <TouchableOpacity style={styles.listItem} onPress={() => addPoints(item.points)}>
        <View style={styles.listItemView}>
            <Text style={styles.listItemText}>
                {item.text}
            </Text>
            <View style={styles.iconView}>
                <Text>{item.points} pts</Text>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    listItem: {
        padding: 15,
        backgroundColor: '#f8f8f8',
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    listItemView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        alignItems: 'center',
    },
    listItemText: {
        fontSize: 18,
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 70,
    },
});

export default ListItem;