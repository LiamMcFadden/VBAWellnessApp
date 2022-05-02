//ofile Screen
import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet, Text, useWindowDimensions, View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  VictoryLabel, VictoryPie
} from 'victory-native';
import { getCurrentUser, getUserById, getUserPointsByCategory } from '_api/firebase-db';
import { UserContext } from '_components/Authentication/user';
import { COLORS, TYPESCALE } from '../../globals/styles';
import ProgressBar from './progressbar';

const user = {
  firstname: 'John',
  lastname: 'Smith',
  username: 'johnnysmith123',
  points: 79,
  milestone: 100,
  categoryOverview: [
    { x: 'Occupational', y: 25 },
    { x: 'Intellectual', y: 12 },
    { x: 'Spritual', y: 19 },
    { x: 'Physical', y: 9 },
    { x: 'Emotional', y: 5 },
    { x: 'Social', y: 8 },
  ],
};

const BarChart = ({ data, width }) => (
  <VictoryPie
    // animate={{easing: 'exp', duration: 5000}}
    colorScale={[
      '#003f5c',
      '#444e86',
      '#955196',
      '#dd5182',
      '#ff6e54',
      '#ffa600',
    ]}
    responsive={true}
    data={data}
    width={width * 0.7}
    margin={0}
    labelComponent={
      <VictoryLabel
        size={6}
        verticalAnchor={({ text }) => (text.length > 1 ? 'start' : 'middle')}
        textAnchor={({ text }) => (text.length > 1 ? 'start' : 'middle')}
      />
    }
  />
);

const Background = () => (
  <View style={styles.backgroundContainer}>
    <View style={styles.backgroundTop} />
    <View style={styles.backgroundBottom} />
  </View>
);

export default function Profile(props) {
  const { height: wheight, width: wwidth } = useWindowDimensions();

  const [chartData, setChartData] = useState([]);
  const [user, setUser] = useState({});
  const { state } = useContext(UserContext);

  const fetchChartData = (userId) => {
    return getUserPointsByCategory(userId).then((data) => {
      let chartData = [];

      data.forEach(obj => {
        chartData.push({ x: obj.category, y: obj.total });
      });
      chartData = chartData.filter(obj => obj.y > 0);

      return chartData;
    }).catch(console.error);
  }

  useEffect(() => {
    let id = props.route.params.userId;
    fetchChartData(id).then((data) => {
      setChartData(data);
      setUser(id == getCurrentUser().uid ? getCurrentUser() : getUserById(id));
    });
  }, []);

  return (
    <>
      <Background />
      <SafeAreaView style={styles.profileContainer}>
        <View style={styles.heading}>
          <View style={{ alignItems: 'center' }}>
            <Ionicons
              name="person-circle-outline"
              size={100}
              color={COLORS.tintPrimary(0.1)}
            />
            <Text
              style={{
                ...TYPESCALE.h6,
                textAlign: 'center',
              }}>{`${user.firstName} ${user.lastName}`}</Text>
            <Text
              style={{
                ...TYPESCALE.subtitle,
                margin: 5,
                textAlign: 'center',
              }}>{`${user.email}`}</Text>
          </View>

          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <Text style={[TYPESCALE.subtitle]}>{user.points} pts{/*Level. 7*/}</Text>
            <ProgressBar
              points={user.points}
              milestone={user.points * 1.5}
              width={wwidth / 1.5}
            />
          </View>
        </View>

        <View
          style={{
            justifyContent: 'flex-start',
            alignItems: 'center',
            height: 0.5 * wheight,
            width: wwidth,
          }}>
          <Text
            style={[
              TYPESCALE.h6,
              {
                alignSelf: 'center',
                marginBottom: 10,
              },
            ]}>
            Your Top Categories
          </Text>
          <View
            style={{
              backgroundColor: 'white',
              width: wwidth * 0.95,
              height: 0.4 * wheight,
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
            <BarChart data={chartData} width={wwidth} />
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
    height: 'auto',
    width: '100%',
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
});
