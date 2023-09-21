import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Subject from "./pages/Subject";
import Header from "./components/Header";
import Student from "./pages/Student";
import Footer from "./components/Footer";
import Teacher from "./pages/Teacher";
import Class from "./pages/Class";
import Login from "./pages/Login";
import User from "./pages/User";
import Password from "./pages/Login/password";
import ClassTimeTable from "./pages/ClassTimeTable";

function RoutesApp(){
    
    const isLoginPage = window.location.pathname === '/' || window.location.pathname === '/password';
    const shouldRenderHeaderAndFooter = !isLoginPage;

    return(
        <BrowserRouter>
            {shouldRenderHeaderAndFooter && <Header />}
            <Routes>
                <Route path="/" element={ <Login/> } />
                <Route path="/home" element={ <Home/> } />
                <Route path="/subject" element={ <Subject/> } />
                <Route path="/student" element={ <Student/> } />
                <Route path="/teacher" element={ <Teacher/> } />
                <Route path="/class" element={ <Class/> } />
                <Route path="/user" element={ <User/> } />
                <Route path="/password" element={ <Password/> } />
                <Route path="/classTimeTable" element={ <ClassTimeTable/> } />
            </Routes>
            {shouldRenderHeaderAndFooter && <Footer />}
        </BrowserRouter>
    );
}

export default RoutesApp;