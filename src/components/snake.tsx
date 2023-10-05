import { useOutletContext } from "react-router-dom";
import { ContextType } from "../App";
import { useEffect, useState } from "react";

const Snake = () => {
  const { user } = useOutletContext<ContextType>();
  const [rows, setRows] = useState<string[]>([]);
  const [rowCount, setRowCount] = useState(15);
  const [columns, setColumns] = useState<string[]>([]);
  const [columnCount, setColumnCount] = useState(15);

  type Snake = {
    head: string;
    body: string[];
    tail: string;
  };

  const [snake, setSnake] = useState<Snake>({ head: "", body: [""], tail: "" });

  useEffect(() => {
    if (rows.length !== rowCount) {
      const rowArray: string[] = [];
      for (let i = 0; i < rowCount; i++) {
        rowArray.push(`Row ${i + 1}`);
      }
      console.log(rowArray);
      setRows(rowArray);
    }
    if (columns.length !== columnCount) {
      const columnArray: string[] = [];
      for (let i = 0; i < columnCount; i++) {
        columnArray.push(`Column ${i + 1}`);
      }
      console.log(columnArray);
      setColumns(columnArray);
    }

    setSnake({
      head: `Row ${Math.ceil(rowCount / 2)},Column ${Math.ceil(
        columnCount / 2
      )}`,
      body: [
        `Row ${Math.ceil(rowCount / 2)},Column ${Math.ceil(
          columnCount / 2 - 1
        )}`,
      ],
      tail: `Row ${Math.ceil(rowCount / 2)},Column ${Math.ceil(
        columnCount / 2 - 2
      )}`,
    });
    console.log(snake);
  }, [rowCount, rows, columnCount, columns, snake]);

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
                data-cell-id={`${row},${column}`}
                className={`cell ${
                  i % 2 === 0
                    ? k % 2 === 0
                      ? "yellow"
                      : "blue"
                    : k % 2 === 0
                    ? "blue"
                    : "yellow"
                } ${
                  (snake.head === `${row},${column}` ||
                    snake.body.includes(`${row},${column}`) ||
                    snake.tail === `${row},${column}`) &&
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
