import firebaseapp from '@react-native-firebase/app';
import '@react-native-firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyD8wx4ICMd-_apZIdt0ZZZWGdCVjma-KhM',
  authDomain: 'vbawellness-a43e9.firebaseapp.com',
  databaseURL: 'https://vbawellness-a43e9-default-rtdb.firebaseio.com',
  projectId: 'vbawellness-a43e9',
  storageBucket: 'vbawellness-a43e9.appspot.com',
  messagingSenderId: '536783938998',
  appId: '1:536783938998:android:9869ffc90fd7c8ea6d4d17',
};
firebaseapp.initializeApp(firebaseConfig, {
  name: 'PRIMARY_APP',
});
export {default as firebase} from '@react-native-firebase/app';
