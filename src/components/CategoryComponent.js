import { useContext } from "react";
import { TouchableOpacity, Text } from "react-native";
import tw from "twrnc";
import { AppContext } from "../context/AppContext";

const CategoryComponent = ({ category, navigation }) => {
  const { setScore } = useContext(AppContext);

  const handleSubmit = () => {
    setScore(0);
    navigation.navigate("Question", { categoryId: category.id });
  };

  return (
    <TouchableOpacity
      onPress={handleSubmit}
      style={tw`bg-slate-600 px-3 m-3 w-42 h-20 items-center justify-center rounded-full`}
    >
      <Text style={tw`font-medium text-lg text-white`}>{category.name}</Text>
    </TouchableOpacity>
  );
};

export default CategoryComponent;
