import { Text, View, StatusBar } from "react-native";
import Navigation from "./Navigation/Navigation";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { AppContextProvider } from "./context";

export default function App() {
  return (
    <NavigationContainer>
      <AppContextProvider>
        <View className="flex-1">
          <StatusBar backgroundColor="black" />
          <Navigation />
        </View>
      </AppContextProvider>
    </NavigationContainer>
  );
}
