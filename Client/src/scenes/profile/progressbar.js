import React from 'react';

import AnimatedProgressWheel from 'react-native-progress-wheel';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS, TYPESCALE, FONTWEIGHT} from '../../globals/styles';

/*
 * @params
 *   points: points user has
 *   milestone: required for 100%
 *   textStyle? optional textStyle --> different color maybe
 *   size? optional size --> changes size of wheel :: note for smaller
 *         sizes may need change textStyle
 * */
const ProgressBar = ({points, milestone, textStyle, size}) => {
  const wheelSize = size ?? 100;
  const {progressContainer, progressBackground} = ProgressStyles(wheelSize);

  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        margin: wheelSize / 2,
      }}
    >
      <View style={{position: 'absolute'}}>
        <AnimatedProgressWheel
          size={wheelSize}
          width={5}
          color={COLORS.primary}
          progress={(points / milestone) * 100}
          backgroundColor={COLORS.secondary}
          animateFromValue={0}
          duration={1500}
        />
      </View>
      <Text style={[TYPESCALE.h5, FONTWEIGHT.medium, textStyle]}>Lvl. 7</Text>
    </View>
  );
};

const ProgressStyles = size => {
  //var circum = (size / 2 - 5) * 2 * Math.PI;

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

export default ProgressBar;
