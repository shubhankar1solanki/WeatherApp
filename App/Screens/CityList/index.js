import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import styles from './styles';
import {wp} from '../../Helper/ResponsiveScreen';
import {OpenWeatherKey} from '../../Helper/Configs';
import Header from '../Common/Header';
import Geolocation from '@react-native-community/geolocation';

const Index = ({navigation}) => {
  let [cityData, setCityData] = useState([]);

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const getData = async (initRoute) => {
    let api = `http://api.openweathermap.org/data/2.5/find?lat=${initRoute.latitude}&lon=${initRoute.longitude}&cnt=50&units=metric&appid=${OpenWeatherKey}`;

    await fetch(api)
      .then(res => res.json())
      .then(res => {
        setCityData(res.list);
      });
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition((info) => {
      const initRoute = {
        latitude: parseFloat(info.coords.latitude),
        longitude: parseFloat(info.coords.longitude),
      };
      getData(initRoute);
    });
  };

  const renderCity = ({item, index}) => {
    return (
      <TouchableOpacity
        style={styles.rowContainer}
        onPress={() => navigation.navigate('WeatherInfo', {weather: item})}>
        {/*<Image resizeMode={'cover'}  source={{uri: item.logo_url}} style={styles.bankImage}/>*/}
        <View>
          <Text style={styles.cityName}>{item.name}</Text>
          <Text style={styles.weatherName}>
            {item.weather[0].description.charAt(0).toUpperCase() +
              item.weather[0].description.slice(1) ?? ''}
          </Text>
        </View>
        <Text style={styles.tempStyle}>{`${item.main.temp}° c`}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Header />
      <FlatList
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        data={cityData}
        renderItem={renderCity}
        ItemSeparatorComponent={() => <View style={{padding: wp(2)}} />}
      />
    </View>
  );
};

export default Index;
