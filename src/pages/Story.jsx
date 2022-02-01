import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Path } from "../assets/path.svg";
import { ReactComponent as Ladybird } from "../assets/ladybird.svg";
import { ReactComponent as Spider } from "../assets/spider.svg";
import "./css/story.css";
import floaters from "../assets/floaters.png";
import floaters2x from "../assets/floaters@2x.png";
import floaters3x from "../assets/floaters@3x.png";
import floatersBackground from "../assets/floaters.png";

export const Story = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const MAX_PAGE_NUMBER = 9;
  return (
    <main
      className="container story-container"
      onClick={() => {
        if (pageNumber < MAX_PAGE_NUMBER) {
          setPageNumber(pageNumber + 1);
        } else if (pageNumber === MAX_PAGE_NUMBER) {
          navigate("/question");
        }
      }}
    >
      <StoryPages pageNumber={pageNumber} setPageNumber={setPageNumber} />
      {/*TODO: This doesn't work right now. Why not, even though it's on top in terms on z-index?*/}
      <button
        className="back_button"
        onClick={() => {
          if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
          }
        }}
      >
        {"<<<"}
      </button>
    </main>
  );
};

const StoryPages = ({ pageNumber }) => {
  switch (pageNumber) {
    case 1:
      return (
        <div className="story_page_1">
          <Ladybird id="ladybird" />
          <Path />
          <p>Every jouney needs a path</p>
        </div>
      );

    case 2:
      return (
        <div className="story_page_2">
          <Path id="path" />
          <p>
            There is always a path. Some paths are easier - like roads. Others,
            like mountain paths are slightly more difficult to find.{" "}
          </p>
          <div>
            <p>But each path has its own story </p>
            <p>Each path carries knowledge</p>
            <p>Each path requires a knowledge to pass through it </p>
          </div>
          <Spider id="spider" />
        </div>
      );

    case 3:
      return (
        <div className="story_page_3">
          <p>
            You came here, to this screen either by simply by clicking next, or
            you explored on the previous screens.
          </p>
          <div>
            <p>Exploring new territory is in the nature of every being.</p>
            <p>
              Without the possibility of exploration, most beings either die or
              go insane. Both being ways of leaving behind the limitation of the
              situation
            </p>
          </div>
        </div>
      );

    case 4:
      return <div className="story_page_4"></div>;

    case 5:
      return (
        <div className="story_page_5">
          <div>*blink*</div>
        </div>
      );

    case 6:
      return (
        <div className="story_page_6">
          Pause where you are, take a look at your hand holding this device,
          look at your body look up and blink.
        </div>
      );

    case 7:
      return (
        <div className="story_page_7">
          <img
            srcSet={`${floaters}, ${floaters2x} 2x, ${floaters3x} 3x`}
            src={floaters}
            alt="floaters"
          />
        </div>
      );

    case 8:
      return (
        <div className="story_page_7">
          <img
            srcSet={`${floaters}, ${floaters2x} 2x, ${floaters3x} 3x`}
            src={floaters}
            alt="floaters"
          />
        </div>
      );

    case 9:
      return (
        <div
          className="story_page_9"
          style={{ backgroundImage: `url(${floatersBackground})` }}
          // style={{ backgroundImage: `url(${floatersBackground3x}), url(${floatersBackground2x}), url(${floatersBackground})` }}
        >
          <p>
            These floaters are an artefact created by the interface between a
            being and the enviormnet
          </p>
          <p>
            if you look at the sky or a bright wall right there, those wrigly
            and alive looking things are not ‘real’. They exist only in our mind
            or body or somewhere in the middle
          </p>
          <p>What artefacts must bats hear?</p>
        </div>
      );

    default:
      console.error("There's been an issue with page numbers");
  }
};
