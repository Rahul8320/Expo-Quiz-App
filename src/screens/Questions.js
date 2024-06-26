import { useContext, useEffect, useState } from "react";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import tw from "twrnc";
import * as Progress from "react-native-progress";
import { AppContext } from "../context/AppContext";
import useFetchQuiz from "../hooks/useFetchQuiz";
import he from "he";

const QuestionsScreen = ({ navigation, route }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [quizProgress, setQuizProgress] = useState(0.1);
  const { setScore } = useContext(AppContext);

  const { categoryId } = route.params;

  const { data, error, loading } = useFetchQuiz(categoryId);

  const handleNextQuestion = () => {
    if (data?.length - 1 > currentQuestionIndex) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsCorrectAnswer(false);
    } else {
      navigation.navigate("Score");
    }
  };

  const handleSubmitAnswer = (option) => {
    setSelectedOption(option);

    if (option === data[currentQuestionIndex]?.correctAnswer) {
      setIsCorrectAnswer(true);
      setScore((prev) => prev + 10);
    } else {
      setIsCorrectAnswer(false);
    }
  };

  useEffect(() => {
    if (currentQuestionIndex === data?.length - 1) {
      setIsLastQuestion(true);
    }

    if (data?.length > 0) {
      const progress = (currentQuestionIndex + 1) / data?.length;
      setQuizProgress(progress);
    }
  }, [currentQuestionIndex]);

  if (loading) {
    return (
      <View style={tw`flex-1 justify-center items-center`}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={tw`flex-1 justify-center items-center mx-5`}>
        <Text style={tw`text-2xl text-red-500 font-medium`}>
          Error: {error}
        </Text>
      </View>
    );
  }

  return (
    <View style={tw`mt-2 p-4`}>
      <View style={`flex-1`}>
        <Progress.Bar
          progress={quizProgress}
          width={null}
          height={7}
          color={"#b814e5"}
        />
      </View>
      <Text style={tw`text-2xl font-medium text-center my-5`}>
        {he.decode(data[currentQuestionIndex]?.question)}
      </Text>
      <View style={tw`flex-row justify-around mb-2`}>
        <Text style={tw`bg-slate-200 rounded-full text-sm py-1 px-2`}>
          {he.decode(data[currentQuestionIndex]?.category)}
        </Text>
        <Text style={tw`bg-slate-200 rounded-full text-sm py-1 px-2`}>
          {data[currentQuestionIndex]?.difficulty}
        </Text>
      </View>
      {data[currentQuestionIndex]?.options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={tw`border-2 p-4 my-2 rounded-md ${
            selectedOption && "border-purple-300 bg-gray-200/60"
          } ${
            selectedOption === option
              ? isCorrectAnswer
                ? "bg-green-400 border-green-600"
                : "bg-red-400 border-red-600"
              : "border-purple-400"
          }`}
          disabled={selectedOption !== null}
          onPress={() => handleSubmitAnswer(option)}
        >
          <Text
            style={tw`text-lg ${
              selectedOption !== null
                ? selectedOption === option
                  ? "text-black"
                  : "text-gray-500/80"
                : ""
            }`}
          >
            {he.decode(option)}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={handleNextQuestion}
        style={tw`bg-purple-600 mt-5 p-4 rounded-md shadow-md`}
      >
        <Text style={tw`text-white text-xl text-center font-bold`}>
          {isLastQuestion ? "Finish" : "Next"}
        </Text>
      </TouchableOpacity>

      {selectedOption && !isCorrectAnswer && (
        <View style={tw`bg-gray-200 p-3 mt-5 rounded-md`}>
          <Text style={tw`text-lg`}>
            Correct Answer:{" "}
            {he.decode(data[currentQuestionIndex]?.correctAnswer)}
          </Text>
        </View>
      )}
    </View>
  );
};

export default QuestionsScreen;
