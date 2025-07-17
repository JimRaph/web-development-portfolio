import { createContext, useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import { context } from "./context";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {

  const [socket, setSocket] = useState(null);
  const {token, user} = context()

  useEffect(() => {

    if(!token || !user?._id) return 

    const newSocket = io("http://localhost:5000", {
      // transports: ["websocket"],
      auth: {
        token: token
      },
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("Connected to socket server");
      newSocket.emit("join", user._id); 
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from socket server");
    });

    newSocket.on('connect_error', (err) => {
    console.error('Socket connection error:', err);
  });
    return () => {
      newSocket.disconnect();
    };
  }, [token, user?._id]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
