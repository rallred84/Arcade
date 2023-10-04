import { Outlet } from "react-router-dom";
import Nav from "./components/nav";
import { useState } from "react";

//Creating a type for our Outlet Context and exporting it. This type can then be imported in any files that are using Outlet Context so that type checking will work correctly on all state that is passed to other files.
export type ContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
  dummyUser: User;
};

export type User = {
  id: number;
  name: string;
  username: string;
};

const dummyUser: User = {
  id: 12,
  name: "Robert Allred",
  username: "red84",
};

export default function App() {
  //Global State
  const [user, setUser] = useState(dummyUser);

  return (
    <>
      <header>
        <h1>Arcade</h1>
      </header>
      <Nav />
      <main>
        <Outlet context={{ user, setUser, dummyUser } satisfies ContextType} />
      </main>
    </>
  );
}
