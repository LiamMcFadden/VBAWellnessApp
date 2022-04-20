/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  useWindowDimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, TYPESCALE} from '../../globals/styles';
import {
  VictoryPolarAxis,
  VictoryChart,
  VictoryPie,
  VictoryTheme,
  VictoryBar,
  VictoryArea,
  VictoryLabel,
} from 'victory-native';
import {OutlinedButton, ContainedButton} from '../../globals/styledcomponents';
import SwitchSelector from 'react-native-switch-selector';

import {ProgressBar} from '../../globals/styledcomponents';

const user = {
  firstname: 'John',
  lastname: 'Smith',
  username: 'johnnysmith123',
  points: 79,
  milestone: 100,
  categoryOverview: [
    {x: 'Occupational', y: 25},
    {x: 'Intellectual', y: 12},
    {x: 'Spritual', y: 19},
    {x: 'Physical', y: 9},
    {x: 'Emotional', y: 5},
    {x: 'Social', y: 8},
  ],
};

const BarChart = ({width}) => (
  <VictoryPie
    animate={{duration: 2000}}
    colorScale={['tomato', 'orange', 'gold', 'cyan', 'navy']}
    responsive={true}
    data={user.categoryOverview}
    width={width * 0.7}
    margin={0}
    labelComponent={
      <VictoryLabel
        size={6}
        verticalAnchor={({text}) => (text.length > 1 ? 'start' : 'middle')}
        textAnchor={({text}) => (text.length > 1 ? 'start' : 'middle')}
      />
    }
  />
);

const PolarChart = ({width}) => (
  <VictoryChart polar domain={{x: [0, 360]}} theme={VictoryTheme.material}>
    <VictoryArea
      data={user.categoryOverview}
      style={{data: {fill: '#c43a31', stroke: 'black', strokeWidth: 2}}}
    />
    <VictoryPolarAxis />
  </VictoryChart>
);
const Background = () => (
  <View style={styles.backgroundContainer}>
    <View style={styles.backgroundTop} />
    <View style={styles.backgroundBottom} />
  </View>
);

export default function Profile({navigation}) {
  const {height: wheight, width: wwidth} = useWindowDimensions();
  const [showBar, setShowBar] = useState(true);
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
            <ProgressBar
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
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 0.5 * wheight,
            width: wwidth,
          }}>
          <Text
            style={[
              TYPESCALE.h6,
              {
                alignSelf: 'flex-start',
                marginBottom: 20,
                marginLeft: Math.abs(wwidth * 1.1 - wwidth),
              },
            ]}>
            Your Top Categories
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              width: wwidth * 0.95,
              height: 0.35 * wheight,
              borderRadius: 6,
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowOpacity: 0.1,
              shadowRadius: 1,
              elevation: 8,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 0,
              marginBottom: 20,
            }}>
            {showBar ? (
              <BarChart width={wwidth} />
            ) : (
              <PolarChart width={wwidth} />
            )}
          </View>
          <View style={{width: '80%'}}>
            <SwitchSelector
              options={[
                {label: 'Pie Chart', value: true},
                {label: 'Radar', value: false},
              ]}
              onPress={e => setShowBar(e)}
              initial={0}
              textColor={COLORS.primary}
              selectedColor={'#fff'}
              buttonColor={COLORS.primary}
              borderColor={COLORS.primary}
              height={30}
              hasPadding
            />
          </View>
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
