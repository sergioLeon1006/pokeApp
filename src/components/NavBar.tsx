import React, {useState} from 'react'
import { Navigate,NavLink } from "react-router-dom";


export default function NavBar() {

    const [logIn, setLogIn] = useState(true);

    const logOut = () =>{
        window.localStorage.removeItem('email');
        window.localStorage.removeItem('password');
        window.localStorage.removeItem('session');
        setLogIn(false);
    }

    
    return (
    <>
        { !logIn && <Navigate replace to="/login" />}
        <nav className="shadow-xl shadow-red-300/40 ring ring-2 ring-red-300 font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
            <div className="mb-2 sm:mb-0">
                <NavLink replace to={"/"} className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">Home</NavLink>
            </div>
            <div>
                <a  href='/draw' className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 cursor-pointer">draw</a>
                <a href="/favorites" className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 cursor-pointer">favorites</a>
                
                <span onClick={logOut} className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2 cursor-pointer transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-400 focus:outline-none focus:bg-red-400 text-white px-2">LogOut</span>
            </div>
        </nav>
    </>
    )
}

