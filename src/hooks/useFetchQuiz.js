import { useState, useEffect } from "react";
import { ApiConfig } from "../config/apiConfig";
import { shuffleQuizAnswer } from "../utils/shuffleQuizAns";

const useFetchQuiz = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(ApiConfig.QuizApiUrl);
      const result = await response.json();

      const quizData = [];

      result?.results.forEach((item, index) => {
        let quiz = {
          id: index,
          question: item.question,
          options: item.incorrect_answers,
          correctAnswer: item.correct_answer,
          category: item.category,
          difficulty: item.difficulty,
        };
        quiz.options.push(item.correct_answer);
        quiz.options = shuffleQuizAnswer(quiz.options);
        quizData.push(quiz);
      });

      setData(quizData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return { data, error, loading };
};

export default useFetchQuiz;
