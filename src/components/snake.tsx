import { useOutletContext } from "react-router-dom";
import { ContextType } from "../App";
import { useEffect, useState } from "react";

const Snake = () => {
  const { user } = useOutletContext<ContextType>();
  const [rows, setRows] = useState<number[]>([]);
  const [rowCount, setRowCount] = useState(15);
  const [columns, setColumns] = useState<number[]>([]);
  const [columnCount, setColumnCount] = useState(15);

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

  const initialSnake: Snake = {
    head: {
      column: Math.ceil(columnCount / 2),
      row: Math.ceil(rowCount / 2),
    },
    neck: {
      column: Math.ceil(columnCount / 2) - 1,
      row: Math.ceil(rowCount / 2),
    },
    body: [],
    tail: {
      column: Math.ceil(columnCount / 2) - 2,
      row: Math.ceil(rowCount / 2),
    },
  };

  const [snake, setSnake] = useState<Snake>(initialSnake);

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
  }, [rowCount, rows, columnCount, columns]);

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
                } ${
                  ((snake.head.row === row && snake.head.column === column) ||
                    (snake.neck.row === row && snake.neck.column === column) ||
                    snake.body.find(
                      (part) => part.column === column && part.row === row
                    ) ||
                    (snake.tail.row === row && snake.tail.column === column)) &&
                  "red"
                }`}
              ></div>
            ))}
          </div>
        );
      })}
    </>
  );
};

export default Snake;
