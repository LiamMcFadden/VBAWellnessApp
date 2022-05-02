import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  TouchableHighlight,
  TouchableOpacity
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle, useSharedValue, withTiming
} from 'react-native-reanimated';
import { BUTTONSTYLE, COLORS, TYPESCALE } from './styles';

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
    {children}
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
    <Text style={[TYPESCALE.button, { color: 'white' }, textStyle]}>
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
const ProgressBar = ({ points, width, textOrientation }) => {
  const percentComplete = (points % 100) / 100;
  const foregroundWidth = useSharedValue(5);
  const progress_styles = progess_bar_styles(width, textOrientation);
  const level = Math.floor(points / 100) + 1;

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
    <>
    <Text style={progress_styles.text}>Level {level}</Text>
    <View style={progress_styles.background}>
      <Animated.View style={[progress_styles.foreground, animatedStyles]} />
    </View>
    </>
  );
};

const progess_bar_styles = (width, textOrientation) =>
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

    text: {
      alignSelf: textOrientation
    }
  });

export { ProgressBar, OutlinedButton, ContainedButton };
