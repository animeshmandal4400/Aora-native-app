import { createContext, useContext, useState, useEffect } from "react";
import { getCurrentUser } from "../libs/appwrite";

const GlobalContext = createContext()

export const useGlobalContext = () => useContext(GlobalContext);

const GlobalProvider = ({ children }) => {
    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState(null)
    const [loading, setIsLoading] = useState(true)

    useEffect(() =>{
        getCurrentUser()
        .then((res) =>{
            if(res){
                setIsLogged(true)
                setUser(res)
            } else{
                setIsLogged(false)
                setUser(null)
            }
        }) 
        .catch((error) =>{
            console.log(error)
        })
        .finally(() => {
            setIsLoading(false)
        })
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                isLogged,
                setIsLogged,
                user,
                setUser,
                loading,
            }}
        >
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalProvider
