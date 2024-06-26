import { View, ScrollView } from "react-native";
import tw from "twrnc";
import { categories } from "../config/category";
import CategoryComponent from "../components/CategoryComponent";

const CategoryScreen = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={tw`flex-row flex-wrap`}>
      {categories.map((category, index) => (
        <CategoryComponent
          key={index}
          category={category}
          navigation={navigation}
        />
      ))}
    </ScrollView>
  );
};

export default CategoryScreen;
