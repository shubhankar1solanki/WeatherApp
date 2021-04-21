import {StyleSheet} from 'react-native';
import {hp, wp} from '../../Helper/ResponsiveScreen';

export default StyleSheet.create({
  listContainer: {
    padding: wp(5),
    paddingBottom: wp(20),
  },
  mapView: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    height: hp(92),
  },
  cityName: {
    fontSize: wp(5),
    fontFamily: 'Roboto',
    fontWeight: 'bold',
  },
  otherInfo: {
    top: hp(0.9),
    fontSize: wp(5),
    fontFamily: 'Roboto',
  },
  weatherName: {
    fontSize: wp(4),
    fontFamily: 'Roboto',
    marginTop: 10,
    color: 'grey',
  },
  tempStyle: {
    fontSize: wp(8),
    fontFamily: 'Roboto',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    position: 'absolute',
    bottom: hp(0),
    paddingHorizontal: wp(7),
    paddingTop: wp(4),
    paddingBottom: wp(7),
    width: wp(100),
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  mapCityName: {
    top: wp(-2),
    fontSize: wp(5),
    fontFamily: 'Roboto',
  },
  temp: {
    top: hp(4),
    fontSize: wp(8),
    fontFamily: 'Roboto',
  },
});
