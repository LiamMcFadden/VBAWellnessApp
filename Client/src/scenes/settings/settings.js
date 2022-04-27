import React, { useState } from 'react';
import {Button, Text, View} from 'react-native';
//import { AuthContext } from "_components/Authentication/auth";
import {signOut} from '_api/firebase-auth';
import {getCurrentUser} from '_api/firebase-db';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Admin from '_scenes/admin/admin';
import storage from '@react-native-firebase/storage';
import { currentUser } from '_api/firebase-auth';
import { _taskHandle } from 'react-native/Libraries/Interaction/Batchinator';
import { launchImageLibrary } from 'react-native-image-picker';
import * as ImagePicker from 'react-native-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const SettingsScreen = ({navigation}) => {
  //const { signOut } = useContext(AuthContext)?.functions

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
    };

    return (
      <SafeAreaView>
        <Button onPress={selectImage} title="Select Profile Picture"/>
        <Button onPress={uploadImage} disabled={image == null} title="Save Changes"/>
        {uploading && ( <Text>Uploading... {transfered}%</Text>)}
      </SafeAreaView>
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
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Settings</Text>
      <Button title="Sign out" onPress={signOutValidation} />
      <UploadScreen/>
      {getCurrentUser().admin === true && (
        <View>
          <Text>Admin Settings</Text>
          <Button title="Admin" onPress={() => navigation.navigate('Admin')} />
        </View>
      )}
    </View>
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

export default Settings;
