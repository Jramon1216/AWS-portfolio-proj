import React, { createContext, useContext , useState } from "react";

export const ErrorContext = createContext();

export const ErrorProvider = ({children}) => {
    const [errorContent, setErrorContent] = useState(null);

    const showError = (content) => {
        setErrorContent(content);
    };

    const hideError = () => {
        setErrorContent(null);
    } 

    return (
        <ErrorContext.Provider value={{errorContent, showError, hideError}}>
            {children}
        </ErrorContext.Provider>
    )
}