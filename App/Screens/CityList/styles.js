import {StyleSheet} from 'react-native';
import {wp} from '../../Helper/ResponsiveScreen';

export default StyleSheet.create({
  listContainer: {
    padding: wp(5),
    paddingBottom: wp(20)
  },
  rowContainer: {
    width: wp(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cityName: {
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
    fontSize: wp(7),
    fontFamily: 'Roboto',
  },
});
