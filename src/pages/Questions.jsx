import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Taste } from "../assets/questions/taste.svg";
import { ReactComponent as Smell } from "../assets/questions/smell.svg";
import { ReactComponent as Hear } from "../assets/questions/hear.svg";
import { ReactComponent as See } from "../assets/questions/see.svg";
import { ReactComponent as BrainKnows } from "../assets/questions/brain-know.svg";
import { ReactComponent as BrainDontKnow } from "../assets/questions/brain-dont-know.svg";
import "./css/question.css";

/**
 * TODO: record responses in state, write api wrapper, post responses to seed
 */

export const Questions = () => {
  const navigate = useNavigate();
  const [questionNumber, setQuestionNumber] = useState(1);
  const MAX_QUESTION_NUMBER = 3;
  return (
    <div className="question-container container">
      <Question
        questionNumber={questionNumber}
        setQuestionNumber={setQuestionNumber}
      />
      <button
        className="button-next"
        onClick={() => {
          if (questionNumber < MAX_QUESTION_NUMBER) {
            setQuestionNumber(questionNumber + 1);
          } else if (questionNumber === MAX_QUESTION_NUMBER) {
            navigate("/bubble-input");
          }
        }}
      >
        Next
      </button>
    </div>
  );
};

export const Question = ({ questionNumber, setQuestionNumber }) => {
  switch (questionNumber) {
    case 1:
      return (
        <div className="question_1">
          <div className="question_1-label" htmlFor="motorwayDistance">
            How far is a road/ motorway from you?
          </div>
          <div className="question_1 input_range">
            <div className="question_1-datalist-helper">
              <Taste />
              <Smell />
              <See />
              <Hear />
              <BrainKnows />
              <BrainDontKnow />
            </div>
            <input
              className="question_1 input"
              name="motorwayDistance"
              id="motorwayDistance"
              type="range"
              min={1}
              max={6}
              step={1}
              required
            />
            <div className="question_1 datalist">
              <div value={1}>Can taste it. It’s right here</div>
              <div value={2}>Can smell it</div>
              <div value={3}>Can see it. I’m not on it </div>
              <div value={4}>Can still hear it</div>
              <div value={5}>Cant hear it. But I know it</div>
              <div value={6}>Dont know where the road is</div>
            </div>
            <div className="question_1-scale">
              <span>
                Very
                <br /> close
              </span>
              <span>
                Very
                <br /> far
              </span>
            </div>
          </div>
        </div>
      );

    case 2:
      return (
        <div className="question_2">
          <div className="question_2 label" htmlFor="feetLocation">
            Where are your feet located?
          </div>
          <div className="question_2 input_range">
            <input
              className="question_2 input"
              name="feetLocation"
              id="feetLocation"
              type="range"
              min={1}
              max={7}
              step={1}
            />
            <div className="question_2 datalist">
              <div value={1}>on mud/ sand </div>
              <div value={2}>on tar</div>
              <div value={3}>on concrete</div>
              <div value={4}>on marble /tiles / flooring</div>
              <div value={5}>On garbage</div>
              <div value={6}>On water</div>
              <div value={7}>On Mars</div>
            </div>
          </div>
        </div>
      );

    case 3:
      return (
        <div className="question_3">
          <div className="question_3 label" htmlFor="structureAge">
            What is the age of structures around you ? (These structures could
            be trees, buildings, flyovers or sand dunes )
          </div>
          <div className="question_3 input_range">
            <input
              className="question_3 input"
              name="structureAge"
              id="structureAge"
              type="range"
              required
              min={1}
              max={8}
              step={1}
            />
            <div className="question_3 datalist">
              <div value={1}>older than 5000 years</div>
              <div value={2}>2000 to 5000 years</div>
              <div value={3}>1000- 2000 years - the age of a tree</div>
              <div value={4}>200- 1000 years</div>
              <div value={5}>50- 200 years</div>
              <div value={6}>20-50 years</div>
              <div value={7}>5-20 years</div>
              <div value={8}>0-5 years</div>
            </div>
          </div>
        </div>
      );
    default:
      console.error("The counter has been exceeded. Please refresh the page.");
  }
};
