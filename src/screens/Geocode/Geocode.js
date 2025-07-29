import {
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import * as Location from "expo-location";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import constants from "../../components/constants/constants";

const Geocode = ({ setLocation, setLoading, loading }) => {
  const [permissionStatus, setPermissionStatus] = useState(null);

  // Check permission status when component mounts
  useEffect(() => {
    checkPermissionStatus();
  }, []);

  const checkPermissionStatus = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    setPermissionStatus(status);
  };

  const requestPermissionAndLocation = async () => {
    try {
      setLoading(true);

      // First check if we already have permission
      let { status } = await Location.getForegroundPermissionsAsync();

      // If no permission, request it
      if (status !== "granted") {
        const { status: newStatus } =
          await Location.requestForegroundPermissionsAsync();
        status = newStatus;
        setPermissionStatus(status);
      }

      // Handle permission denial
      if (status !== "granted") {
        Alert.alert(
          "Location Permission Required",
          "This app needs location permission to work properly. Please enable location access in your device settings.",
          [
            { text: "Cancel", style: "cancel" },
            {
              text: "Open Settings",
              onPress: () => Location.requestForegroundPermissionsAsync(),
            },
          ]
        );
        setLoading(false);
        return;
      }

      // Get current location
      const currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeout: 15000,
        maximumAge: 10000,
      });

      const locationObject = {
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        altitude: currentLocation.coords.altitude,
        accuracy: currentLocation.coords.accuracy,
        timestamp: currentLocation.timestamp,
      };

      console.log(`Location obtained: ${JSON.stringify(locationObject)}`);
      setLocation(locationObject);
      setPermissionStatus("granted");
    } catch (error) {
      console.error("Error getting location:", error);
      Alert.alert(
        "Location Error",
        "Unable to get your location. Please make sure location services are enabled and try again.",
        [{ text: "OK" }]
      );
    } finally {
      setLoading(false);
    }
  };

  const getButtonText = () => {
    if (loading) return "Getting Location...";
    if (permissionStatus === "granted") return "Refresh Location";
    if (permissionStatus === "denied") return "Enable Location";
    return "Get Location";
  };

  const getButtonColor = () => {
    if (loading) return constants.AppColor.grey;
    if (permissionStatus === "denied") return "#FF6B6B";
    return "#F1884D";
  };

  return (
    <SafeAreaView>
      <TouchableOpacity
        onPress={requestPermissionAndLocation}
        style={[
          styles.appButtonContainer,
          { backgroundColor: getButtonColor() },
        ]}
        disabled={loading}
      >
        <Text style={styles.appButtonText}>
          {getButtonText()}{" "}
          <MaterialCommunityIcons
            name={loading ? "loading" : "crosshairs-gps"}
            size={24}
            color={"white"}
            style={{ marginHorizontal: 10 }}
          />
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  appButtonContainer: {
    backgroundColor: "#F1884D",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 35,
    width: "100%",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  appButtonText: {
    fontSize: 24,
    color: "white",
    alignSelf: "center",
    alignItems: "center",
    alignContent: "center",
    justifyContent: "space-between",
    marginLeft: 9,
    marginRight: 6,
  },
});

export default Geocode;
