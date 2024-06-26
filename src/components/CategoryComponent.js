import { TouchableOpacity, Text } from "react-native";
import tw from "twrnc";

const CategoryComponent = ({ category, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Question", { categoryId: category.id })
      }
      style={tw`bg-slate-600 px-3 m-3 w-42 h-20 items-center justify-center rounded-full`}
    >
      <Text style={tw`font-medium text-lg text-white`}>{category.name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryComponent;
