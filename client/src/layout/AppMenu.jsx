import React, { useContext } from "react";
import { MenuContext } from "./context/MenuContext";
import AppMenuItem from "./AppMenuItem";

const AppMenu = () => {
    const { activeMenu, setActiveMenu } = useContext(MenuContext);

    const model = [
        {
            label: "Dashboard",
            icon: "pi pi-fw pi-home",
            to: "/dashboard"
        },
        {
            label: "Car Management",
            icon: "pi pi-fw pi-car",
            to: "/cars"
        },
    ];

    return (
        <ul className="layout-menu">
            {model.map((item, i) => (
                <AppMenuItem key={i} item={item} activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
            ))}
        </ul>
    );
};

export default AppMenu;