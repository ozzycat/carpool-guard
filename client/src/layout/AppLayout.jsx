import { Outlet } from "react-router-dom";
import Container from "@mui/material/Container";

export default function AppLayout() {
    return (
        <div className="app-container">
            <div className="app-body">
                <main className="app-content">
                    <Container>
                        <Outlet/>
                    </Container>
                </main>
            </div>
        </div>
    );
}