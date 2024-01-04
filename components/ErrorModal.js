import React, { useState } from "react";
import {
  Alert,
  Modal,
  TouchableOpacity,
  Text,
  Pressable,
  View,
} from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { selectModalState, setModalVisible } from "../features/modalSlice";
import { useNavigation } from "@react-navigation/native";

const ErrorModal = ({ errorCode }) => {
  const restaurant = useSelector(selectRestaurant);
  const modal = useSelector(selectModalState);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const errorMessages = {
    basketStarted: `You have already started a basket with ${restaurant.title}. Please either continue your order or cancel it to select a new restaurant.`,
  };

  const handleClose = () => {
    dispatch(setModalVisible(!modal));
  };

  const handleViewRestaurant = () => {
    dispatch(setModalVisible(!modal));
    navigation.navigate("Restaurant", restaurant);
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={handleClose}
    >
      <View className="flex-1 justify-center items-center">
        <View className="mr-10 ml-10 pt-20 px-5 pb-5 bg-white rounded-lg items-center shadow-xl z-50 border-gray-200 border-b-2 border-r-2 relative">
          <TouchableOpacity
            onPress={handleClose}
            className="rounded-full bg-gray-100 absolute top-3 right-3"
          >
            <XCircleIcon color="#00CCBB" height={50} width={50} />
          </TouchableOpacity>
          <Text className="text-[#00CCBB] text-xl text-center">
            {errorMessages[errorCode]}
          </Text>
          <Pressable
            className="bg-[#00CCBB] p-3 rounded-lg mt-10"
            onPress={handleViewRestaurant}
          >
            <Text className="text-white text-lg text-center">
              Return to {restaurant.title}
            </Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ErrorModal;
