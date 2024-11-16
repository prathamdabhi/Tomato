import { createContext } from "react";

export const AppContext = createContext();

const AppProvider = (props) => {

    const url = 'http://localhost:4000'
    const value={
        url
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}
export default AppProvider