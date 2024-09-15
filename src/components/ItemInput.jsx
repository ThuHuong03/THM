import React, { useState } from 'react';
import { GreenButton } from './Button';

export default function ItemInput({totalAmount,detailAmount, setDetailAmount, setTotalAmount, onClickFinish}) {
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
      detailAmount.push(number);
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
  const calculateTotalSum = () => {
    setTotalAmount(columns.reduce((total, column) => total + calculateSum(column), 0))
    return columns.reduce((total, column) => total + calculateSum(column), 0);
  };
  const calculateTotalElements = () => {
    return columns.reduce((total, column) => total + column.length, 0);
  };
  return (
    <div className="p-8">
      <div className='flex flex-row justify-between'> 

      <div>
         <h1 className="text-2xl font-bold mb-4 uppercase">Mời nhập số liệu từng số cân:</h1>

      <input
        type="text"
        value={currentInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Nhập số cân và nhấn enter"
        className="border border-gray-300 p-2 rounded-lg"
      />
      </div>

      <div>
        <h2 className='text-2xl font-bold mb-4 uppercase text-dark-rust'> Tổng: <label className='text-black'>{calculateTotalSum()} kg</label> </h2>
        <h2 className='text-2xl font-bold mb-4 uppercase  text-dark-rust'>Số giá trị:<label className='text-black'> {calculateTotalElements()} </label>{}</h2>
      </div>
     
  </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-8">
      {[...columns].reverse().map((column, index) => (
  <div key={index} className=" p-4 rounded-lg bg-white min-w-[110px]">
    <h2 className="text-2xl text-dark-rust font-bold">{columns.length - index}</h2>
    {column.map((number, i) => (
      <p className="text-right font-semibold text-xl" key={i}>
        {number}
      </p>
    ))}
    <p className="mt-2 border-t-2 border-t-black font-bold p-5 text-2xl">
      Tổng cột: {calculateSum(column)}
    </p>
  </div>
))}
     
      </div>
      <div className='mt-5 flex justify-end'>
               <GreenButton text='Hoàn thành' onClick={onClickFinish}/>

      </div>
    </div>
  );
}
