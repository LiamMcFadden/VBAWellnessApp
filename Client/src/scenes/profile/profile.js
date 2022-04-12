import * as React from 'react';
import {
  Button,
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TouchableHighlight,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, TYPESCALE, BUTTONSTYLE} from '../../globals/styles';

import {OutlinedButton, ContainedButton} from '../../globals/styledcomponents';

import AnimatedProgressWheel from 'react-native-progress-wheel';

const {height: windowHeight, width: windowWidth} = Dimensions;
const user = {
  firstname: 'John',
  lastname: 'Smith',
  username: 'johnnysmith123',
  points: 79,
  milestone: 100,
};

const Background = () => (
  <View style={styles.backgroundContainer}>
    <View style={styles.backgroundTop} />
    <View style={styles.backgroundBottom} />
  </View>
);

const ProgressBar = ({points, milestone}) => {
  const {progressContainer, progressBackground} = ProgressStyles(90);
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', margin: 20}}>
      <View>
        <AnimatedProgressWheel
          size={100}
          width={10}
          color={COLORS.secondary}
          progress={(points / milestone) * 100}
          backgroundColor={'#F8F8FF'}
          animateFromValue={0}
          duration={1500}
        />
      </View>
      <Text style={{margin: 10, color: 'white'}}>
        {points}/{milestone} Points Until Next Milestone
      </Text>
    </View>
  );
};

export default function Profile({navigation}) {
  const {height: wheight, width: wwidth} = useWindowDimensions();
  return (
    <>
      <Background />
      <SafeAreaView style={styles.profileContainer}>
        <View style={styles.heading}>
          <Ionicons name="person-circle-outline" size={100} color={'#fff'} />
          <View>
            <Text
              style={{
                ...TYPESCALE.h6,
                color: 'white',
                textAlign: 'center',
              }}
            >{`${user.firstname} ${user.lastname}`}</Text>
            <Text
              style={{
                ...TYPESCALE.subtitle,
                color: 'white',
                margin: 5,
                textAlign: 'center',
              }}
            >{`@${user.username}`}</Text>
          </View>
          <ProgressBar points={user.points} milestone={user.milestone} />
        </View>
        <ContainedButton
          width={wwidth / 3}
          height={50}
          onPress={() => navigation.navigate('HomeScreen')}
        >
          BACKFIRE
        </ContainedButton>
      </SafeAreaView>
    </>
  );
}

const ProgressStyles = size => {
  var circum = (size / 2 - 5) * 2 * Math.PI;

  return StyleSheet.create({
    progressContainer: {
      width: size,
      height: size,
      borderRadius: size / 2, //Circle
      backgroundColor: 'white',
    },
    progressBackground: {
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 5,
      borderColor: 'green',
    },
    progressBackgroundBar: {},
    progressForegroundBar: {},
  });
};

const styles = StyleSheet.create({
  backgroundContainer: {
    position: 'absolute',
    overflow: 'hidden',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  backgroundTop: {
    height: '50%',
    backgroundColor: COLORS.primary,
  },
  backgroundBottom: {
    backgroundColor: '#fefefe',
    height: '100%',
    overflow: 'hidden',
  },
  progressBarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
  },
  innerCircle: {
    width: 90,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 90 / 2,
  },
  profileContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 25,
  },
  heading: {
    height: 200,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
