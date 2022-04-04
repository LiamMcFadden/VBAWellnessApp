import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

const LoginScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.view}>
      <Text style={styles.text}>Screen: Login</Text>

      <View style={styles.btnView}>
        <TouchableHighlight
          style={styles.btn}
          underlayColor="skyblue"
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.text}>Go to activities</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
  btnView: {
    flex: 2,
    justifyContent: 'center',
  },
  btn: {
    backgroundColor: 'powderblue',
    padding: 10,
    borderRadius: 10,
  },
});

export default LoginScreen;
