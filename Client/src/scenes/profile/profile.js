import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, TYPESCALE} from '../../globals/styles';

import {OutlinedButton, ContainedButton} from '../../globals/styledcomponents';

import ProgressBar from './progressbar';

const user = {
  firstname: 'John',
  lastname: 'Smith',
  username: 'johnnysmith123',
  points: 79,
  milestone: 100,
};

//const Graph = ({totalPoints, categories}) => {};

const ProgressB = ({milestone, points, width}) => {
  const percentComplete = points / milestone;
  return (
    <View
      style={{
        backgroundColor: COLORS.secondary,
        width: width,
        borderRadius: 24,
        height: 10,
      }}>
      <View
        style={{
          backgroundColor: COLORS.primary,
          width: percentComplete * width,
          height: 10,
          borderRadius: 24,
        }}
      />
    </View>
  );
};

const Background = () => (
  <View style={styles.backgroundContainer}>
    <View style={styles.backgroundTop} />
    <View style={styles.backgroundBottom} />
  </View>
);

export default function Profile({navigation}) {
  const {height: wheight, width: wwidth} = useWindowDimensions();
  return (
    <>
      <Background />
      <SafeAreaView style={styles.profileContainer}>
        <View style={styles.heading}>
          <View style={{alignItems: 'center'}}>
            <Ionicons
              name="person-circle-outline"
              size={100}
              color={COLORS.tintPrimary(0.1)}
            />
            <Text
              style={{
                ...TYPESCALE.h6,
                textAlign: 'center',
              }}>{`${user.firstname} ${user.lastname}`}</Text>
            <Text
              style={{
                ...TYPESCALE.subtitle,
                margin: 5,
                textAlign: 'center',
              }}>{`@${user.username}`}</Text>
          </View>

          <View style={{alignItems: 'center', marginTop: 15}}>
            <Text style={[TYPESCALE.subtitle]}>Level. 7</Text>
            <ProgressB
              points={user.points}
              milestone={user.milestone}
              width={wwidth / 1.5}
            />
          </View>
        </View>

        <View
          style={{
            position: 'absolute',
            top: 0.3 * wheight,
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 0.5 * wheight,
            width: wwidth,
          }}>
          {/*
            *<ProgressBar
            *  points={user.points}
            *  milestone={user.milestone}
            *  size={100}
            >
            */}
          <Text
            style={[
              TYPESCALE.h6,
              {
                alignSelf: 'flex-start',
                marginLeft: Math.abs(wwidth * 1.1 - wwidth),
              },
            ]}>
            Your Top Categories
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              width: wwidth * 0.9,
              height: 0.35 * wheight,
              borderRadius: 6,
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowOpacity: 0.1,
              shadowRadius: 1,
              elevation: 8,
            }}></View>
        </View>
      </SafeAreaView>
    </>
  );
}

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
    height: '35%',
    backgroundColor: '#f8f8f8',
  },
  backgroundBottom: {
    backgroundColor: '#ebeef1',
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
    height: 100,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
