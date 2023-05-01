import React, { useState, useEffect } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";

function TextWindowCopy2(props) {
  const [inputText, setInputText] = useState(""); //saves the user input
  const [continuationText, setContinuationText] = useState(" "); // save the continuation generated text
  const [isLoading, setIsLoading] = useState(false); // used for the loading animation
  const [summaryTxt, setSummaryTxt] = useState('');// saves the summary input from the function
  const [errorMessage, setErrorMessage] = useState(""); // error message for short input


  const summarizeTxt = async () => {
    setIsLoading(true);
    const data = { body: inputText };
    
    try {
      const response = await axios.post(
        'https://i3xpbq6oul.execute-api.us-east-1.amazonaws.com/Prod/sum',
        data);
      setSummaryTxt(response.data);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };

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

  useEffect(() => {
    if (continuationText !== "") {
      setInputText( continuationText);
      setContinuationText("");
    }
  }, [continuationText]);
  const handleChange = (event) => {
    setInputText(event.target.value);
    setContinuationText('');
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

  const handleSummsrize= async (event)=>{
    event.preventDefault();

    if (inputText.split(" ").length < 10) {
      setErrorMessage(
        "We recommend writing text longer than 10 words to get good results."
      );
      return;
    }

    setErrorMessage("");
    await summarizeTxt();
  }

  return (
    <>
      <div className="text-window">
        <h2>⚡ My Crazy Generator!</h2>

        <form onSubmit={handleSubmit}>
          <textarea value={inputText} onChange={handleChange} />
          <br />
          <button className="btn" type="submit">Generate</button>
          <button onClick={handleSummsrize} >Summarize</button>
        </form>
        {errorMessage && <p>{errorMessage}</p>}
      </div>
      <div className="text-window">
        <h2>⚡ My Crazy Summarizer!</h2>
        <form onSubmit={handleSummsrize}>
          <textarea value={summaryTxt} readOnly />
          <br />
         
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

export default TextWindowCopy2;
