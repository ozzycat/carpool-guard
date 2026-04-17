import React, { useState } from "react";

export const LayoutContext = React.createContext();

export const LayoutProvider = (props) => {
    const [layoutConfig, setLayoutConfig] = useState({
        inputStyle: 'outlined',
        menuMode: 'static',
        colorScheme: 'dark',
        theme: 'lara-dark-indigo',
        scale: 14,
        ripple: false
    });

    const [layoutState, setLayoutState] = useState({
        staticMenuDesktopInactive: false,
        overlayMenuActive: false,
        profileSidebarVisible: false,
        configSidebarVisible: false,
        menuHoverActive: false,
        staticMenuMobileActive: false
    });

    // menu toggling function
    const onMenuToggle = () => {
        if (isOverlay()) {
            setLayoutState((prevLayoutState) => ({...prevLayoutState, overlayMenuActive: !prevLayoutState.overlayMenuActive}));
        }

        if (isDesktop()) {
            setLayoutState((prevLayoutState) => ({...prevLayoutState, staticMenuDesktopInactive: !prevLayoutState.staticMenuDesktopInactive}));
        } else {
            setLayoutState((prevLayoutState) => ({...prevLayoutState, profileSidebarVisible: !prevLayoutState.profileSidebarVisible}));
        }
    };

    const showProfileSidebar = () => {
        setLayoutState((prevLayoutState) => ({...prevLayoutState, profileSidebarVisible: !prevLayoutState.profileSidebarVisible}));
    };

    const isOverlay = () => {
        return layoutConfig.menuMode === 'overlay';
    };

    const isDesktop = () => {
        return window.innerWidth > 991;
    };

    const value = {
        layoutConfig,
        setLayoutConfig,
        layoutState,
        setLayoutState,
        onMenuToggle,
        showProfileSidebar
    };

    return <LayoutContext.Provider value={value}>{props.children}</LayoutContext.Provider>;
}