import React, { createContext, useState } from 'react';

// Create Context
export const alertDatafn = createContext();

// Context Provider
export const ContextProvider = ({ children }) => {
    const [alertData, setAlertData] = useState(null);

    return (
        <alertDatafn.Provider value={{ alertData, setAlertData }}>
            {children}
        </alertDatafn.Provider>
    );
};
