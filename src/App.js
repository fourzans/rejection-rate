import React from 'react';
import logo from './logo.svg';
import './App.css';
import Questions from './components/questions/questions';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          You must be rejected by a human being at least once per day.
        </p>
        <Questions/>
      </header>
    </div>
  );
}

export default App;
