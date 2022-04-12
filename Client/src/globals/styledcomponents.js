import React from 'react';
import {COLORS, TYPESCALE, BUTTONSTYLE} from './styles';
import {
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {Text} from 'react-native';

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
    style={[BUTTONSTYLE.OUTLINED(width, height), buttonStyle]}
  >
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
    style={[BUTTONSTYLE.CONTAINED(width, height), buttonStyle]}
  >
    <Text style={[TYPESCALE.button, {color: 'white'}, textStyle]}>
      {children}
    </Text>
  </TouchableOpacity>
);

export {OutlinedButton, ContainedButton};
