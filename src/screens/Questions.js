import { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { reactQuestions } from "../config/questions";
import tw from "twrnc";
import * as Progress from "react-native-progress";

const QuestionsScreen = ({ navigation }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isLastQuestion, setIsLastQuestion] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [quizProgress, setQuizProgress] = useState(0);

  const handleNextQuestion = () => {
    if (reactQuestions.length - 1 > currentQuestionIndex) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsCorrectAnswer(false);
    } else {
      navigation.navigate("Score", { score });
    }
  };

  const handleSubmitAnswer = (option) => {
    setSelectedOption(option);

    if (option === reactQuestions[currentQuestionIndex].correctAnswer) {
      setIsCorrectAnswer(true);
      setScore((prev) => prev + 10);
    } else {
      setIsCorrectAnswer(false);
    }
  };

  useEffect(() => {
    if (currentQuestionIndex === reactQuestions.length - 1) {
      setIsLastQuestion(true);
    }

    const progress = (currentQuestionIndex + 1) / reactQuestions.length;
    setQuizProgress(progress);
  }, [currentQuestionIndex]);

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
        {reactQuestions[currentQuestionIndex].question}
      </Text>
      {reactQuestions[currentQuestionIndex].options.map((option, index) => (
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
            {option}
          </Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={handleNextQuestion}
        style={tw`bg-purple-600 mt-10 p-4 rounded-md shadow-md`}
      >
        <Text style={tw`text-white text-xl text-center font-bold`}>
          {isLastQuestion ? "Finish" : "Next"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default QuestionsScreen;
