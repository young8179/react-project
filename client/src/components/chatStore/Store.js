import React, { createContext, useContext, useEffect, useReducer } from 'react'
import io from "socket.io-client"
import { LoginContext } from '../loginAndRegister/LoginContextProvider'

export const ChatContext = createContext()
// const {user, setUser} = useContext(LoginContext)





const initState = {
    Buy:[
        {from: "Tap Bid", msg:"Hello, Welcome to Tap Bid"},
       
    ],
    Sell:[
        {from: "Tap Bid", msg:"Hello, Welcome to Tap Bid"},
       
    ],
    Trade:[
        {from: "Tap Bid", msg:"Hello, Welcome to Tap Bid"},
        
    ]
}
function chatHistory(){
    fetch("/api/v2/chats")
                .then(res=>res.json())
                .then((data) => {
                    for (let i = 0; i < data.length; i++) {
                        if(data.category==="Buy"){
                            initState.Buy[i].msg = data.content
                        }else if(data.category==="Sell"){
                            initState.Sell[i].msg = data.content
                        }else if(data.category==="Trade"){
                            initState.Trade[i].msg = data.content
                        }
                        
                        
                    }
    
    
                    
                })

}
chatHistory()


function reducer(state, action){
    const {from, msg, topic} = action.payload;
    switch(action.type){
        //case set data
        case "RECEIVE_MESSAGE":
            return{
                ...state,
                [topic]:[
                    ...state[topic],
                    { from, msg }
                ]
            }
            default:
                return state
    }
}











let socket = io()

export default function Store(props) {
    const [chatContext, dispatch] = useReducer(reducer, initState)
 
    function sendChatAction(value) {
        console.log("helllo")
        socket.emit("message", value)
    }

    
    
    
    
    useEffect(()=>{
            socket.on("message", function (msg) {
                dispatch({ type: "RECEIVE_MESSAGE", payload: msg })
            })
        
 },[])
//  useEffect(()=>{
//     fetch("/api/v2/chats")
//     .then(res=>res.json())
//     .then((data) => {
//         for (let i = 0; i < data.length; i++) {
//             if(data.category==="Buy"){
//                 initState.Buy[i].msg = data.content
//             }else if(data.category==="Sell"){
//                 initState.Sell[i].msg = data.content
//             }else if(data.category==="Trade"){
//                 initState.Trade[i].msg = data.content
//             }
//         }
//     })
// },[])
            
            


        

 


    return (
        <ChatContext.Provider value={{ chatContext, sendChatAction }}>
            {props.children}
        </ChatContext.Provider>
    )
}