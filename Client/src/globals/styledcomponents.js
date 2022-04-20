import React, {useEffect} from 'react';
import {COLORS, TYPESCALE, BUTTONSTYLE} from './styles';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {View, StyleSheet, Text} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

/*
 * @params:
 *   width: button width
 *   height: button height
 *   onPress: button function on press
 *   children: child props, should be a string
 *   textStyle? optional styling for text --> ex. {fontSize: 20}
 *   buttonStyle? optional button styling --> ex. {backgroundColor: 'white'}
 * */
const OutlinedButton = ({
  width,
  height,
  onPress,
  children,
  textStyle,
  buttonStyle,
}) => (
  <TouchableHighlight
    underlayColor={COLORS.tintPrimary(0.2)}
    onPress={onPress}
    style={[BUTTONSTYLE.OUTLINED(width, height), buttonStyle]}>
    <Text style={[TYPESCALE.button, {color: COLORS.primary}, textStyle]}>
      {children}
    </Text>
  </TouchableHighlight>
);

/*
 * See OutlinedButton
 * */
const ContainedButton = ({
  width,
  height,
  onPress,
  children,
  textStyle,
  buttonStyle,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[BUTTONSTYLE.CONTAINED(width, height), buttonStyle]}>
    <Text style={[TYPESCALE.button, {color: 'white'}, textStyle]}>
      {children}
    </Text>
  </TouchableOpacity>
);

/*
 * Milstone progress bar
 * @params:
 *    milestone --> total points required to reach milestone
 *    points --> users current total
 *    width? --> optional parameter specifying bar width
 * */
const ProgressBar = ({milestone, points, width}) => {
  const percentComplete = points / milestone;
  const foregroundWidth = useSharedValue(5);
  const progress_styles = progess_bar_styles(width);

  useEffect(() => {
    foregroundWidth.value = percentComplete * width;
  }, [width, foregroundWidth, percentComplete]);
  const animatedStyles = useAnimatedStyle(() => {
    return {
      width: withTiming(foregroundWidth.value, {
        duration: 1000,
      }),
    };
  });

  return (
    <TouchableOpacity
      onPress={() => {
        foregroundWidth.value = 100;
      }}
      style={progress_styles.background}>
      <Animated.View style={[progress_styles.foreground, animatedStyles]} />
    </TouchableOpacity>
  );
};

const progess_bar_styles = width =>
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
    },
  });

export {ProgressBar, OutlinedButton, ContainedButton};
