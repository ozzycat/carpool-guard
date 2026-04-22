import React, { forwardRef, useContext, useImperativeHandle, useRef } from "react";
import { LayoutContext } from "./context/LayoutContext";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const AppTopbar = forwardRef((props, ref) => {
    const { layoutState, onMenuToggle, showProfileSidebar } = useContext(LayoutContext);
    const menuButtonRef = useRef(null);
    const topbarMenuRef = useRef(null);
    const topbarMenuButtonRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getMenuButton: () => menuButtonRef.current,
        getTopbarMenu: () => topbarMenuRef.current,
        getTopbarMenuButton: () => topbarMenuButtonRef.current
    }));

    return (
        <div className="layout-topbar">
            <div className="layout-topbar-left">
                <Link to="/" className="layout-topbar-logo">
                    Carpool Guard
                </Link>

                <button ref={menuButtonRef} type="button" className="p-link layout-menu-button layout-topbar-button" onClick={onMenuToggle}>
                    <i className="pi pi-bars"/>               
                </button>
            </div>

            <div className="layout-topbar-right">
                <button ref={topbarMenuButtonRef} type="button" className="p-link layout-topbar-menu-button layout-topbar-button" onClick={showProfileSidebar}>
                    <i className="pi pi-user"/>
                </button>

                <div ref={topbarMenuRef} className="layout-topbar-signout-button layout-topbar-button">
                    <Button>Testing</Button>
                </div>
            </div>
            
        </div>
    );
});

export default AppTopbar;