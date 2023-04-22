import React, { useState,useContext } from 'react';
import TextWindow from './components/TextWindow';
import SummaryWindow from './components/SummaryWindow';
// import { summarizeText } from './api'; // import your text summarization function here
import Context from './context';
import './App.css'

function App() {
  const [summary, setSummary] = useState('');

  function handleSubmit(text) {
    // const summary = summarizeText(text); // call your text summarization function here
    setSummary(summary);
  }

  return (
    <div className="app">
      <Context>
      <TextWindow onSubmit={handleSubmit} />
      <SummaryWindow summary={summary} />
      </Context>
    </div>
  );
}

export default App;
