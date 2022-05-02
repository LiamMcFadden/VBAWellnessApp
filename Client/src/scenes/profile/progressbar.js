import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { COLORS, TYPESCALE, FONTWEIGHT } from '../../globals/styles';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const ProgressBar = ({ milestone, points, width }) => {
  const percentComplete = points / milestone;
  const foregroundWidth = useSharedValue(5);
  const progress_styles = styles(width, percentComplete);
  const st = 100;

  useEffect(() => {
    foregroundWidth.value = percentComplete * width;
  }, []);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(foregroundWidth.value, {
        duration: 1000,
      }),
    };
  });

  return (
    <View
      style={progress_styles.background}>
      <Animated.View
        style={[
          {
            backgroundColor: COLORS.primary,
            height: 10,
            borderRadius: 24,
          },
          animatedStyles,
        ]}
      />
    </View>
  );
};

export default ProgressBar;

const styles = (width, percentComplete) =>
  StyleSheet.create({
    background: {
      backgroundColor: COLORS.secondary,
      width: width,
      borderRadius: 24,
      height: 10,
    },

    foreground: {
      backgroundColor: COLORS.primary,
      height: 10,
      borderRadius: 24,
      width: 20,
    },
  });

/*
 * @params
 *   points: points user has
 *   milestone: required for 100%
 *   textStyle? optional textStyle --> different color maybe
 *   size? optional size --> changes size of wheel :: note for smaller
 *         sizes may need change textStyle
 * */
//const ProgressBar = ({points, milestone, textStyle, size}) => {
//const wheelSize = size ?? 100;
//const {progressContainer, progressBackground} = ProgressStyles(wheelSize);

//return (
//<View
//style={{
//justifyContent: 'center',
//alignItems: 'center',
//margin: wheelSize / 2,
//}}
//>
//<View style={{position: 'absolute'}}>
//<AnimatedProgressWheel
//size={wheelSize}
//width={5}
//color={COLORS.primary}
//progress={(points / milestone) * 100}
//backgroundColor={COLORS.secondary}
//animateFromValue={0}
//duration={1500}
///>
//</View>
//<Text style={[TYPESCALE.h5, FONTWEIGHT.medium, textStyle]}>Lvl. 7</Text>
//</View>
//);
//};

//const ProgressStyles = size => {
////var circum = (size / 2 - 5) * 2 * Math.PI;

//return StyleSheet.create({
//progressContainer: {
//width: size,
//height: size,
//borderRadius: size / 2, //Circle
//backgroundColor: 'white', },
//progressBackground: {
//width: size,
//height: size,
//borderRadius: size / 2,
//borderWidth: 5,
//borderColor: 'green',
//},
//progressBackgroundBar: {},
//progressForegroundBar: {},
//});
//};

//export default ProgressBar;
