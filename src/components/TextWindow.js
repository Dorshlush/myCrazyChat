import React, { useState, useContext,useEffect } from 'react';
import { AppContext } from '../context';


function TextWindow(props) {
  const { setInputText, inputText, summerizeTxt} = useContext(AppContext);
  const [text, setText] = useState("");

  const handleChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setInputText(text);
    summerizeTxt()
    
  };
  useEffect(() => {
    alert(inputText);
  }, [inputText]);

  return (
    <div className="text-window">
      <h2>My Crazy Text</h2>
      <form onSubmit={handleSubmit}>
        <textarea value={text} onChange={handleChange} />
        <button type="submit">Compute</button>
      </form>
    </div>
  );
}

export default TextWindow;

