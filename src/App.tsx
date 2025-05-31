import React, { useState, ChangeEvent } from 'react';

function App() {
  const [inputValue, setInputValue] = useState<string>('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Mathematics Plot</h1>
      
      <input
        type="text"
        placeholder="Enter your function here"
        value={inputValue}
        onChange={handleChange}
        style={{ padding: '8px', width: '300px', fontSize: '16px' }}
      />
      
      <p style={{ marginTop: '10px', fontSize: '18px' }}>
        You typed: <strong>{inputValue}</strong>
      </p>
    </div>
  );
}

export default App;
