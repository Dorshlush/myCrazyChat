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
    const data = { body: inputText };
    try {
      const response = await axios.post(
        'https://c8kbi5tdzc.execute-api.us-east-1.amazonaws.com/Prod/sum',
        data);
      setSummaryTxt(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  //function that i decided to add, generates a random text!@
  const generateTxt = async () => {
    
    try {
      const response = await axios.get(
        ' https://w5xddkfv70.execute-api.us-east-1.amazonaws.com/Prod/generate');
        setGeneratedTxt(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  //the second function, activate the second function and generate a continuation text input
  const generateTxtContinue = async () => {
    
    try {
      const data={body:inputText}
      const response = await axios.post(
        'https://c8kbi5tdzc.execute-api.us-east-1.amazonaws.com/Prod/generate',data);
        setContinuationText(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };



  const handleChange = (event) => {
    setInputText(event.target.value);
    setContinuationText('');
    
  };
  //activate both functions
  const handleSubmit = async (event) => {
    event.preventDefault();
    HandleLoading()
    await generateTxtContinue()
    await summarizeTxt();
  
  };
  const handleClick = async (event) => {
    HandleLoading()
    await generateTxt()
    setInputText(generatedTxt);
  };
  //keep the dom updated
  useEffect(() => {
    setInputText(generatedTxt);
  }, [generatedTxt]);
  useEffect(() => {
    setInputText(inputText + " " + continuationText);
  }, [continuationText]);

  //handle the animation
  const HandleLoading = () => {
    setIsLoading(true);
    // Perform asynchronous operation here
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Simulate delay
  };
  
  return (
    <>
      <div className="text-window">
        <h2>My Crazy Text</h2>
        <button onClick={()=>handleClick()} className='generateBtn'>Generate Random</button>
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
