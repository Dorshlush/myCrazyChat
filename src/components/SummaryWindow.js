import React from 'react';
import { AppContext } from '../context';
import { useContext } from 'react';
function SummaryWindow(props) {
  const { summaryTxt} = useContext(AppContext);
  return (
    <div className="text-window">
      <h2>My Crazy Summarizer</h2>
      <form >
        <textarea value={summaryTxt} />
        <button >Reset</button>
      </form>
    </div>
  );
}

export default SummaryWindow;
