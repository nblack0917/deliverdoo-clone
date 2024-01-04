import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFor } from "../sanity";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";

import { selectRestaurant } from "../features/restaurantSlice";
import { setModalVisible } from "../features/modalSlice";
import { selectBasketItems } from "../features/basketSlice";

const RestaurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  long,
  lat,
  full,
}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);

  const handleSelectRestaurant = () => {
    if (restaurant.title !== title && items.length > 0) {
      dispatch(setModalVisible(true));
    } else {
      navigation.navigate("Restaurant", {
        id,
        imgUrl,
        title,
        rating,
        genre,
        address,
        short_description,
        dishes,
        long,
        lat,
      });
    }
  };

  return (
    <>
      {full ? (
        <TouchableOpacity
          onPress={handleSelectRestaurant}
          className="bg-white  shadow flex-1 justify-center"
        >
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="h-48 max-w-fit"
          />

          <View className="px-3 pt-4 pb-2 flex-row items-center">
            <Text className="flex-1 font-bold text-lg">{title}</Text>
            <View className=" flex-row items-center space-x-1">
              <StarIcon color="green" opacity={0.5} size={22} />
              <Text className="text-xs text-gray-500">
                <Text className="text-green-500">{rating}</Text> ∙ {genre}{" "}
              </Text>
            </View>

            <View className="flex-row items-center space-x-1">
              <MapPinIcon color="gray" opacity={0.4} size={22} />
              <Text className="text-xs text-gray-500">Nearby ∙ {address}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={handleSelectRestaurant}
          className="bg-white mr-3 shadow"
        >
          <Image
            source={{
              uri: urlFor(imgUrl).url(),
            }}
            className="h-36 w-64 rounded"
          />

          <View className="px-3 pb-4">
            <Text className="font-bold text-lg pt-2">{title}</Text>
            <View className="flex-row items-center space-x-1">
              <StarIcon color="green" opacity={0.5} size={22} />
              <Text className="text-xs text-gray-500">
                <Text className="text-green-500">{rating}</Text> ∙ {genre}{" "}
              </Text>
            </View>

            <View className="flex-row items-center space-x-1">
              <MapPinIcon color="gray" opacity={0.4} size={22} />
              <Text className="text-xs text-gray-500">Nearby ∙ {address}</Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default RestaurantCard;
