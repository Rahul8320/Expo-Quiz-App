import { useContext } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import tw from "twrnc";
import { AppContext } from "../context/AppContext";

const ScoreScreen = ({ navigation }) => {
  const { score } = useContext(AppContext);

  return (
    <View style={tw`flex-1 items-center`}>
      <Image
        source={require("../../assets/images/score.png")}
        style={tw.style(tw`h-1/2 mx-auto rounded-lg`, {
          aspectRatio: 1,
        })}
      />

      {score !== 0 && (
        <Text style={tw`text-2xl my-5 font-medium text-slate-700`}>
          Congratulations!!
        </Text>
      )}

      <Text style={tw`text-lg ${score === 0 ? "my-5" : "m-0"}`}>
        You scored {score} points
      </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("Splash")}
        style={tw`bg-purple-600 mt-8 px-12 py-3 rounded-md shadow-md`}
      >
        <Text style={tw`text-white text-lg font-medium`}>Play Again</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ScoreScreen;
