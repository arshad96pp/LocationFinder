import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { AppContext } from "../context";

const LocationModal = ({ mapCordinate, setShowModal }) => {
  const [locationDataItem, setLocationDataItem] = useState({});

  const navigate = useNavigation();

  const { latitude, longitude } = mapCordinate;

  const { getAllSelectedLocation } = useContext(AppContext);

  useEffect(() => {
    const getAllData = async () => {
      const date = new Date();
      const newTime = dayjs(date).format("HH:MM:A");

      const locationData = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1-`
      );
      locationData.data.time = newTime;
      setLocationDataItem(locationData.data);
    };

    getAllData();
  }, []);

  const saveLocationHandeler = (data) => {
    setShowModal(false)

  };

  return (
    <View className="absolute  h-[60%] bg-white  left-3 right-3 rounded-lg overflow-hidden">
      <View className="flex-1 bg-slate-500 p-2">
        <Text className="text-white font-semibold text-lg mb-4">
          Save Location {locationDataItem?.time}
        </Text>
        <Text className="text-white mb-1">
          Country: {locationDataItem?.address?.country}
        </Text>
        <Text className="text-white mb-1">
          State: {locationDataItem?.address?.state}
        </Text>
        <Text className="text-white mb-1">
          State District: {locationDataItem?.address?.state_district}
        </Text>
        <Text className="text-white mb-1">
          County: {locationDataItem?.address?.county}
        </Text>
        <Text className="text-white mb-1">
          Latitude: {locationDataItem?.lat}
        </Text>
        <Text className="text-white mb-1">
          Longitude: {locationDataItem?.lon}
        </Text>
      </View>

      <View className="h-14 bg-slate-900 flex justify-center px-3 ">
        <View className=" bg-slate-900 flex flex-row justify-end">
          <TouchableOpacity
            className="bg-gray-50 p-1 h-11 flex justify-center items-center mr-2 rounded-xl px-6"
            onPress={() => setShowModal(false)}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-gray-50 p-1 h-11 flex justify-center items-center rounded-xl px-6"
            onPress={() => {
              saveLocationHandeler(locationDataItem);
              getAllSelectedLocation(locationDataItem);
            }}
          >
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LocationModal;
