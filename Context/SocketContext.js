import { createContext, useContext, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import io from 'socket.io-client'

const SocketContext = createContext()


export const SocketContextProvider = ({children}) => {
    const [socket, setSocket] = useState(null)
    const {userData} = useSelector(state => state.general)

    useEffect(()=>{
        const socket = io('http://192.168.1.29:5000', {
            query: {
                userId: userData?._id
            }
        })

        setSocket(socket)
        
        // socket.on('getOnlineUsers', (users) => {
        //     setOnlineUsers(users)
        // })

        return () => socket && socket.close()

    }, [userData?._id])

    return (
        <SocketContext.Provider value={{socket}}>
            {children}
        </SocketContext.Provider>
    )
}

export const useSocket = () => {
    return useContext(SocketContext)
}