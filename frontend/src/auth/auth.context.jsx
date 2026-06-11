import { createContext, useState } from "react";
import { getme } from "./services/auth.api.jsx";

export const AuthContext = createContext();

//global store jo poori app mein user ki login info share karta hai.

export const AuthProvider = ({children})=>{

  const [user,setUser] = useState(null)
  const [loading,setLoading] = useState(true)

/** 
children = React ka special keyword — andar ke components ko represent karta hai
*/


  return(
    <AuthContext.Provider value={{user, setUser,loading, setLoading}}>
        {children}
    </AuthContext.Provider>
  )

}