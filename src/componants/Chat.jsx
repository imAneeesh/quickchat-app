import React, { useContext } from "react";
import Cam from "../assets/cam.png"
import Add from "../assets/add.png"
import More from "../assets/more.png"
import Messages from "./Messages";
import Inputs from "./Inputs";
import { ChatContext } from "../context/chatContext";


const Chat = () => {
    const { data } = useContext(ChatContext);
    console.log(data)

    return (
        <div className="chat">
            <div className="chat-info">
                <span>{data.user?.displayName}</span>
                <div className="chatIcons">
                    <img src={Cam} alt="" />
                    <img src={Add} alt="" />
                    <img src={More} alt="" />
                </div>
            </div>
            <Messages />
            <Inputs />
        </div>
    )
}

export default Chat