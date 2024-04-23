import React, { useState } from 'react';
import "./datas.css"
import Matrix2 from './Matrix2';
import Matrix3 from './Matrix3';

const Datas = () => {
  const [characteristicCount, setCharacteristicCount] = useState(5);
  const [characteristicNames, setCharacteristicNames] = useState(Array(5).fill(''));
  const [systemCount, setSystemCount] = useState(1);
  const [systemNames, setSystemNames] = useState(Array(1).fill(''));
  const [matrix2Visible, setMatrix2Visible] = useState(false);
  const [matrix3Visible, setMatrix3Visible] = useState(false);
  const [normalizedMarks, setNormalizedMarks] = useState([]);

  const handleCharacteristicChange = (event) => {
    const count = parseInt(event.target.value);
    setCharacteristicCount(count);
    setCharacteristicNames(Array(count).fill(''));
  };

  const handleCharacteristicNameChange = (index, event) => {
    const names = [...characteristicNames];
    names[index] = event.target.value;
    setCharacteristicNames(names);
  };

  const handleSystemChange = (event) => {
    const count = parseInt(event.target.value);
    setSystemCount(count);
    setSystemNames(Array(count).fill(''));
  };

  const handleSystemNameChange = (index, event) => {
    const names = [...systemNames];
    names[index] = event.target.value;
    setSystemNames(names);
  };

  const handleMatrix2Click = () => {
    setMatrix2Visible(true);
  };

  const handleMatrix3Click = () => {
    setMatrix3Visible(true);
  };

  const handleNormalizedMarksChange = (marks) => {
    setNormalizedMarks(marks);
  };

  return (
    <div className="container">
      <div className="inputs">
        <div>
          <label htmlFor="characteristicCount">Введите кол-во характеристик:</label>
          <select id="characteristicCount" value={characteristicCount} onChange={handleCharacteristicChange}>
            {[5, 6, 7, 8, 9, 10].map((count) => (
              <option key={count} value={count}>{count}</option>
            ))}
          </select>
          {characteristicNames.map((name, index) => (
            <input
              key={index}
              type="text"
              value={name}
              onChange={(event) => handleCharacteristicNameChange(index, event)}
              placeholder={`Характеристика ${index + 1}`}
            />
          ))}
        </div>
        <div>
          <label htmlFor="systemCount">Введите кол-во систем:</label>
          <select id="systemCount" value={systemCount} onChange={handleSystemChange}>
            {[1, 2, 3, 4, 5].map((count) => (
              <option key={count} value={count}>{count}</option>
            ))}
          </select>
          {systemNames.map((name, index) => (
            <input
              key={index}
              type="text"
              value={name}
              onChange={(event) => handleSystemNameChange(index, event)}
              placeholder={`Система ${index + 1}`}
            />
          ))}
        </div>
        <button className="button_2" onClick={handleMatrix2Click}>Ввести матрицу 2-го уровня</button>
        <button className="button_3" onClick={handleMatrix3Click}>Ввести матрицы 3-го уровня</button>
      </div>
      {matrix2Visible && 
        <Matrix2 
          characteristicCount={characteristicCount} 
          characteristicNames={characteristicNames} 
          onNormalizedMarksChange={handleNormalizedMarksChange} 
        />
      }
      {matrix3Visible && <Matrix3 characteristicCount={characteristicCount} characteristicNames={characteristicNames} systemNames={systemNames} normalizedMarks={normalizedMarks} />}
    </div>
  );
};

export default Datas;
