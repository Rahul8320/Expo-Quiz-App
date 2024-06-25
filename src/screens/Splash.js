import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import tw from "twrnc";

const SplashScreen = ({ navigation }) => {
  return (
    <View style={tw`flex-1 items-center`}>
      <Image
        source={require("../../assets/images/splash.jpg")}
        style={tw.style(tw`h-3/6 mx-1 rounded-xl`, { aspectRatio: 1 })}
      />

      <Text style={tw`text-2xl text-center font-semibold my-5`}>
        Instructions
      </Text>
      <View
        style={tw`bg-purple-600 m-2 p-3 rounded-md h-30 w-80 items-center justify-center`}
      >
        <Text style={tw`text-white text-lg`}>Each quiz has Four Options</Text>
        <Text style={tw`text-white text-lg my-1`}>
          Progress will be shown at Top
        </Text>
        <Text style={tw`text-white text-lg`}>
          Score would be shown at the End
        </Text>
      </View>

      <Pressable
        style={tw`bg-purple-600 mt-10 px-8 py-2 rounded-md shadow-md`}
        onPress={() => navigation.navigate("Question")}
      >
        <Text style={tw`text-white text-lg font-medium`}>Start</Text>
      </Pressable>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
