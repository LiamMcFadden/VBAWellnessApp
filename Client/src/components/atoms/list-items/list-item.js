import React from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const windowWidth = Dimensions.get('window').width;

const ListItem = ({
    item,
    addPoints,
}) => (
    <TouchableOpacity style={styles.listItem} onPress={() => addPoints(item.points)}>
        <View style={styles.listItemView}>

            <View style={{
                flexDirection: 'column',
                justifyContent: 'space-between'
            }}>
                <Text style={styles.listItemTitleText}>
                    {item.title ?? "Activity"}
                </Text>
                <Text style={styles.listItemText}>
                    {item.text}
                </Text>
            </View>

            <View style={styles.iconView}>
                <Text style={{ color: '#0155A4' }}>{item.points} pts</Text>
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

    listItemTextContainer: {
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    listItemTitleText: {
        fontSize: 18,
        maxWidth: (windowWidth / 1.5),
        color: '#0155A4'
    },
    listItemText: {
        fontSize: 12,
        maxWidth: (windowWidth / 1.5),
        color: '#0155A4'
    },
    iconView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        width: 70,
    },
});

export default ListItem;