import React from "react";
import "./SocialBox.css"
import {ReactComponent as SquareIcon} from "../assets/icons/fa6-brands_square-instagram.svg"
import {ReactComponent as TwitterIcon} from "../assets/icons/fa-brands_twitter-square.svg"
import {ReactComponent as FackBookIcon} from "../assets/icons/entypo-social_facebook.svg"
const SocialBox = () => {
    return (
        <div className="social-wrapper">
            <span><SquareIcon /></span>
            <span><TwitterIcon /></span>
            <span><FackBookIcon /></span>
        </div>
    )
}

export default SocialBox;