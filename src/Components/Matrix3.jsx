import React, { useState } from 'react';

const Matrix3 = ({ characteristicCount, systemNames, normalizedMarks }) => {
  const [matrices, setMatrices] = useState(() => {
    // Создаем начальный массив матриц
    const initialMatrices = Array.from({ length: characteristicCount }, () =>
      Array.from({ length: systemNames.length }, () => Array(systemNames.length).fill(''))
    );

    // Заполняем каждую матрицу
    initialMatrices.forEach(matrix => {
      matrix.forEach((row, i) => {
        row.forEach((_, j) => {
          if (i === j) {
            matrix[i][j] = '1';
          }
        });
      });
    });

    return initialMatrices;
  });

  const [normalizedMarks3, setNormalizedMarks3] = useState([]);
  const [globalMarks, setGlobalMarks] = useState([]);

  // Функция для обновления значения ячейки матрицы
  const handleMatrixChange = (matrixIndex, rowIndex, colIndex, event) => {
    const newValue = event.target.value;
    const newMatrices = [...matrices];
    newMatrices[matrixIndex][rowIndex][colIndex] = newValue;

    // Обновляем обратно симметричный элемент
    if (newValue !== '' && parseFloat(newValue) !== 0) {
      const reciprocal = 1 / parseFloat(newValue);
      newMatrices[matrixIndex][colIndex][rowIndex] = reciprocal.toFixed(2);
    } else {
      newMatrices[matrixIndex][colIndex][rowIndex] = '';
    }

    setMatrices(newMatrices);
  };

  const calculateNormalizedMarks3 = (matrix) => {
    const marks = [];
    let sum = 0;
    for (let i = 0; i < matrix.length; i++) {
      let product = 1;
      for (let j = 0; j < matrix.length; j++) {
        product *= parseFloat(matrix[i][j]) || 0; 
      }
      const mark = Math.pow(product, 1 / matrix.length);
      sum += mark;
      marks.push(mark);
    }
    return marks.map(mark => (mark / sum).toFixed(2));
  };

  const handleCalculateClick = () => {
    const normalizedMarks3Array = matrices.map(matrix => calculateNormalizedMarks3(matrix));
    setNormalizedMarks3(normalizedMarks3Array);
  };

  const handleCalculateGlobalClick = () => {
    const calculatedGlobalMarks = [];
    if (normalizedMarks.length === 0 || normalizedMarks3.length === 0) {
      console.log("Нормализованные оценки еще не рассчитаны.");
      return;
    }
    
    // Итерация по каждой системе
    for (let i = 0; i < systemNames.length; i++) {
      let mark = 0;
      
      // Рассчитываем оценку для текущей системы
      for (let j = 0; j < characteristicCount; j++) {
        mark += parseFloat(normalizedMarks[j]) * parseFloat(normalizedMarks3[j][i]);
      }
      
      calculatedGlobalMarks.push(mark.toFixed(2));
    }
  
    setGlobalMarks(calculatedGlobalMarks);
  };
  

  return (
    <div>
      {/* Итерация по каждой характеристике */}
      {matrices.map((matrix, matrixIndex) => (
        <div key={matrixIndex}>
          <h3>{`Характеристика ${matrixIndex + 1}`}</h3>
          {/* Создание матрицы */}
          <table>
            <thead>
              <tr>
                <th></th>
                {systemNames.map((systemName, idx) => (
                  <th key={idx}>{systemName || `Система ${idx + 1}`}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {matrix.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td>{systemNames[rowIndex] || `Система ${rowIndex + 1}`}</td>
                  {row.map((cell, colIndex) => (
                    <td key={colIndex}>
                      <input
                        type="number"
                        step="0.01"
                        value={cell}
                        onChange={(event) => handleMatrixChange(matrixIndex, rowIndex, colIndex, event)}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {normalizedMarks3.length > 0 && normalizedMarks3[matrixIndex] && (
            <div>
              <h3>Нормализованные оценки для Характеристики {matrixIndex + 1}:</h3>
              <ul>
                {normalizedMarks3[matrixIndex].map((mark, index) => (
                  <li key={index}>{`Нормализованная оценка ${index + 1}: ${mark}`}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
      <button onClick={handleCalculateClick}>Рассчитать нормализованные оценки для всех матриц</button>
      <button onClick={handleCalculateGlobalClick}>Рассчитать глобальные оценки</button>
      {globalMarks.length > 0 && (
        <div>
          <h3>Глобальные оценки:</h3>
          <ul>
            {globalMarks.map((mark, index) => (
              <li key={index}>{`Система ${index + 1}: ${mark}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Matrix3;
