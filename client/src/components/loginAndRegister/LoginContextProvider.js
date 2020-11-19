import React, { createContext, useEffect, useState } from 'react'
export const LoginContext = createContext({
    user:{},
    setUser: () =>{}
})
export default function LoginContextProvider(props) {
    const [user, setUser ] = useState([])

    useEffect(()=>{
        fetch("/api/v2/users/current")
            .then(res=>res.json())
            .then((data) => {
                setUser(data)
                // props.history("/")
                // console.log(userGlobal)
            })
    },[])
    return (
        <LoginContext.Provider value={{user, setUser}}>
            {props.children}
        </LoginContext.Provider>
    )
}