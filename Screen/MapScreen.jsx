import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TouchableOpacity } from "react-native";
import LocationModal from "../components/LocationModal";
import { useRoute } from "@react-navigation/native";

const MapScreen = () => {
  const [mapCordinate, setMapCordinate] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [showModal, setShowModal] = useState(false);

  const { params } = useRoute();


  useEffect(() => {
    const initialyGetLocation = async () => {
      try {
        const getData = await AsyncStorage.getItem("LocationData");
        if (getData) {
          const parsedData = JSON.parse(getData);
          setMapCordinate(parsedData);
        }
      } catch (error) {
        console.log("somthing wrong", error);
      }
    };
    initialyGetLocation();
  }, []);


  const handelLocationChange = (data) => {
    if(params?.lat && params?.lon){
      setMapCordinate({ latitude: params?.lat, longitude: params?.lon });
    }
  };

  // get current latitude and longitude
  const onSelectLocation = async (value) => {
    setMapCordinate(value);

    try {
      await AsyncStorage.setItem("LocationData", JSON.stringify(value));
      setTimeout(() => {
        setShowModal(true);
      }, 400);
      console.log("Succesfully saved data");
    } catch (err) {
      console.log("somthing wrong", err);
    }
  };



  // get selected location data
  React.useEffect(() => {
    if(params?.lat && params?.lon){
      setMapCordinate({ latitude: JSON.parse(params?.lat), longitude: JSON.parse(params?.lon) });
    }
  }, [params]);


  return (
    <View className="flex-1 relative flex justify-center ">
      <MapView
        className="flex-1"
        region={mapCordinate}
        // initialRegion={mapCordinate}
        onRegionChangeComplete={(text) => handelLocationChange(text)}
        onPress={(e) => onSelectLocation(e.nativeEvent.coordinate)}
      >
        <Marker coordinate={mapCordinate} pinColor="red" />
      </MapView>
      {showModal && (
        <LocationModal
          mapCordinate={mapCordinate}
          setShowModal={setShowModal}
        />
      )}
    </View>
  );
};

export default MapScreen;
