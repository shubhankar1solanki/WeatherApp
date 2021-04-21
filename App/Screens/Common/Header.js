import React from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import {wp} from '../../Helper/ResponsiveScreen';
import {BACK_ARROW} from '../../Images';

const Header = props => {
  let {title = 'Weather App', backButton = false} = props;

  return (
    <View style={[styles.container]}>
      {backButton && (
        <TouchableOpacity
          onPress={() => props.navigation.goBack()}
          style={{position: 'absolute', left: wp(5)}}>
          <Image
            resizeMode="contain"
            source={BACK_ARROW}
            style={{width: wp(7), height: wp(7)}}
          />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#00804A',
    padding: wp(4),
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: wp(6),
    color: 'white',
  },
});

export default Header;
