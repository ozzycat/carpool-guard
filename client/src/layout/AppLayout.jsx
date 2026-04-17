import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";
import AppFooter from "./AppFooter";
import React, { useContext, useEffect, useRef } from "react";
import { LayoutContext } from "./context/LayoutContext";

export default function AppLayout(props) {
    const { layoutConfig, layoutState, setLayoutState } = useContext(LayoutContext);
    const topbarRef = useRef(null);
    const sidebarRef = useRef(null);

    return (
        <div className="app-container">
            <div className="app-body">
                <main className="app-content">
                    <Outlet/>
                </main>
            </div>

            <AppFooter />
        </div>
    );
}