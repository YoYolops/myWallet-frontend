import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router";

const AppContext = createContext({});

export function AppProvider({ children }) {
    const history = useHistory();
    const [ userData, setUserData ] = useState();
    const [ entries, setEntries ] = useState([]);

    useEffect(() => {
        const storagedData = localStorage.getItem("mywallet");
        if(storagedData) {
            const data = JSON.parse(storagedData)
            setUserData(data)
            history.push("/main");
        }
    }, [history])

    function storeUserDataLocally(data) {
        localStorage.setItem("mywallet", JSON.stringify(data))
    }

    return (
        <AppContext.Provider value={{
            userData,
            setUserData,
            storeUserDataLocally,
            entries,
            setEntries
        }}>
            { children }
        </AppContext.Provider>
    )
}

export default AppContext;