import React, { useState, useEffect } from 'react';

const Matrix2 = ({ characteristicCount, characteristicNames, onNormalizedMarksChange }) => {
  const [matrix, setMatrix] = useState(() => {
    // Создаем начальную матрицу с пустыми значениями
    return Array(characteristicCount).fill().map(() => Array(characteristicCount).fill(''));
  });

  const [normalizedMarks, setNormalizedMarks] = useState([]);

  useEffect(() => {
    // Заполнение матрицы единицами на главной диагонали
    const initialMatrix = Array(characteristicCount).fill().map(() => Array(characteristicCount).fill(''));
    for (let i = 0; i < characteristicCount; i++) {
      initialMatrix[i][i] = '1';
    }
    setMatrix(initialMatrix);
  }, [characteristicCount]);

  const calculateNormalizedMarks = () => {
    const marks = [];
    let sum = 0;
    for (let i = 0; i < characteristicCount; i++) {
      let product = 1;
      for (let j = 0; j < characteristicCount; j++) {
        product *= parseFloat(matrix[i][j]) || 0; 
      }
      const mark = Math.pow(product, 1 / characteristicCount);
      sum += mark;
      marks.push(mark);
    }
    const normalized = marks.map(mark => (mark / sum).toFixed(2));
    // Вызов коллбэка для передачи данных в родительский компонент
    onNormalizedMarksChange(normalized);
    setNormalizedMarks(normalized);
  };

  const handleMatrixChange = (rowIndex, colIndex, event) => {
    const newValue = event.target.value;
    const newMatrix = [...matrix];
    newMatrix[rowIndex][colIndex] = newValue;

    // Обновляем обратно симметричный элемент
    if (newValue !== '' && parseFloat(newValue) !== 0) {
      const reciprocal = 1 / parseFloat(newValue);
      newMatrix[colIndex][rowIndex] = reciprocal.toFixed(2);
    } else {
      newMatrix[colIndex][rowIndex] = '';
    }
    setMatrix(newMatrix);
  };

  const handleCalculateClick = () => {
    calculateNormalizedMarks();
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            {characteristicNames.map((name, index) => (
              <th key={index}>{name || `Characteristic ${index + 1}`}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, rowIndex) => (
            <tr key={rowIndex}>
              <td>{characteristicNames[rowIndex] || `Characteristic ${rowIndex + 1}`}</td>
              {row.map((cell, colIndex) => (
                <td key={colIndex}>
                  <input
                    type="number"
                    step="0.01"
                    value={cell}
                    onChange={(event) => handleMatrixChange(rowIndex, colIndex, event)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleCalculateClick}>Calculate normalized marks</button>
      {normalizedMarks.length > 0 && (
        <div>
          <h3>Normalized marks:</h3>
          <ul>
            {normalizedMarks.map((mark, index) => (
              <li key={index}>{`Normalized mark ${index + 1}: ${mark}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Matrix2;
