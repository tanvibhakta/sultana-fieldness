import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Taste } from "../assets/questions/taste.svg";
import { ReactComponent as Smell } from "../assets/questions/smell.svg";
import { ReactComponent as Hear } from "../assets/questions/hear.svg";
import { ReactComponent as See } from "../assets/questions/see.svg";
import { ReactComponent as BrainKnows } from "../assets/questions/brain-know.svg";
import { ReactComponent as BrainDontKnow } from "../assets/questions/brain-dont-know.svg";
import "./css/question.css";
import { useStickyState } from "../lib/useStickyState";

/**
 * TODO: record responses in state, write api wrapper, post responses to seed
 */

export const Questions = () => {
  const navigate = useNavigate();
  const [questionNumber, setQuestionNumber] = useState(0);
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

export const Question = ({ questionNumber }) => {
  const [answers, setAnswers] = useStickyState(
    {
      ageOfStructures: [],
      distanceFromMotorway: null,
      locationOfFeet: null,
      wetnessOfSound: null,
    },
    "answers"
  );

  const handleCheckboxChange = (e) => {
    let ans = answers.ageOfStructures;
    if (e.target.checked) {
      ans.push(e.target.value);
    } else {
      if (ans.includes(e.target.value)) {
        ans = ans.filter((item) => item !== e.target.value);
      }
    }
    setAnswers({ ...answers, ageOfStructures: ans });
  };

  switch (questionNumber) {
    case 0:
      return (
        <div className="question_beginning">
          Close your eyes and listen to the sounds around you...
        </div>
      );
    case 1:
      return (
        <div className="question_1">
          <div className="question_1-label" htmlFor="wetSound">
            how wet are you with the sound around you ?
          </div>
          <div className="question_0 set">
            <input
              className="question_0 input"
              name="wetSound"
              id="wetSound"
              type="range"
              onChange={(e) => {
                console.log("selected", e.target.value);
                setAnswers({ ...answers, wetnessOfSound: e.target.value });
              }}
              min={1}
              max={3}
              step={1}
              required
            />
            <div className="question_1-datalist-helper">
              <span>dry</span>
              <span>damp</span>
              <span>soaked</span>
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
          <div>
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
              onChange={(e) => {
                console.log("selected", e.target.value);
                setAnswers({
                  ...answers,
                  distanceFromMotorway: e.target.value,
                });
              }}
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
            <div>3. Can see it. I’m not on it</div>
            <div>4. Can still hear it</div>
            <div>5. Cant hear it, but I know of it</div>
            <div>6. Don't know where the road is</div>
          </div>
        </div>
      );
    case 3:
      return (
        <div className="question_1">
          <div className="question_2 label" htmlFor="feetLocation">
            My feet is located on...
          </div>
          <div className="question_2 input_range">
            <div className="question_1-datalist-helper">
              <span value={1}>1</span>
              <span value={2}>2</span>
              <span value={3}>3</span>
              <span value={4}>4</span>
              <span value={5}>5</span>
              <span value={6}>6</span>
              <span value={7}>7</span>
            </div>
            <input
              className="question_2 input"
              name="feetLocation"
              id="feetLocation"
              type="range"
              min={1}
              max={7}
              onChange={(e) => {
                console.log("selected", e.target.value);
                setAnswers({
                  ...answers,
                  locationOfFeet: e.target.value,
                });
              }}
              step={1}
            />
          </div>
          <div className="question_2 options">
            <div>1. mud/soil/ sand </div>
            <div>2. tar</div>
            <div>3. concrete</div>
            <div>4. tiles/flooring/processed stone</div>
            <div>5. garbage</div>
            <div>6. water</div>
            <div>7. Mars</div>
          </div>
        </div>
      );
    case 4:
      return (
        <div className="question_3">
          <div className="question_3 label" htmlFor="structureAge">
            The age of structures around me is .. ( these structures could be
            mountains, oceans, rocks, dunes, trees, buildings, bridges etc.)
          </div>
          <div className="question_3">
            <div className="question_3 datalist">
              <div>
                {/* TODO: record the default value of the answer as a value in state - so init state
                with default value, or use trigger that's broader than onChange*/}
                <input
                  type="checkbox"
                  id="olderThan5000"
                  name="olderThan5000"
                  value="olderThan5000"
                  onChange={(e) => handleCheckboxChange(e)}
                />
                <label htmlFor="olderThan5000">older than 5000 years</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="2000to5000"
                  name="2000to5000"
                  value="2000to5000"
                  onChange={(e) => handleCheckboxChange(e)}
                />
                <label htmlFor="2000to5000">2000 to 5000 years</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="ageOfTree"
                  name="ageOfTree"
                  value="ageOfTree"
                  onChange={(e) => handleCheckboxChange(e)}
                />
                <label htmlFor="ageOfTree">
                  1000- 2000 years - the age of a tree
                </label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="200to1000"
                  name="200to1000"
                  value="200to1000"
                  onChange={(e) => handleCheckboxChange(e)}
                />
                <label htmlFor="200to1000">200- 1000 years</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="50to200"
                  name="50to200"
                  value="50to200"
                  onChange={(e) => handleCheckboxChange(e)}
                />
                <label htmlFor="50to200">50- 200 years</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="20to50"
                  name="20to50"
                  value="20to50"
                  onChange={(e) => handleCheckboxChange(e)}
                />
                <label htmlFor="20to50">20-50 years</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="5to20"
                  name="5to20"
                  value="5to20"
                  onChange={(e) => handleCheckboxChange(e)}
                />
                <label htmlFor="5to20">5-20 years</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="0to5"
                  name="0to5"
                  value="0to5"
                  onChange={(e) => handleCheckboxChange(e)}
                />
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
