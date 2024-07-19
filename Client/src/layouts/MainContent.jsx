import { useState } from "react";
import Sidebar from "./Sidebar";
import Navigation from "./Navigation";
import Content from "./Content";
import Login from "../contents/Form/Login";
import Register from "../contents/Form/Register";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainContent = () => {
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    return (
        <>
            <ToastContainer />
            <div className="flex">
                <div className="w-[20%]">
                    <Sidebar />
                </div>
                <div className="w-[80%]">
                    <Navigation
                        setIsLoginOpen={() => setIsLoginOpen(true)}
                        setIsRegisterOpen={() => setIsRegisterOpen(true)}
                    />
                    <Content />

                </div>
            </div>

            <Login isLoginOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} />
            <Register
                isRegisterOpen={isRegisterOpen}
                onClose={() => setIsRegisterOpen(false)}
                setIsLoginOpen={() => setIsLoginOpen(true)}
            /></>
    );
}

export default MainContent;