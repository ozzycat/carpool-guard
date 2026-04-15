import AppFooter from "./AppFooter";
import { Outlet } from "react-router-dom";

export default function PublicAppLayout() {
    return (
        <div className="app-container">
            <div className="app-body">
                <main className="app-content">
                    <Outlet />
                </main>
            </div>
            <AppFooter />
        </div>
    );
}