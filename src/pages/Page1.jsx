import { Link } from "react-router-dom";

export const Page1 = () => {
  return (
    <main className="container">
      <div>
        Here is a page
        <Link to="/question">Every Journey Needs a Path</Link>
      </div>
    </main>
  );
};
