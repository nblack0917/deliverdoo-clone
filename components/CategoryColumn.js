import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { HomeIcon } from "react-native-heroicons/solid";
import {
  removeRestaurant,
  selectRestaurant,
} from "../features/restaurantSlice";
import { useSelector } from "react-redux";
import sanityClient from "../sanity";

import RestaurantCard from "./RestaurantCard";
import { useNavigation } from "@react-navigation/native";

const CategoryColumn = ({ showCategories, setShowCategories }) => {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[_type == 'category' && name == $title] {
            ...,
            restaurants[]-> {
               ...,
               dishes[]->,
                 type-> {
                   name
                 }
             }
          }[0]
        `,
        { title: showCategories.name }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, [showCategories]);

  return (
    <View className="relative">
      <TouchableOpacity
        onPress={() => {
          setShowCategories({ visible: false, name: "" });
        }}
        className="absolute top-10 right-4 bg-white rounded-full w-12 h-12 items-center justify-center z-50"
      >
        <HomeIcon color="#00CCBB" size={30} />
      </TouchableOpacity>
      <ScrollView
        contentContainerStyle={{
          paddingVertical: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* Restaurant Cards */}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant.image}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            address={restaurant.address}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
            full={true}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoryColumn;
