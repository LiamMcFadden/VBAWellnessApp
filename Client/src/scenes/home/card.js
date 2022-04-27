import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import AntDesign from 'react-native-vector-icons/AntDesign';

const styles = StyleSheet.create({
  box: {
    margin: 5,
    flexDirection: 'row',
    width: '95%',
    borderRadius: 6,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    shadowOpacity: 0.1,
  },
  body: {
    position: 'absolute',
    top: 80,
    height: 250 - 70,
    backgroundColor: 'green',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

function Card({onClick, index}) {
  const [pressed, setPressed] = useState(false);
  const offset = useSharedValue(75);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: withSpring(offset.value, {
        damping: 65,
        stiffness: 400,
        restDisplacementThreshold: 0,
      }),
    };
  });
  const handlePress = () => {
    if (offset.value == 75) {
      offset.value = 300;
    } else {
      offset.value = 75;
    }
    setTimeout(() => onClick(index), 300);
  };
  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <Animated.View
          style={[styles.box, {overflow: 'hidden'}, animatedStyles]}
        >
          <View style={{justifyContent: 'space-around', paddingTop: 0}}>
            <View style={{position: 'absolute', top: 1}}>
              <Text style={{fontSize: 14, fontWeight: 'bold'}}>
                Stairmaster
              </Text>
              <Text>Take the stairs at work today</Text>
            </View>

            <View style={styles.body}>
              <Text>You Completed This activity a lot</Text>
              <Text>You Completed This activity a lot</Text>
              <Text>You Completed This activity a lot</Text>
            </View>
          </View>

          <AntDesign name="down" size={15} />
        </Animated.View>
      </TouchableOpacity>
    </>
  );
}

export default Card;
