import AppFooter from "./AppFooter";
import { Outlet } from "react-router-dom";

export default function PublicAppLayout() {
    return (
        <div className="login-app-container">
            <div className="login-app-body">
                <main className="login-app-content">
                    <Outlet />
                </main>
            </div>
            <AppFooter />
        </div>
    );
}