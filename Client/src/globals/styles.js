/*
 * This file serves as standard styles to use throughout the application
 * */

/* Usefule Resources:
 *
 * Shadows and Elevation:
 * https://material.io/design/environment/elevation.html#depicting-elevation
 * https://material.io/design/environment/light-shadows.html#research
 *
 * Shadow Generator:
 * https://ethercreative.github.io/react-native-shadow-generator/
 *
 * */

/*
 * Standard Application Collors
 * primary: VBA Blue
 * secondary: Light Blue Accent
 *
 * tintPrimary(alpha): primary with alpha, good for overlay and shadows
 * tintSecondary(alpha): see tintPrimary
 * */
const COLORS = {
  primary: '#0155A4',
  tintPrimary: alpha => `rgba(1, 85, 164, ${alpha})`,
  tintSecondary: alpha => `rgba(76, 161, 254, ${alpha})`,
  secondary: '#4CA1FE',
};

/*
 * Styles For Buttons
 * If you want to implement a specific button without
 * the use of styled components use this to keep styles
 * consistent
 * */
const BUTTONSTYLE = {
  // Full Styles for Contained Button
  CONTAINED: (width, height) => ({
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0155A4',
    borderRadius: 4,
    margin: 5,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: {
      width: 2, //might be better to use 2 and 1 for w and h
      height: 1,
    },
    shadowRadius: 4,
    elevation: 4,
    paddingLeft: 16,
    paddingRight: 16,
    // color : White --> Note that contents should be white (e.g text)
  }),

  // Full Styles for Outlined Buttons
  // Should also use TouchableHighlight for this as it darkens background
  // On Press
  OUTLINED: (width, height) => ({
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fefefe', //offwhiteish
    borderWidth: 1,
    borderColor: '#0155A4',
    borderRadius: 4,
    margin: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 1, //might be better to use 2 and 1 for w and h
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
    paddingLeft: 16,
    paddingRight: 16,
    //Color : COLORS.primary --> should use primary color with this button
  }),
};

/*
 * Better Font Weights
 * Usage: style={[FONTWEIGHT.thin, ...]}
 */
const FONTWEIGHT = {
  thin: {fontWeight: '100'},
  ultralight: {fontWeight: '200'},
  light: {fontWeight: '300'},
  regular: {fontWeight: '400'},
  medium: {fontWeight: '500'},
  semibold: {fontWeight: '600'},
  bold: {fontWeight: '700'},
  heavy: {fontWeight: '800'},
  black: {fontWeight: '900'},
};

/*
 * This provides different font styles to use as described
 * by material designs guidelines
 *
 * Usage: style={[TYPESCALE.h6,...]}
 * https://material.io/design/typography/the-type-system.html#type-scale
 *
 * */
const TYPESCALE = {
  h3: {
    ...FONTWEIGHT.regular,
    fontSize: 48,
    letterSpacing: 0,
  },
  h4: {
    ...FONTWEIGHT.regular,
    fontSize: 38,
    letterSpacing: 0.25,
  },
  h5: {
    ...FONTWEIGHT.regular,
    fontSize: 24,
    letterSpacing: 0,
  },
  h6: {
    ...FONTWEIGHT.medium,
    fontSize: 20,
    letterSpacing: 0.15,
  },
  body1: {
    ...FONTWEIGHT.regular,
    fontSize: 15,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontWeight: 'normal',
    fontSize: 16,
    letterSpacing: 0.15,
  },
  button: {
    ...FONTWEIGHT.medium,
    fontSize: 14,
    letterSpacing: 1.25,
  },
};

export {COLORS, TYPESCALE, BUTTONSTYLE, FONTWEIGHT};

/**
 * Weights:
{ fontWeight: '100' }, // Thin
{ fontWeight: '200' }, // Ultra Light
{ fontWeight: '300' }, // Light
{ fontWeight: '400' }, // Regular
{ fontWeight: '500' }, // Medium
{ fontWeight: '600' }, // Semibold
{ fontWeight: '700' }, // Bold
{ fontWeight: '800' }, // Heavy
{ fontWeight: '900' }, // Black
 * */
