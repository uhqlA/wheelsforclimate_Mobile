import { Dimensions } from "react-native";

const BottomScreen = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 80,
    backgroundColor: "#fff",
  },
};

const AppColor = {
  backgroundColor: "#262C3F",
  white: "#ffffff",
  grey: "#D3D3D3",
  tomato: "#ff6347",
  blue: "#3498db",
  selectedItemColor: "#B1E9CA",
  green: "#05B050",
  black: "#000000",
  input: "#EFEFEF",
  inputBorderColor: "#E8ECF4",
  textColor: "#483D8B",
};

const SCREEN_WIDTH = Dimensions.get("screen").width;
const SCREEN_HEIGHT = Dimensions.get("screen").height;
const screenSize = Math.sqrt(
  SCREEN_WIDTH * SCREEN_WIDTH + SCREEN_HEIGHT * SCREEN_HEIGHT
);
const responsiveFontSize = screenSize / 30;
const responsiveMediumFontSize = responsiveFontSize / 2.5;
const BASE_URL = "http://192.168.0.11:8000";
const getFilteredData = (filterCriteria, data) => {
  return Object.keys(filterCriteria).length > 0
    ? data.filter((item) => item.properties.status === filterCriteria.name)
    : data;
};

const constants = {
  BottomScreen,
  AppColor,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
  responsiveFontSize,
  responsiveMediumFontSize,
  getFilteredData,
  BASE_URL,
};

export default constants;
