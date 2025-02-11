import React, { createContext,  useState } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({children}) => {
    const [errorCode, setErrorCode] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const showError = (message = null, code = null) => {
      setErrorCode(code);
      setErrorMsg(message);
    };

    const hideError = () => {
        setErrorCode(null);
        setErrorMsg(null);
    } 

    return (
        <ErrorContext.Provider value={{ errorCode, errorMsg, showError, hideError}}>
            {children}
        </ErrorContext.Provider>
    )
}