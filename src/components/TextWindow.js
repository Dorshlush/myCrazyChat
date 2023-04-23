import React, { useState } from 'react';
import axios from 'axios';

function TextWindow(props) {
  const [inputText, setInputText] = useState('');
  const [summaryTxt, setSummaryTxt] = useState('');

  const summarizeTxt = async () => {
    const data = { body: inputText };
    try {
      const response = await axios.post(
        'https://w5xddkfv70.execute-api.us-east-1.amazonaws.com/Prod/summarize',
        data);
      setSummaryTxt(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await summarizeTxt();
  };

  return (
    <>
      <div className="text-window">
        <h2>My Crazy Text</h2>
        <form onSubmit={handleSubmit}>
          <textarea value={inputText} onChange={handleChange} />
          <button type="submit">Compute</button>
        </form>
      </div>
      <div className="text-window">
        <h2>My Crazy Summarizer</h2>
        <form>
          <textarea value={summaryTxt} readOnly />
          <button onClick={() => setSummaryTxt('')}>Reset</button>
        </form>
      </div>
    </>
  );
}

export default TextWindow;
