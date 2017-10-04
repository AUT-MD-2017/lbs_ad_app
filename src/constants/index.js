import { Platform, StatusBar } from 'react-native';


export const API_ADDRESS = `http://${
  __DEV__ ? '0.0.0.0:3000' : 'yourhost.com'
}/api/`;

export const BLACK = '#000';
export const WHITE = '#fff';
export const DARK_GREY = '#666';
export const GREY = '#999';
export const LIGHT_GREY = '#aaa';
export const LIGHTER_GREY = '#eee';
export const DARK_WHITE = '#f4f4f4';
export const LIGHT_WHITE = '#f9f9f9';
export const LIGHT_YELLOW = '#ffc';
export const RED = '#ff1744';
export const LIGHT_BLUE = '#40c4ff';

export const NAVIGATION_OPTIONS = {
  headerTitleStyle: {
    color: BLACK,
  },
  headerTintColor: LIGHT_BLUE,
};

export const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : 0;
