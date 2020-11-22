import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { stack as Menu } from "react-burger-menu";
import {
    faHome,
    faBlog,
    faHammer,
    faMailBulk
} from "@fortawesome/free-solid-svg-icons"

const Sidebar = props => {
    return (

        <Menu {...props}>
            <a className="menu-item" href="/">
                <FontAwesomeIcon icon={faHome} size="1x" /> Home
      </a>

            <a className="menu-item" href="/blog/">
                <FontAwesomeIcon icon={faBlog} size="1x" /> Blog
      </a>

            <a className="menu-item" href="/projects">
                <FontAwesomeIcon icon={faHammer} size="1x" /> Projects
      </a>

            <a className="menu-item" href="/contact">
                <FontAwesomeIcon icon={faMailBulk} size="1x" /> Contact Me
      </a>
        </Menu>
    );
};

export default Sidebar