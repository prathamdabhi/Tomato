import { createContext } from "react";

export const AppContext = createContext();

const AppProvider = (props) => {

    const url = 'https://tomato-backend-mdla.onrender.com'
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