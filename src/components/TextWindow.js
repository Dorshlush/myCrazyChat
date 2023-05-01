import React, { useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

function TextWindow(props) {
  const [inputText, setInputText] = useState(""); // saves the user input
  const [continuationText, setContinuationText] = useState(" "); // save the continuation generated text
  const [isLoading, setIsLoading] = useState(false); // used for the loading animation
  const [errorMessage, setErrorMessage] = useState(""); // error message for short input

  const generateTxtContinue = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post(
        "https://c8kbi5tdzc.execute-api.us-east-1.amazonaws.com/Prod/generate",
        inputText
      );
      let output = response.data;

      setContinuationText(output);
      console.log(response.data);
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

    if (inputText.split(" ").length < 10) {
      setErrorMessage(
        "We recommend writing text longer than 10 words to get good results."
      );
      return;
    }

    setErrorMessage("");
    await generateTxtContinue();
  };

  return (
    <>
      <div className="text-window">
        <h2>My Crazy Text!</h2>

        <form onSubmit={handleSubmit}>
          <textarea value={inputText} onChange={handleChange} />
          <br />
          <button type="submit" disabled={isLoading}>
            Generate
          </button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      <div className="text-window">
        <h2>My Crazy Generator!</h2>
        <form>
          <textarea value={continuationText} readOnly />
          <br />
          <button onClick={() => setContinuationText("")}>Refresh</button>
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
