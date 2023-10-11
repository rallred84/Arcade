import { useOutletContext } from "react-router-dom";
import { ContextType } from "../App";
import { useEffect, useMemo, useState } from "react";
import SnakeHeadImg from "../assets/images/snakehead.png";
import SnakeBodyImg from "../assets/images/snakebody.png";
import SnakeTurnImg from "../assets/images/snaketurn.png";
import SnakeTailImg from "../assets/images/snaketail.png";

const Snake = () => {
  const { user } = useOutletContext<ContextType>();
  const [rows, setRows] = useState<number[]>([]);
  const [rowCount, setRowCount] = useState(15);
  const [columns, setColumns] = useState<number[]>([]);
  const [columnCount, setColumnCount] = useState(15);

  enum SnakeDirection {
    up = "up",
    down = "down",
    left = "left",
    right = "right",
  }

  const [snakeDirection, setSnakeDirection] = useState("right");

  type SnakePart = {
    row: number;
    column: number;
    img?: string;
    direction?: string;
  };

  type Snake = {
    head: SnakePart;
    neck: SnakePart;
    body: SnakePart[];
    tail: SnakePart;
  };

  //Functions
  const displaySnake = (
    row: number,
    column: number
  ): JSX.Element | undefined => {
    let source: string | undefined;
    let direction: string | undefined;
    if (snake.head.row === row && snake.head.column === column) {
      source = snake.head.img;
      direction = snake.head.direction;
    }
    if (snake.neck.row === row && snake.neck.column === column) {
      source = snake.neck.img;
      direction = snake.neck.direction;
    }
    if (snake.tail.row === row && snake.tail.column === column) {
      source = snake.tail.img;
      direction = snake.tail.direction;
    }
    const bodyMatch = snake.body.find(
      (part) => part.column === column && part.row === row
    );
    if (bodyMatch) {
      source = bodyMatch.img;
      direction = bodyMatch.direction;
    }
    if (source) return <img src={source} alt="" className={direction} />;
  };

  const moveSnakeOne = (snake: Snake): void => {
    //Set New Head
    const newHead: SnakePart = { ...snake.head };
    newHead.direction = snakeDirection;
    if (snakeDirection === SnakeDirection.up) newHead.row -= 1;
    if (snakeDirection === SnakeDirection.down) newHead.row += 1;
    if (snakeDirection === SnakeDirection.right) newHead.column += 1;
    if (snakeDirection === SnakeDirection.left) newHead.column -= 1;
    //Set New Neck
    const newNeck: SnakePart = { ...snake.head };
    if (
      newHead.column !== snake.neck.column &&
      newHead.row !== snake.neck.row
    ) {
      newNeck.img = SnakeTurnImg;
      if (
        (newHead.direction === SnakeDirection.up &&
          newHead.column > snake.neck.column) ||
        (newHead.direction === SnakeDirection.left &&
          newHead.row > snake.neck.row)
      )
        newNeck.direction = SnakeDirection.up;
      if (
        (newHead.direction === SnakeDirection.left &&
          newHead.row < snake.neck.row) ||
        (newHead.direction === SnakeDirection.down &&
          newHead.column > snake.neck.column)
      )
        newNeck.direction = SnakeDirection.left;
      if (
        (newHead.direction === SnakeDirection.down &&
          newHead.column < snake.neck.column) ||
        (newHead.direction === SnakeDirection.right &&
          newHead.row < snake.neck.row)
      )
        newNeck.direction = SnakeDirection.down;
      if (
        (newHead.direction === SnakeDirection.right &&
          newHead.row > snake.neck.row) ||
        (newHead.direction === SnakeDirection.up &&
          newHead.column < snake.neck.column)
      )
        newNeck.direction = SnakeDirection.right;
    } else newNeck.img = SnakeBodyImg;

    //Set New Body
    const newBody: SnakePart[] = [...snake.body];
    newBody.push({ ...snake.neck });
    newBody.shift();
    //Set New Tail
    const newTail: SnakePart = { ...snake.body[0] };
    newTail.img = SnakeTailImg;
    if (newTail.row < newBody[0].row) newTail.direction = SnakeDirection.down;
    if (newTail.row > newBody[0].row) newTail.direction = SnakeDirection.up;
    if (newTail.column < newBody[0].column)
      newTail.direction = SnakeDirection.right;
    if (newTail.column > newBody[0].column)
      newTail.direction = SnakeDirection.left;
    //Set New Snake
    const newSnake: Snake = {
      head: newHead,
      neck: newNeck,
      body: newBody,
      tail: newTail,
    };
    setSnake(newSnake);
  };

  const initialSnake: Snake = useMemo(() => {
    return {
      head: {
        column: Math.ceil(columnCount / 2),
        row: Math.ceil(rowCount / 2),
        img: SnakeHeadImg,
        direction: "right",
      },
      neck: {
        column: Math.ceil(columnCount / 2) - 1,
        row: Math.ceil(rowCount / 2),
        img: SnakeBodyImg,
        direction: "right",
      },
      body: [
        {
          column: Math.ceil(columnCount / 2) - 2,
          row: Math.ceil(rowCount / 2),
          img: SnakeBodyImg,
          direction: "right",
        },
      ],
      tail: {
        column: Math.ceil(columnCount / 2) - 3,
        row: Math.ceil(rowCount / 2),
        img: SnakeTailImg,
        direction: "right",
      },
    };
  }, [columnCount, rowCount]);

  const [snake, setSnake] = useState<Snake>(initialSnake);

  //Create Event Listener for Keyboard inputs
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.code === "ArrowUp") {
        setSnakeDirection(SnakeDirection.up);
      }
      if (e.code === "ArrowRight") {
        setSnakeDirection(SnakeDirection.right);
      }
      if (e.code === "ArrowLeft") {
        setSnakeDirection(SnakeDirection.left);
      }
      if (e.code === "ArrowDown") {
        setSnakeDirection(SnakeDirection.down);
      }
    });
  }, [SnakeDirection]);

  useEffect(() => {
    if (rows.length !== rowCount) {
      const rowArray: number[] = [];
      for (let i = 0; i < rowCount; i++) {
        rowArray.push(i + 1);
      }
      console.log(rowArray);
      setRows(rowArray);
    }
    if (columns.length !== columnCount) {
      const columnArray: number[] = [];
      for (let i = 0; i < columnCount; i++) {
        columnArray.push(i + 1);
      }
      console.log(columnArray);
      setColumns(columnArray);
    }

    setSnake(initialSnake);
  }, [rowCount, rows, columnCount, columns, initialSnake]);

  return (
    <>
      <h2>Welcome to Snake, {user.username}!</h2>
      <select name="rows" onChange={(e) => setRowCount(Number(e.target.value))}>
        <optgroup label="Choose Rows">
          <option value={15}>15</option>
          <option value={25}>25</option>
        </optgroup>
      </select>
      <select
        name="columns"
        onChange={(e) => setColumnCount(Number(e.target.value))}
      >
        <optgroup label="Choose Columns">
          <option value={15}>15</option>
          <option value={25}>25</option>
        </optgroup>
      </select>
      <button onClick={() => moveSnakeOne(snake)}>Move One Space</button>

      {rows.map((row, i) => {
        return (
          <div key={i} className="row">
            {columns.map((column, k) => (
              <div
                key={k}
                data-row-column={`${row}-${column}`}
                className={`cell ${
                  i % 2 === 0
                    ? k % 2 === 0
                      ? "yellow"
                      : "blue"
                    : k % 2 === 0
                    ? "blue"
                    : "yellow"
                }`}
              >
                {displaySnake(row, column)}
              </div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default Snake;
