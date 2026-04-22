import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import React, { useRef } from "react";

export const SignOutButton = () => {
    const navigate = useNavigate();
    const topbarMenuRef = useRef(null);

    const handleSignOut = () => {
        localStorage.removeItem("token");
        navigate("/login", { replace: true });
    }

    return (
        <div ref={topbarMenuRef} className="layout-topbar-signout-button layout-topbar-button">
            <Button
                variant="contained"
                color="primary"
                onClick={handleSignOut}
            >
                Sign Out
            </Button>
        </div>
    )
}