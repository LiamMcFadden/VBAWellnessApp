import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import * as auth from '_api/firebase-auth';
import {generateUserDoc, getCompetitionById} from '_api/firebase-db';

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
    //height: '45%',
    height: 'auto',
    paddingVertical: 10,
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
    //height: 35,
    backgroundColor: 'rgba(1, 85, 164, 0.1)',
    borderRadius: 3,
    textAlign: 'center',
    fontSize: 18,
    height: 'auto',
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
const errorMessages = {
  //Login:
  'auth/invalid-email': 'Invalid email address provided', // Thrown if the email address is not valid.
  'auth/user-disabled': 'This user is disabled', // Thrown if the user corresponding to the given email has been disabled.
  'auth/user-not-found': 'Incorrect Email or Password', // Thrown if there is no user corresponding to the given email.
  'auth/wrong-password': 'Incorrect Email or Password', // Thrown if the password is invalid for the given email, or the account corresponding to the email does not have a password set.
  //Register:
  'auth/email-already-in-use': 'An account already exists for this email', // Thrown if there already exists an account with the given email address.
  'auth/invalid-email': 'Invalid email address provided', // Thrown if the email address is not valid.
  'auth/operation-not-allowed': 'Accounts CurrentlyDisabled', // Thrown if email/password accounts are not enabled. Enable email/password accounts in the Firebase Console, under the Auth tab.
  'auth/weak-password': 'Password not strong enough', // Thrown if the password is not strong enough.
};
const alertError = err => {
  return Alert.alert('Error', errorMessages[err.code]);
};
const Stack = createNativeStackNavigator();

const LoginScreen = ({navigation}) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');

  const validate = () => {
    if (!emailAddress.trim() || !password.trim()) {
      alert(
        'Email and Password Required',
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
        <View style={{backgroundColor: 'white', borderRadius: 100, paddingLeft: 30, paddingRight: 30, height: 100, justifyContent: 'center', alignItems: 'center'}}>
          <Image source={require('./VBA-Logo.png')} style={{width: 150, resizeMode: 'contain'}}/>
          <Text style={{fontSize: 15, color: 'dimgray', fontWeight: '600', fontStyle: 'italic', bottom: 40}}>Wellness Challenge</Text>
        </View>
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
          <TouchableOpacity
            style={styles.createAccBtn}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.createAccBtnText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};


const RegisterScreen = ({navigation}) => {
  const [emailAddress, setEmailAddress] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [competitionCode, setCompetitionCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validate = () => {
    if (
      !emailAddress.trim() ||
      !firstName.trim() ||
      !lastName.trim() ||
      !competitionCode.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      alert(
        'All Fields Required',
        'Please fill out all fields to create your account',
      );
      return;
    }
    if (password != confirmPassword) {
      alert(
        'Passwords must match',
        'Please review your passwords so they match',
      );
      return;
    }
    getCompetitionById(competitionCode)
      .then(competition => {
        if (competition != null) {
          auth
            .register(emailAddress, password)
            .then(res => {
              generateUserDoc(
                res.user.uid,
                emailAddress,
                firstName,
                lastName,
                competitionCode,
              );
              console.log('new account with email address: ' + emailAddress);
            })
            .catch(alertError);
        } else {
          alert(
            'Competition not found',
            'Please review your competition code and ensure it is correct',
          );
        }
      })
      .catch(() => {
        alert(
          'Competition not found',
          'Please review your competition code and ensure it is correct',
        );
      });
  };
  return (
    <>
      <Background />
      <View style={styles.abs}>
        <Text style={styles.heading}>Sign Up</Text>
        <View style={styles.form}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <TextInput
              placeholder="Email"
              textContentType="emailAddress"
              style={styles.textInput}
              maxLength={100}
              onChangeText={e => setEmailAddress(e)}
              blurOnSubmit={true}
            />
            <TextInput
              placeholder="First Name"
              textContentType="givenName"
              style={styles.textInput}
              maxLength={100}
              onChangeText={e => setFirstName(e)}
              blurOnSubmit={true}
            />
            <TextInput
              placeholder="Last Name"
              textContentType="familyName"
              style={styles.textInput}
              maxLength={100}
              onChangeText={e => setLastName(e)}
              blurOnSubmit={true}
            />
            <TextInput
              placeholder="Competition Code"
              textContentType="none"
              style={styles.textInput}
              maxLength={5}
              onChangeText={e => setCompetitionCode(e)}
              blurOnSubmit={true}
            />
            <TextInput
              placeholder="Password"
              textContentType="newPassword"
              style={styles.textInput}
              maxLength={100}
              secureTextEntry={true}
              onChangeText={e => setPassword(e)}
              blurOnSubmit={true}
            />
            <TextInput
              placeholder="Confirm Password"
              textContentType="password"
              style={styles.textInput}
              maxLength={100}
              secureTextEntry={true}
              onChangeText={e => setConfirmPassword(e)}
              blurOnSubmit={true}
            />
          </View>

          <TouchableOpacity style={styles.signInBtn} onPress={validate}>
            <Text style={styles.signInBtnText}>Create Account</Text>
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{textAlign: 'center', fontWeight: 'bold', marginBottom: 10}}>
            OR...
          </Text>
          <TouchableOpacity
            style={styles.createAccBtn}
            onPress={() => navigation.navigate('Login')}>
            <Text style={styles.createAccBtnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const Login = () => {
  return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
  );
};
export default Login;
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
