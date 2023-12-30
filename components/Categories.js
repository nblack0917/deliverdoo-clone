import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import CategoryCard from "./CategoryCard";
import sanityClient, { urlFor } from "../sanity";

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[_type == 'category']
  `
      )
      .then((data) => setCategories(data));
  }, []);

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
    >
      {/* Category Card */}

      {categories?.map((category) => (
        <CategoryCard
          key={category._id}
          imgUrl={urlFor(category.image).width(200).url()}
          title={category.name}
        />
      ))}

      {/* <CategoryCard
        imgUrl="https://links.papareact.com/gn7"
        title="testing 2"
      />
      <CategoryCard
        imgUrl="https://links.papareact.com/gn7"
        title="testing 3"
      />
      <CategoryCard
        imgUrl="https://links.papareact.com/gn7"
        title="testing 3"
      />
      <CategoryCard
        imgUrl="https://links.papareact.com/gn7"
        title="testing 3"
      />
      <CategoryCard
        imgUrl="https://links.papareact.com/gn7"
        title="testing 3"
      /> */}
      {/* <Text>Categories</Text> */}
    </ScrollView>
  );
};

export default Categories;
