import { useOutletContext } from "react-router-dom";
import { ContextType } from "../App";
import { useEffect, useState } from "react";

const Snake = () => {
  const { user } = useOutletContext<ContextType>();
  const [rows, setRows] = useState<string[]>([]);
  const [rowCount, setRowCount] = useState(10);
  const [columns, setColumns] = useState<string[]>([]);
  const [columnCount, setColumnCount] = useState(12);

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
  }, [rowCount, rows, columnCount, columns]);

  return (
    <>
      <h2>Welcome to Snake, {user.username}!</h2>
      <select name="rows" onChange={(e) => setRowCount(Number(e.target.value))}>
        <optgroup label="Choose Rows">
          <option value={10}>10</option>
          <option value={15}>15</option>
        </optgroup>
      </select>
      <select
        name="columns"
        onChange={(e) => setColumnCount(Number(e.target.value))}
      >
        <optgroup label="Choose Columns">
          <option value={10}>10</option>
          <option value={15}>15</option>
        </optgroup>
      </select>
      {rows.map((row, i) => {
        return (
          <div key={i} className="row">
            {columns.map((column, k) => (
              <div
                key={k}
                data-cell-id={`${row}, ${column}`}
                className={`cell ${
                  i % 2 === 0
                    ? k % 2 === 0
                      ? "yellow"
                      : "blue"
                    : k % 2 === 0
                    ? "blue"
                    : "yellow"
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
