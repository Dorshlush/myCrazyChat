import React, { useState ,useEffect} from 'react';
import axios from 'axios';

function TextWindow(props) {
  const [inputText, setInputText] = useState('');
  const [summaryTxt, setSummaryTxt] = useState('');
  const [generatedTxt,setGeneratedTxt]=useState('')
  const [continuationText,setContinuationText]=useState('')

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
  const generateTxt = async () => {
    
    try {
      const response = await axios.get(
        ' https://w5xddkfv70.execute-api.us-east-1.amazonaws.com/Prod/generate');
        setGeneratedTxt(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };
  const generateTxtContinue = async () => {
    
    try {
      const data={body:inputText}
      const response = await axios.post(
        ' https://w5xddkfv70.execute-api.us-east-1.amazonaws.com/Prod/generateTextContinuation',data);
        setContinuationText(response.data.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await generateTxtContinue()
    await summarizeTxt();
  };
  const handleClick = async (event) => {
    await generateTxt();
  };
  
  useEffect(() => {
    setInputText(generatedTxt);
  }, [generatedTxt]);
  return (
    <>
      <div className="text-window">
        <h2>My Crazy Text</h2>
        <button onClick={()=>handleClick()} className='generateBtn'>Generate Random</button>
        <form onSubmit={handleSubmit}>
          <textarea value={inputText+" "+continuationText} onChange={handleChange} />
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
