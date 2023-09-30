import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <div onClick={() => navigate("/")}>Home</div>
      <div onClick={() => navigate("/snake")}>Snake</div>
      <div onClick={() => navigate("/tic-tac-toe")}>Tic Tac Toe</div>
      <div onClick={() => navigate("/connect-4")}>Connect 4</div>
    </nav>
  );
};

export default Nav;
