import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/question.css";

/**
 * TODO:
 *  - Add input options
 *  - style input options
 *  - position the elements perfectly
 */

export const Questions = () => {
  const [questionNumber, setQuestionNumber] = useState(1);
  return (
    <div className="question-container container">
      <form>
        <Question
          questionNumber={questionNumber}
          setQuestionNumber={setQuestionNumber}
        />
      </form>
    </div>
  );
};

export const Question = ({ questionNumber, setQuestionNumber }) => {
  const navigate = useNavigate();

  switch (questionNumber) {
    case 1:
      return (
        <div className="question_1">
          <label className="question_1-label" htmlFor="motorwayDistance">
            How far is a road/ motorway from you?
          </label>
          <input
            className="question_1-input"
            name="motorwayDistance"
            id="motorwayDistance"
            type="range"
            onChange={() => {
              setQuestionNumber(questionNumber + 1);
            }}
            required
          />
        </div>
      );

    case 2:
      return (
        <div className="question_2">
          <label className="question_2-label" htmlFor="feetLocation">
            Where are your feet located?
          </label>
          <input
            className="question_2-input"
            name="feetLocation"
            id="feetLocation"
            type="range"
            onChange={() => {
              setQuestionNumber(questionNumber + 1);
            }}
            required
          />
        </div>
      );

    case 3:
      return (
        <div className="question_3">
          <label className="question_3-label" htmlFor="structureAge">
            Where are your feet located?
          </label>
          <input
            className="question_3-input"
            name="structureAge"
            id="structureAge"
            type="range"
            onChange={() => {
              navigate("/bubble-input");
            }}
            required
          />
        </div>
      );
  }
};
