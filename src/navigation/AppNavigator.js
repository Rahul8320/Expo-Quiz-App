import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "../screens/Splash";
import QuestionsScreen from "../screens/Questions";
import ScoreScreen from "../screens/Score";
import { TouchableOpacity, Text } from "react-native";
import { AppContext } from "../context/AppContext";
import { useState } from "react";

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const [score, setScore] = useState(0);

  return (
    <AppContext.Provider value={{ score, setScore }}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{ contentStyle: { backgroundColor: "white" } }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen
            name="Question"
            component={QuestionsScreen}
            options={({ navigation }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => navigation.navigate("Score")}
                  style={{ marginRight: 15 }}
                >
                  <Text style={{ color: "blue", fontSize: 16 }}>Submit</Text>
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            name="Score"
            component={ScoreScreen}
            options={() => ({
              headerLeft: () => null, // Hides the back button
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
};

export default AppNavigator;
