import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import ClipLoader from 'react-spinners/ClipLoader'


function TextWindow(props) {
  const [inputText, setInputText] = useState('');//saves the user input
  const [summaryTxt, setSummaryTxt] = useState('');// saves the summary input from the function
  const [generatedTxt,setGeneratedTxt]=useState('')//saves the random text generated
  const [continuationText,setContinuationText]=useState('')// save the continuation generated text
  const [isLoading, setIsLoading] = useState(false);// used for the loading animation

//Post request sent to the restful api to active the lambda function, in this case to get the summarized text
  const summarizeTxt = async () => {
    setIsLoading(true);
    const data = { body: inputText };
    
    try {
      const response = await axios.post(
        'https://i3xpbq6oul.execute-api.us-east-1.amazonaws.com/Prod/sum',
        data);
      setSummaryTxt(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };


  //the second function, activate the second function and generate a continuation text input
  const generateTxtContinue = async () => {
    setIsLoading(true);
    try {
      const data={body:inputText}
      const response = await axios.post(
        ' https://c8kbi5tdzc.execute-api.us-east-1.amazonaws.com/Prod/generate',data);
        setContinuationText(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
    setIsLoading(false);
  };



  const handleChange = (event) => {
    setInputText(event.target.value);
    setContinuationText('');
    
  };
  //activate both functions
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    await generateTxtContinue()
    await summarizeTxt();
  
  };

  //keep the dom updated

  useEffect(() => {
    setInputText(inputText + " " + continuationText);
  }, [continuationText]);

  //handle the animation

  return (
    <>
      <div className="text-window">
        <h2>My Crazy Text</h2>
        
        <form onSubmit={handleSubmit}>
          <textarea value={inputText} onChange={handleChange} />
          <br/>
          <button type="submit">Compute</button>
        </form>
      </div>
      <div className="text-window">
        <h2>My Crazy Summarizer</h2>
        <form>
          <textarea value={summaryTxt} readOnly />
          <br/>
          <button onClick={() => setSummaryTxt('')}>Reset</button>
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
