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
 * TODO:
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
        <button
          onChange={() => {
            setQuestionNumber(questionNumber + 1);
          }}
        >
          Next
        </button>
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
          <div className="question_1-label" htmlFor="motorwayDistance">
            How far is a road/ motorway from you?
          </div>
          <div className="question_1-input_range">
            <div className="question_1-datalist-helper">
              <Taste />
              <Smell />
              <See />
              <Hear />
              <BrainKnows />
              <BrainDontKnow />
            </div>
            <input
              className="question_1-input"
              name="motorwayDistance"
              id="motorwayDistance"
              type="range"
              min={1}
              max={6}
              step={1}
              required
            />
            <div className="question_1-datalist">
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
          <datalist>
            <option value={1}>on mud/ sand </option>
            <option value={2}>on tar</option>
            <option value={3}>on concrete</option>
            <option value={4}>on marble /tiles / flooring</option>
            <option value={5}>On garbage</option>
            <option value={6}>On water</option>
            <option value={7}>On Mars</option>
          </datalist>
        </div>
      );

    case 3:
      return (
        <div className="question_3">
          <label className="question_3-label" htmlFor="structureAge">
            What is the age of structures around you ? (These structures could
            be trees, buildings, flyovers or sand dunes )
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
          <datalist>
            <option value={1}>older than 5000 years</option>
            <option value={2}>2000 to 5000 years</option>
            <option value={3}>1000- 2000 years - the age of a tree</option>
            <option value={4}>200- 1000 years</option>
            <option value={5}>50- 200 years</option>
            <option value={6}>20-50 years</option>
            <option value={7}>5-20 years</option>
            <option value={8}>0-5 years</option>
          </datalist>
        </div>
      );
  }
};
