import React from "react";
import { Text } from "react-native";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MapScreen from "../Screen/MapScreen";
import LocationScreen from "../Screen/LocationScreen";

const Bottom = createBottomTabNavigator();

const Navigation = () => {
  return (
    <Bottom.Navigator screenOptions={{ headerShown: false }}>
      <Bottom.Screen name="Map" component={MapScreen} />
      <Bottom.Screen name="Location" component={LocationScreen} />
    </Bottom.Navigator>
  );
};

export default Navigation;
