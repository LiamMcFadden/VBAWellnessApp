/*
 * This file serves as standard styles to use throughout the application
 * */

// Colors To Use
const COLORS = {
  primary: '#0155A4',
  tintPrimary: alpha => `rgba(1, 85, 164, ${alpha})`,
  tintSecondary: alpha => `rgba(76, 161, 254, ${alpha})`,
  secondary: '#4CA1FE',
};

// This is a list of different font sizes to use
// As mentioned by material design guidelines
// https://material.io/design/typography/the-type-system.html#type-scale
const TYPESCALE = {
  h6: {
    fontWeight: '500',
    fontSize: 20,
    letterSpacing: 0.15,
  },
  subtitle: {
    fontWeight: 'normal',
    fontSize: 16,
    letterSpacing: 0.15,
  },
  button: {
    fontWeight: '500',
    fontSize: 14,
    letterSpacing: 1.25,
  },
};

export {COLORS, TYPESCALE};

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
