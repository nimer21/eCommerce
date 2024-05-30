import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

export const UserContext=createContext();

const UserContextProvider = ({children})=>{
    //const [userName,setUserName] = useState('Nimer');
    const [userToken,setUserToken] = useState(localStorage.getItem('userToken'));
    const[userName,setUserName] = useState(null);
    const getUserData= ()=>{
        
        if(userToken!=null){
            const decoded = jwtDecode(userToken);
            //console.log(decoded);
            setUserName(decoded.userName);
        }
    };

    useEffect(()=>{
        getUserData();
    },[userToken])
//console.log("Hi");
//return children;
return <UserContext.Provider value={{setUserToken, userName, setUserName}}>
    {children}
</UserContext.Provider>
};

export default UserContextProvider;