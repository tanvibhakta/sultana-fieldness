import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./css/story.css";

export const Story = () => {
  const navigate = useNavigate();
  const [pageNumber, setPageNumber] = useState(1);
  const MAX_PAGE_NUMBER = 6;
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
          <p>Every Journey Needs a Path</p>
        </div>
      );

    case 2:
      return (
        <div className="story_page_2">
          <p>
            There is always a path. Some paths are easier - like roads. Others,
            like mountain paths are slightly more difficult to find.{" "}
          </p>
          <div>
            <p>But each path has its own story </p>
            <p>Each path carries knowledge</p>
            <p>Each path requires a knowledge to pass through it </p>
          </div>
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
    default:
      console.error("There's been an issue with page numbers");
  }
};
