import React, {useState} from 'react';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import * as auth from '_api/firebase-auth';

//import { AuthContext } from "../components/Authentication/auth";
// https://reactnavigation.org/docs/auth-flow
const window = Dimensions.get('window');

const styles = StyleSheet.create({
  topColor: {
    height: '70%',
    width: '100%',
    transform: [{scaleX: 2}],
    borderBottomStartRadius: 200,
    borderBottomEndRadius: 200,
    overflow: 'hidden',
  },
  bottomColor: {
    flex: 1,
    transform: [{scaleX: 0.5}],
    backgroundColor: '#0155A4',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  heading: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  abs: {
    position: 'absolute',
    overflow: 'hidden',
    left: 0,
    top: 0,
    width: window.width,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },

  form: {
    height: '45%',
    width: '90%',
    backgroundColor: '#fcfcfc',
    borderRadius: 10,
    shadowColor: 'rgba(0,0,0,0.05)',
    shadowOpacity: 10,
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  textInput: {
    margin: 3,
    width: '80%',
    height: 35,
    backgroundColor: 'rgba(1, 85, 164, 0.1)',
    borderRadius: 3,
    textAlign: 'center',
    fontSize: 18,
  },

  signInBtn: {
    backgroundColor: '#0155A4',
    width: '80%',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  signInBtnText: {
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: '600', // i.e semi-bold
    fontSize: 18,
  },

  createAccBtn: {
    width: 0.8 * 0.9 * window.width, // same size as login button
    backgroundColor: '#4CA1FE',
    height: 45,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  createAccBtnText: {
    color: '#fff',
    textAlign: 'center',
    alignItems: 'center',
    fontWeight: '600', // i.e semi-bold
    fontSize: 18,
  },
});

const Background = () => (
  <View style={styles.topColor}>
    <View style={styles.bottomColor}></View>
  </View>
);

const alert = (title, msg) => {
  return Alert.alert(title, msg);
};
const alertError = err => {
  return Alert.alert('Error', err.message);
};

const Login = () => {
  const {height, width} = useWindowDimensions();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const validate = () => {
    if (!emailAddress.trim() || !password.trim()) {
      alert(
        'Email and Pasword Requird',
        'Please fill out both your email and password to continue',
      );
    } else {
      auth
        .signIn(emailAddress, password)
        .then(() => {
          console.log('signed in with email address: ' + emailAddress);
        })
        .catch(alertError);
    }
  };

  return (
    <>
      <Background />
      <View style={styles.abs}>
        <Text style={styles.heading}>Sign In</Text>
        <View style={styles.form}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <TextInput
              placeholder="Email"
              textContentType="emailAddress"
              style={styles.textInput}
              maxLength={100}
              onChangeText={e => setEmailAddress(e)}
              blurOnSubmit={true}
              onSubmitEditing={e => submitEditing(e)}
            />
            <TextInput
              placeholder="Password"
              textContentType="password"
              style={styles.textInput}
              maxLength={100}
              secureTextEntry={true}
              onChangeText={e => setPassword(e)}
              blurOnSubmit={true}
            />
          </View>

          <TouchableOpacity style={styles.signInBtn} onPress={validate}>
            <Text style={styles.signInBtnText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{textAlign: 'center', fontWeight: 'bold', marginBottom: 10}}>
            OR...
          </Text>
          <TouchableOpacity style={styles.createAccBtn} onPress={validate}>
            <Text style={styles.createAccBtnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
    // <View style={styles.parent}>
    //     <View style={styles.child}>
    //         <Text style={styles.heading}>Sign In</Text>

    //         <View style={styles.form}>
    //             <View style={{ width: '100%', alignItems: 'center' }}>
    //                 <TextInput
    //                     placeholder="Username"
    //                     textContentType="username"
    //                     style={styles.textInput}
    //                 />
    //                 <TextInput
    //                     placeholder="Password"
    //                     textContentType="password"
    //                     style={styles.textInput} />
    //             </View>

    //             <TouchableOpacity
    //                 style={styles.signInButton}
    //                 onPress={() => signIn(username, password)}
    //             >
    //                 <Text style={{ color: '#fff' }}>Login</Text>
    //             </TouchableOpacity>
    //         </View>
    //     </View>
    // </View>
  );
};

export default Login;
