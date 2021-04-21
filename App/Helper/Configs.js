import {wp, hp} from '../Helper/ResponsiveScreen';

export const OpenWeatherKey = '8a7f9e8ec208bbb8e5cf6a8844e9bdf6';
export const ASPECT_RATIO = wp(1) / hp(1);
export const LATITUDE_DELTA = 0.0922;
export const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
export const INITIAL_REGION = {
	latitude: 37.79,
	longitude: -122.406417,
	latitudeDelta: LATITUDE_DELTA,
	longitudeDelta: LONGITUDE_DELTA,
};
