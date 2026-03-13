import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";
import { Paper } from "@mui/material";

export default function AppLayout() {
    return (
        <div className="app-container">
            <div className="app-body">
                <main className="app-content">
                        <Outlet/>
                </main>
            </div>
        </div>
    );
}