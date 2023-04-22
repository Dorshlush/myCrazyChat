import React, { createContext, useEffect, useState } from "react";
import  axios  from 'axios';
export const AppContext = createContext();

const Context = (props) => {
const { children } = props;
const [ inputText,setInputText]=useState('')
const [summaryTxt,setSummaryTxt]=useState('')

const summerizeTxt=async()=>{
  const data={inputText}
  try {
    const response = await axios.post('http://localhost:///', data);
    setSummaryTxt(response)
  } catch (error) {
    console.log(error.message) 
  }}
 return (
    <AppContext.Provider
      value={{setInputText, inputText,summaryTxt,setSummaryTxt,summerizeTxt
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default Context;