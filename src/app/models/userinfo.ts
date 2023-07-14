
export interface CompleteUserDetails{
  userInfo: UserInfo;
  weatherInfo: WeatherInfo;
  otherInfo?:OtherInfo;
}

export interface OtherInfo {
  countryFlag: string;
  weatherStateImage: string;
  weatherStateDescription: string;
  maxTemp: number;
  minTemp: number;
  weatherStateList?: any[]
  isDay: boolean;
}

export interface WeatherState {
  image: string;
  description: string;
}

export interface UserInfo {
  name: NameDetail;
  gender: string;
  location: LocationDetail;
  email: string;
  picture: PictureDetail;
}

export interface NameDetail {
  title: string;
  first: string;
  last: string;
}

export interface LocationDetail {
  street: StreetDetail;
  city: string;
  state: string;
  country: string;
  postcode: string;
  coordinates: CoordinateDetail;
  timezone: TimezoneDetail;
}

export interface StreetDetail{
  number: number;
  name: string;
}

export interface CoordinateDetail{
  latitude: string;
  longitude: string;
}

export interface TimezoneDetail{
  offset: string;
  description: string;
}

export interface PictureDetail{
  large: string;
  medium: string;
  thumbnail: string;
}

export interface WeatherInfo{
  latitude: number;
  longitude: number;
  currentWeather:CurrentWeatherDetail;
  hourlyUnits: HourlyUnitsDetail;
  hourly: HourlyDetail;
  daily:DailyDetails;
  dailyUnits:DailyUnits;
}

export interface DailyUnits{
  temperature2mMax: string;
  temperature2mMin: string;
  time: string;
}

export interface DailyDetails{
  temperature2mMax: number[];
  temperature2mMin: number[];
  time: string[];
}

export interface CurrentWeatherDetail{
  temperature: number;
  windSpeed: number;
  windDirection: number;
  weathercode: number;
  isDay: number;
  time: string;
}

export interface HourlyUnitsDetail{
  time: string;
  temperature2m: string;
  weatherCode: string;
}

export interface HourlyDetail {
  time: string[];
  temperature2m: number[];
  weathercode: number[];
}
