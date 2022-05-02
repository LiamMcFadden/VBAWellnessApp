//ofile Screen
import React, { useContext, useEffect, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet, Text, useWindowDimensions,
  ActivityIndicator, View
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  VictoryLabel, VictoryPie
} from 'victory-native';
import { getCurrentUser, getUserById, getUserPointsByCategory } from '_api/firebase-db';
import ProfilePicture from 'react-native-profile-picture';
import { UserContext } from '_components/Authentication/user';
import { COLORS, TYPESCALE } from '../../globals/styles';
import { ProgressBar } from '../../globals/styledcomponents'

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
  
  const [loading, setLoading] = useState(true);
  //const { state } = useContext(UserContext);

  let pfp = user.profileImage;
  // use default icon if no pfp is found
  if (pfp === undefined) {
    pfp = (
      <Ionicons
        name="person-circle-outline"
        size={100}
        color={COLORS.tintPrimary(0.1)}
      />
    );
  } else {
    pfp = (
      <ProfilePicture width={100} height={100} isPicture={true} URLPicture={pfp} shape="circle" />
    );
  }

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
      if(id == getCurrentUser().uid) {
        setUser(getCurrentUser());
        setLoading(false);
      } else {
        getUserById(id).then(otherUser => {
          setUser(otherUser.data());
          setLoading(false);
        });
      }
    });
  }, []);
  if (loading) {
    return (
      <View style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  } else {
  return (
    <>
      <Background />
      <SafeAreaView style={styles.profileContainer}>
        <View style={styles.heading}>
          <View style={{ alignItems: 'center' }}>
            {/*<Ionicons
              name="person-circle-outline"
              size={100}
              color={COLORS.tintPrimary(0.1)}
            />*/}
            {pfp}
            <Text
              style={{
                ...TYPESCALE.h6,
                textAlign: 'center',
                color: COLORS.primary
              }}>{`${user.firstName} ${user.lastName}`}</Text>
            <Text
              style={{
                ...TYPESCALE.subtitle,
                margin: 5,
                textAlign: 'center',
              }}>{`${user.email}`}</Text>
          </View>

          <View style={{ alignItems: 'center', marginTop: 15 }}>
            <Text style={[TYPESCALE.h6, {color: COLORS.primary}]}>{user.points} pts</Text>
            <ProgressBar
              points={user.points}
              width={wwidth / 1.5}
              textOrientation={'center'}
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
  },
  heading: {
    height: 'auto',
    width: '100%',
    paddingBottom: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',

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
  },
});
