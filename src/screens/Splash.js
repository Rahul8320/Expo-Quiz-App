import { Image, Text, TouchableOpacity, View } from "react-native";
import tw from "twrnc";

const SplashScreen = ({ navigation }) => {
  return (
    <View style={tw`flex-1 items-center`}>
      <Image
        source={require("../../assets/images/splash.jpg")}
        style={tw.style(tw`h-1/2 mx-auto rounded-xl`, { aspectRatio: 1 })}
      />

      <Text style={tw`text-2xl text-center font-semibold my-5`}>
        Instructions
      </Text>
      <View
        style={tw`bg-purple-500 m-2 p-3 rounded-md h-30 w-80 items-center justify-center`}
      >
        <Text style={tw`text-white text-lg`}>Each quiz has Four Options</Text>
        <Text style={tw`text-white text-lg my-1`}>
          Progress will be shown at Top
        </Text>
        <Text style={tw`text-white text-lg`}>
          Score would be shown at the End
        </Text>
      </View>

      <TouchableOpacity
        style={tw`bg-purple-600 mt-10 px-12 py-3 rounded-md shadow-md`}
        onPress={() => navigation.navigate("Question")}
      >
        <Text style={tw`text-white text-lg font-medium`}>Start</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SplashScreen;
