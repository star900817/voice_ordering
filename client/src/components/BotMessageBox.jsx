import React from "react";
import "./BotMessageBox.css";
import { SyncLoader } from "react-spinners";

const BotMesssageBox = ({message}) => {
    return (
        <div className="bot-message">
            {
                message === "LOADING" ? <p><SyncLoader color="#d2d2d2" size={12}/></p> : message.split("\n").map((item, idx) => <p key={idx}>{item}</p>)
            }
        </div>
    )
}

export default BotMesssageBox;