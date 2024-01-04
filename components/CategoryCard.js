import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

const CategoryCard = ({ imgUrl, title, setShowCategories }) => {
  return (
    <TouchableOpacity
      className="mr-2 relative"
      onPress={() => {
        setShowCategories({ visible: true, name: title });
      }}
    >
      <Image
        source={{
          uri: imgUrl,
        }}
        className="h-20 w-20 rounded"
      />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
