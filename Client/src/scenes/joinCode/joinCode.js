import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {currentUser} from '_api/firebase-auth';
import {
  getCompetitionById,
  getCurrentCompetition,
  updateCurrentUserFields,
} from '_api/firebase-db';
import Compete from '_scenes/compete/compete';

export {CompetitionCodeScreen};
const CompetitionCodeScreen = ({navigation, authCallback, valid }) => {
  switch (valid) {
    case -1:
      return <MissingCodeScreen authCallback={authCallback} valid={valid}/>;
    case 0:
      return <StartingSoonScreen />;
    case 2:
      return <EndedScreen />;
  }
};

const alert = (title, msg) => {
  return Alert.alert(title, msg);
};

const MissingCodeScreen = ({authCallback, valid}) => {
  const [competitionCode, setCompetitionCode] = useState('');
  const [loading, setLoading] = useState(false);
  const validate = () => {
    if (loading) return;
    if (!competitionCode.trim()) {
      alert(
        'Competition Code required',
        'Please enter a competition join code to continue',
      );
      return;
    }

    setLoading(true);
    getCompetitionById(competitionCode).then(competition => {
      competition = competition.data();
      if (!competition || competition.endTime.toDate() < Date.now()) {
        alert(
          'Invalid Competition Code',
          'The code you entered does not match any competition.',
        );
        setLoading(false);
        return;
      } else {
        let updateObject = {competition: competitionCode};
        updateCurrentUserFields(updateObject).then(() => {
          setLoading(false);
          authCallback(currentUser());
          return;
        });
      }
    });
  };

  return (
    <>
      <Background />
      <View style={styles.abs}>
        <Text style={styles.heading}>Enter Competition Code</Text>
        <View style={styles.form}>
          <View style={{width: '100%', alignItems: 'center'}}>
            <TextInput
              placeholder="Competition Code"
              textContentType="none"
              style={styles.textInput}
              maxLength={100}
              onChangeText={e => setCompetitionCode(e.toUpperCase())}
              blurOnSubmit={true}
            />
          </View>

          <TouchableOpacity style={styles.signInBtn} onPress={validate}>
            {loading ? <ActivityIndicator /> : <Text style={styles.signInBtnText}>Join Competition</Text>}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};
const StartingSoonScreen = () => { //FIXME: Needs styling
  return (
    <View>
      <Text>{getCurrentCompetition().name} Starting Soon!</Text>
      <Text>{getCurrentCompetition().startTime.toDate().toLocaleString()}</Text>
    </View>
  );
};
const EndedScreen = ({navigation}) => {
  const viewResults = () => {
    //navigation.navigate(<Compete/>); //FIXME: I don't think this works
  };
  return (
    <View>
      <Text>{getCurrentCompetition().name} ended</Text>
      <TouchableOpacity style={styles.signInBtn} onPress={viewResults}>
        <Text style={styles.signInBtnText}>View Results</Text>
      </TouchableOpacity>
    </View>
  );
};
const Background = () => (
  <View style={styles.topColor}>
    <View style={styles.bottomColor}></View>
  </View>
);
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
