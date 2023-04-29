import React, { useState, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

function TextWindow(props) {
  const [inputText, setInputText] = useState(""); //saves the user input
  const [continuationText, setContinuationText] = useState(" "); // save the continuation generated text
  const [isLoading, setIsLoading] = useState(false); // used for the loading animation

 

  const generateTxtContinue = async () => {
    setIsLoading(true);

    try {
      const data = { body: inputText };
      const response = await axios.post(
        " https://c8kbi5tdzc.execute-api.us-east-1.amazonaws.com/Prod/generate",
        data
      );
      let output = response.data.slice(11 + inputText.length);

      setContinuationText(output);
      console.log(output);
    } catch (error) {
      console.log(error.message);
    }

    setIsLoading(false);
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    await generateTxtContinue();
  };

  return (
    <>
      <div className="text-window">
        <h2>My Crazy Text!</h2>

        <form onSubmit={handleSubmit}>
          <textarea value={inputText} onChange={handleChange} />
          <br />
          <button type="submit">Generate</button>
        </form>
      </div>
      <div className="text-window">
        <h2>My Crazy Generator!</h2>
        <form>
          <textarea value={continuationText} readOnly />
          <br />
          <button onClick={() => ""}>Refresh</button>
        </form>
      </div>
      {isLoading && (
        <div className="loading-overlay">
          <ClipLoader color="#0077ff" size={100} />
        </div>
      )}
    </>
  );
}

export default TextWindow;
