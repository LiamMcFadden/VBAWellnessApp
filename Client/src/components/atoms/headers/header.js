import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Header = ({ title, width }) => {
  return (
    <View style={width ? { ...styles.header, width: width } : styles.header}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 60,
    padding: 15,
    alignSelf: 'center',
    backgroundColor: '#0155A4',
  },
  text: {
    color: 'white',
    fontSize: 23,
    textAlign: 'center',
  },
});

export default Header;