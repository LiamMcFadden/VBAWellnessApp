# VBA Wellness Application

## Introduction

The VBA Wellness Application creates a competitive environment that encourages young lawyers to maintain a healthier lifestyle through healthy competitions.
## Client Application


### Installation and Build Instructions


#### IOS

The IOS instructions assumes you have XCODE, XCODE Command Line Tools, and the XCODE simulator installed.

1. Clone the repository
2. Navigate to `client` directory and run `npm install`
3. Navigate to `ios` directory and run `pod install`
4. Build the appliction:
   1. In `client` run `react-native start`
   2. Then build the application using `react-native run-ios`

If simulator keeps refreshing at this point try rerunning Metro with `react-native start --reset-cache`

#### Android

Follow the instructions [here](https://reactnative.dev/docs/environment-setup).
Note: If no device is found, you may also have to follow the instructions [here](https://android-developers.googleblog.com/2018/07/android-emulator-amd-processor-hyper-v.html).

Once setup is complete do the following:
1. Navigate to the `Client` directory and run `npm install`
2. Run `npm run android`. This will start metro, build the app, and launch it on your device. 
