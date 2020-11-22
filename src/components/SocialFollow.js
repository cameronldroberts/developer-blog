import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/style.css';
import {
    faTwitter,
    faGithub,
    faMedium
} from "@fortawesome/free-brands-svg-icons";

export default function SocialFollow() {
    return (
        <div className="social-container">
            <a href="https://twitter.com/cameron_1010" className="twitter social">
                <FontAwesomeIcon icon={faTwitter} size="2x" />
            </a>
            <a href="https://github.com/cameronldroberts" className="github social">
                <FontAwesomeIcon icon={faGithub} size="2x" />
            </a>
            <a href="https://medium.com/@cameronldroberts" className="medium social">
                <FontAwesomeIcon icon={faMedium} size="2x" />
            </a>
        </div>
    );
}