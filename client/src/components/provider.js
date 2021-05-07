import React, { createContext, useState } from 'react';


const initial = {
    appState: {loggedIn: false},
    appError: {msg: ''},
    appSetLogin: () => { },
    appSetLogOut: () => { },
};

export const AppStateContext = createContext(initial);

function AppStateProvider({children}){

    const [appState, setAppState] = useState({loggedIn: false});
    const [appError, setAppError] = useState({msg: ''});

    const appSetLogin = () => {
        setAppState({ ...appState, loggedIn: true });
      };

    const appSetLogOut = () => {
        setAppState({...appState, loggedIn: false});
    };

    return(
        <AppStateContext.Provider value={{
            appError,
            appState,
            appSetLogin,
            appSetLogOut
        }}>
            {children}
        </AppStateContext.Provider>
    );
};

export default AppStateProvider;