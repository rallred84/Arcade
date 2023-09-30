import { Outlet } from "react-router-dom";
import Nav from "./components/nav";
import { useState } from "react";

//Creating a type for our Outlet Context and exporting it. This type can then be imported in any files that are using Outlet Context so that type checking will work correctly on all state that is passed to other files.
export type ContextType = {
  highScore: number;
  setHighScore: React.Dispatch<React.SetStateAction<number>>;
};

export default function App() {
  //Global State
  const [highScore, setHighScore] = useState(40);

  return (
    <>
      <header>
        <h1>Arcade</h1>
      </header>
      <Nav />
      <main>
        <Outlet context={{ highScore, setHighScore } satisfies ContextType} />
      </main>
    </>
  );
}
