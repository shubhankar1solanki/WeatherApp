import React from 'react';
import {View, Text, Image} from 'react-native';
import styles from './styles';
import {wp} from '../../Helper/ResponsiveScreen';
import Header from '../Common/Header';
import MapView, {Marker} from 'react-native-maps';
import {CLOUD, RED_PIN} from '../../Images';

const weatherTemp = {
  id: 1185241,
  name: 'Dhaka',
  coord: {
    lat: 23.7104,
    lon: 90.4074,
  },
  main: {
    temp: 30,
    feels_like: 34.1,
    temp_min: 30,
    temp_max: 30,
    pressure: 1011,
    humidity: 66,
  },
  dt: 1618978145,
  wind: {
    speed: 4.12,
    deg: 160,
  },
  sys: {
    country: 'BD',
  },
  rain: null,
  snow: null,
  clouds: {
    all: 1,
  },
  weather: [
    {
      id: 721,
      main: 'Haze',
      description: 'haze',
      icon: '50d',
    },
  ],
};

const Index = props => {
  let params = props.route.params;
  let weather = params?.weather ?? weatherTemp;
  return (
    <View>
      <Header backButton {...props} />
      <MapView
        style={styles.mapView}
        initialRegion={{
          latitude: weather.coord.lat,
          longitude: weather.coord.lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{
            latitude: weather.coord.lat,
            longitude: weather.coord.lon,
          }}
          style={{alignItems: 'center'}}>
          <Image
            resizeMode="cover"
            source={RED_PIN}
            style={{width: wp(12), height: wp(12)}}
          />
          <Text style={styles.mapCityName}>{weather.name}</Text>
        </Marker>
      </MapView>
      <View style={styles.bottomContainer}>
        <View>
          <Text style={styles.cityName}>{weather.name}</Text>
          <Text style={styles.otherInfo}>
            {weather.weather[0].description.charAt(0).toUpperCase() +
              weather.weather[0].description.slice(1)}
          </Text>
          <Text
            style={
              styles.otherInfo
            }>{`Humidity: ${weather.main.humidity}`}</Text>
          <Text
            style={
              styles.otherInfo
            }>{`Wind Speed: ${weather.wind.speed}`}</Text>
          <Text
            style={
              styles.otherInfo
            }>{`Max. Temp: ${weather.main.temp_min}° c`}</Text>
          <Text
            style={
              styles.otherInfo
            }>{`Min. Temp: ${weather.main.temp_max}° c`}</Text>
        </View>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Text style={styles.temp}>{`${weather.main.temp}° c`}</Text>
          <Image
            resizeMode="contain"
            source={CLOUD}
            style={{width: wp(30), height: wp(30)}}
          />
        </View>
      </View>
    </View>
  );
};

export default Index;
