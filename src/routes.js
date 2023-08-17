import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Subject from "./pages/Subject";
import Header from "./components/Header";
import Student from "./pages/Student";

function RoutesApp(){
    return(
        <BrowserRouter>
            <Header/>
            <Routes>
                <Route path="/" element={ <Home/> } />
                <Route path="/subject" element={ <Subject/> } />
                <Route path="/student" element={ <Student/> } />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;