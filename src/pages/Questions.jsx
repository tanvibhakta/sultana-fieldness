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
  const MAX_QUESTION_NUMBER = 4;
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
            how wet are you with the sound around you ?
          </div>
          <div>
            <input
              className="question_0 input"
              name="motorwayDistance"
              id="motorwayDistance"
              type="range"
              min={1}
              max={3}
              step={1}
              required
            />
            <div className="question_1-datalist-helper">
              <span>soaked</span>
              <span>damp</span>
              <span>dry</span>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className="question_1">
          <div className="question_1-label" htmlFor="motorwayDistance">
            How far is a road/ motorway from you?
          </div>
          <div className="question_1 input_range">
            <div className="question_1-datalist-helper">
              <span value={1}>1</span>
              <span value={2}>2</span>
              <span value={3}>3</span>
              <span value={4}>4</span>
              <span value={5}>5</span>
              <span value={6}>6</span>
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
            <div className="question_1-datalist-helper">
              <Taste />
              <Smell />
              <See />
              <Hear />
              <BrainKnows />
              <BrainDontKnow />
            </div>
          </div>
          <div className="options">
            <div>1. Can taste it. It’s right here</div>
            <div>2. Can smell it</div>
            <div>3. Can see it. I’m not on it </div>
            <div>4. Can still hear it</div>
            <div>5. Cant hear it. But I know it</div>
            <div>6. Dont know where the road is</div>
          </div>
        </div>
      );

    case 3:
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

    case 4:
      return (
        <div className="question_3">
          <div className="question_3 label" htmlFor="structureAge">
            What is the age of structures around you ? (These structures could
            be trees, buildings, flyovers or sand dunes )
          </div>
          <div className="question_3">
            <div className="question_3 datalist">
              <div>
                <input
                  type="checkbox"
                  id="olderThan5000"
                  name="olderThan5000"
                />
                <label htmlFor="olderThan5000">older than 5000 years</label>
              </div>
              <div>
                <input type="checkbox" id="2000to5000" name="2000to5000" />
                <label htmlFor="2000to5000">2000 to 5000 years</label>
              </div>
              <div>
                <input type="checkbox" id="ageOfTree" name="ageOfTree" />
                <label htmlFor="ageOfTree">
                  1000- 2000 years - the age of a tree
                </label>
              </div>
              <div>
                <input type="checkbox" id="200to1000" name="200to1000" />
                <label htmlFor="200to1000">200- 1000 years</label>
              </div>
              <div>
                <input type="checkbox" id="50to200" name="50to200" />
                <label htmlFor="50to200">50- 200 years</label>
              </div>
              <div>
                <input type="checkbox" id="20to50" name="20to50" />
                <label htmlFor="20to50">20-50 years</label>
              </div>
              <div>
                <input type="checkbox" id="5to20" name="5to20" />
                <label htmlFor="5to20">5-20 years</label>
              </div>
              <div>
                <input type="checkbox" id="0to5" name="0to5" />
                <label htmlFor="0to5">0-5 years</label>
              </div>
            </div>
          </div>
        </div>
      );
    default:
      console.error("The counter has been exceeded. Please refresh the page.");
  }
};
