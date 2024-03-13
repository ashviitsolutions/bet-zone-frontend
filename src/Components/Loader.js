import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import Colors from '../Constants/Colors';

const Loader = ({customebgColor}) => {
  return (
    <View style={[StyleSheet.absoluteFillObject ,styles.container,{ backgroundColor: customebgColor ? customebgColor : 'rgba(0,0,0,0.3)' }]}>
      <ActivityIndicator size="large" color={Colors.yellowColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:'rgba(0,0,0,0.3)',
    zIndex:1
  },
});

export default Loader;
