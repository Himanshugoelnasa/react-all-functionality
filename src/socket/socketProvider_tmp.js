import React, { createContext, useContext, useEffect } from "react";
import { socket } from "./socket";

const SocketContext = createContext(null);

export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }) => {

    useEffect(() => {

        socket.connect();


        socket.on("connect", () => {
            console.log("✅ Connected:", socket.id);
        });

        socket.on("disconnect", (reason) => {
            console.log("❌ Disconnected:", reason);
        });

        socket.on("connect_error", (err) => {
            console.log("🚨 Connection error:", err.message);
        });

        return () => {
            socket.off("connect");
            socket.off("disconnect");
            socket.off("connect_error");
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
