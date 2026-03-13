import { Outlet } from "react-router-dom";

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