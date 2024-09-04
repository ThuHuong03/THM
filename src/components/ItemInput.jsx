import React, { useState } from 'react'

export default function ItemInput() {

  const [columns, setColumns] = useState([[]]); // Array to store columns of numbers
  const [currentInput, setCurrentInput] = useState(""); // Store current input

  // Handle number input
  const handleInputChange = (e) => {
    setCurrentInput(e.target.value);
  };

  // Handle key press (Enter key to submit input)
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      const number = parseFloat(currentInput);
      if (!isNaN(number)) {
        const lastColumn = columns[columns.length - 1];

        if (lastColumn.length < 5) {
          // Add number to the last column
          const updatedColumns = [...columns];
          updatedColumns[updatedColumns.length - 1] = [...lastColumn, number];
          setColumns(updatedColumns);
        } else {
          // If the last column is full, create a new column
          setColumns([...columns, [number]]);
        }

        // Clear input after adding
        setCurrentInput("");
      }
    }
  };

  // Calculate sum of a column
  const calculateSum = (column) => {
    return column.reduce((sum, num) => sum + num, 0);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Enter Numbers</h1>

      <input
        type="text"
        value={currentInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter a number and press Enter"
        className="border border-gray-300 p-2 rounded-lg"
      />

      <div className="grid grid-cols-5 gap-4 mt-8">
        {columns.map((column, index) => (
          <div key={index} className="border p-4 rounded-lg bg-gray-100">
            <h2 className="text-xl font-bold">Column {index + 1}</h2>
            {column.map((number, i) => (
              <p key={i}>{number}</p>
            ))}
            <p className="mt-2 font-bold">Sum: {calculateSum(column)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}