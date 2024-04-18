import React from "react";
import "./UserMessageBox.css"

const UserMessageBox = ({message}) => {
    return (
        <div className="user-message">
            <p>{message}</p>
        </div>
    )
}

export default UserMessageBox;