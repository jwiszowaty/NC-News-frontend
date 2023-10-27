import { createContext,  useEffect, useState } from "react";

export const UserDataContext = createContext()

export const UserDataProvider = ({ children }) => {
    const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData')) || null)

    useEffect(() => {
        localStorage.setItem('userData', JSON.stringify(userData))
    }, [userData])
    
    return (
        <UserDataContext.Provider value={{ userData, setUserData }}>
            {children}
        </UserDataContext.Provider>
    )
}