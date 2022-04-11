import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Animated, {
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
});

function Card() {
  const [pressed, setPressed] = useState(false);
  const offset = useSharedValue(50);
  const rotate = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      height: offset.value,
    };
  });

  const ani = useAnimatedStyle(() => {
    return {
      transform: [{rotateY: `${rotate.value}deg`}],
    };
  });

  const handlePress = () => {
    if (pressed) {
      setPressed(!pressed);

      return (rotate.value = withSpring(180));
    } else {
      setPressed(!pressed);

      return (rotate.value = withSpring(0));
    }
  };

  return (
    <>
      <TouchableOpacity onPress={handlePress}>
        <Animated.View style={[styles.box, animatedStyles]}>
          <View style={{justifyContent: 'space-around'}}>
            <Text style={{fontSize: 14, fontWeight: 'bold'}}>Stairmaster</Text>
            <Text>Take the stairs at work today</Text>
          </View>

          <AntDesign name="down" size={15} />
        </Animated.View>
      </TouchableOpacity>
    </>
  );
}

export default Card;
