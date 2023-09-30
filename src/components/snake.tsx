import { useOutletContext } from "react-router-dom";
import { ContextType } from "../App";

const Snake = () => {
  const { highScore } = useOutletContext<ContextType>();

  return (
    <>
      <div>High Score is {highScore}</div>
    </>
  );
};

export default Snake;
