import { Outlet } from "react-router-dom";
import AppFooter from "./AppFooter";
import React, { useContext, useEffect, useRef } from "react";
import { LayoutContext } from "./context/LayoutContext";
import AppTopbar from "./AppTopbar";
import AppSidebar from "./AppSidebar";

export default function AppLayout() {
    const { layoutState } = useContext(LayoutContext);
    const topbarRef = useRef(null);
    const sidebarRef = useRef(null);

    return (
        <div className={"layout-wrapper " + (layoutState.staticMenuDesktopInactive ? "layout-static-inactive " : "") +
            (layoutState.overlayMenuActive ? "layout-overlay-active " : "") +
            (layoutState.staticMenuMobileActive ? "layout-mobile-active " : "")
        }>
            {/* Top Nav */}
            <AppTopbar ref={topbarRef}/>

            {/* Sidebar Nav */}
            <div ref={sidebarRef} className={`layout-sidebar ${layoutState.isSidebarActive ? "active" : ""}`}>
                <AppSidebar/>
            </div>

            {/* Main Content */}
            <div className="app-container">
                <div className="app-body">
                    <main className="app-content">
                        <Outlet/>
                    </main>
                </div>

                <AppFooter />
            </div>
        </div>
    );
}