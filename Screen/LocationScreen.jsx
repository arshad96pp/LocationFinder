import { View, Text, ScrollView } from "react-native";
import React, { useContext } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { AppContext } from "../context";

const LocationScreen = () => {
  const { storLocation } = useContext(AppContext);

  const navigate = useNavigation();

  const handleOpenMap = (item) => {
    navigate.navigate("Map",item);
  };
  return (
    <View className="flex-1">
      {storLocation?.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text>Please Select Location</Text>
        </View>
      ) : (
        <View className="flex-1  p-2">
          {storLocation?.map((item, index) => (
            <View
              key={index}
              className="bg-gray-900 w-full p-3 rounded-2xl mb-2"
              onStartShouldSetResponder={() => handleOpenMap(item)}
            >
              <Text className="text-white mb-1">
                Country: {item?.address?.country}
              </Text>
              <Text className="text-white mb-1">
                State: {item?.address?.state}
              </Text>
              <Text className="text-white mb-1">
                County: {item?.address?.county}
              </Text>
              <Text className="text-white mb-1">Latitude: {item?.lat}</Text>
              <Text className="text-white mb-1">Longitude: {item?.lon}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
};

export default LocationScreen;
