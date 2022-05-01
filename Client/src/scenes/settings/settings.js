import React, { useState } from 'react';
import {Button, Text, View, TouchableOpacity, StyleSheet} from 'react-native';
//import { AuthContext } from "_components/Authentication/auth";
import {signOut} from '_api/firebase-auth';
import {getCurrentUser} from '_api/firebase-db';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Admin from '_scenes/admin/admin';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { currentUser } from '_api/firebase-auth';
import { _taskHandle } from 'react-native/Libraries/Interaction/Batchinator';
import * as ImagePicker from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const SettingsScreen = ({navigation}) => {
  //const { signOut } = useContext(AuthContext)?.functions

  // screen for uploading an image
  const UploadScreen = () => {
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [transfered, setTransfered] = useState(0);

    const selectImage = () => {
      const options = {
        maxWidth: 2000,
        maxHeight: 2000,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };

      ImagePicker.launchImageLibrary(options, response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          setImage({uri: response.assets[0].uri});
        }
      });
    };

    const uploadImage = async () => {
      const {uri} = image;
      const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;

      setUploading(true);
      setTransfered(0);

      const upload = storage()
        .ref('users/' + currentUser().uid + '/profile.jpg')
        .putFile(uploadUri);

      upload.on('state_changed', (snapshot) => {
        setTransfered(
          Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100)
        );
        console.log(snapshot.bytesTransferred / snapshot.totalBytes * 100);
      });

      try {
        await upload;
      } catch (error) {
        console.log(error);
      }

      setUploading(false);
      setImage(null);

      // store url to image in user doc
      let url = storage()
        .ref('users/' + currentUser().uid + '/profile.jpg')
        .getDownloadURL()
        .then(url => {
          firestore()
            .collection('Users')
            .doc(currentUser().uid)
            .update({
              profileImage: url
            });
        });

    };

    return (
      <View style={{width: '100%', justifyContent: 'space-around', alignItems: 'center'}}>
        <TouchableOpacity onPress={selectImage} style={styles.button}>
          <Text style={styles.buttonText}>Select Profile Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={uploadImage} disabled={image == null} style={image == null ? styles.disabledButton : styles.button}>
          <Text style={styles.buttonText}>Save Changes</Text>
        </TouchableOpacity>
        {uploading && ( <Text style={styles.buttonText}>Uploading... {transfered}%</Text>)}
      </View>
    )
  };

  function signOutValidation() {
    signOut()
      .then(() => {
        //navigation.navigate('Login')
        console.log('signed out');
      })
      .catch(err => {
        console.error(err);
      });
  }
  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
      <View style={{width: '100%', height: '15%', justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title}>Settings</Text>
      </View>
      <View style={{width: '100%', height: '85%', justifyContent: 'space-around', alignItems: 'center'}}>
        <UploadScreen/>
        <TouchableOpacity onPress={signOutValidation} style={styles.button}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
      
      {/* {getCurrentUser().admin === true && (
        <View>
          <Text>Admin Settings</Text>
          <Button title="Admin" onPress={() => navigation.navigate('Admin')} />
        </View>
      )} */}
    </SafeAreaView>
  );
}

const Settings = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen
            name='SettingsScreen'
            component={SettingsScreen}
        />
        <Stack.Screen
            name='Admin'
            component={Admin}
        />
    </Stack.Navigator>
    
);
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0155A4',
    marginBottom: 10,
  },
  button: {
    padding: 15,
    width: '75%',
    backgroundColor: 'white',
    marginTop: 5,
    borderColor: '#eee',
    borderRadius: 50,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5,
  },
  disabledButton: {
    padding: 15,
    width: '75%',
    backgroundColor: 'lightgray',
    marginTop: 5,
    borderColor: '#eee',
    borderRadius: 50,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,  
    elevation: 5
  },
  buttonText: {
    fontSize: 18,
    color: '#0155A4',
  },
});

export default Settings;
