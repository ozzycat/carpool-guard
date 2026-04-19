import React from "react";
import { NavLink } from "react-router-dom";

const AppMenuItem = ({ item, activeMenu, setActiveMenu }) => {
    const isActive = activeMenu === item.label;

    const handleClick = () => {
        setActiveMenu(item.label);
    }

    return (
        <li className={`layout-menuitem ${isActive ? "active" : ""}`}>
            <NavLink to={item.to} className={`layout-menuitem-link ${isActive ? "active" : ""}`} onClick={handleClick}>
                <i className={item.icon}/>
                <span>{item.label}</span>
            </NavLink>
        </li>
    );
};

export default AppMenuItem;