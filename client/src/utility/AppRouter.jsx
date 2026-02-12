import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
/* Import any screens as needed. */

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<></>}/>
                <Route path="" element={<></>}/>
                <Route path="" element={<></>}/>

                <Route path="*" element={<>404 Not Found</>}/>
            </Routes>
        </BrowserRouter>
    );
}