import React, {useRef,useState,useEffect} from 'react'
import { Navigate } from "react-router-dom";

import {DataLogIn} from '../data'

export default function Login() {

    
    const passwordElement:any = useRef();
    const emailElement:any = useRef();
    const storeDataElement:any = useRef();
    const [loginValidation, setLoginValidation] = useState(window.localStorage.getItem('session'))
    const [error, setError] = useState(false);
    const [messaje, setMessaje] = useState('');
   
    useEffect(() => {
        passwordElement.current.value = window.localStorage.getItem('password');
        emailElement.current.value = window.localStorage.getItem('email');
      }, [])

    const handleFormSubmission = () =>{
        setError(false);
        
        const {value: email} =  emailElement.current;
        const {value: password} = passwordElement.current;
        const {value: stored} =  storeDataElement.current;
        
        if (!email || !password ) {
            setError(true);
            setMessaje('All fields are required!');
            return false;
        }else if(email !== DataLogIn.email || password !== DataLogIn.password) {
            setError(true);
            setMessaje('Email or password');
            return false;
        }else{
            //save session data
            window.localStorage.setItem('session','true');
            setLoginValidation('true');
            setError(false);
        }

        if (stored) {
            window.localStorage.setItem('email', email);
            window.localStorage.setItem('password', password);
          }else{
            window.localStorage.removeItem('email');
            window.localStorage.removeItem('password');
          }
        
    }


    return (
        <>
        {loginValidation && <Navigate replace to="/" />}
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <div className="w-full p-6 m-auto bg-white rounded-md shadow-xl shadow-red-600/40 ring ring-2 ring-red-600 lg:max-w-xl">
                <h1 className="text-3xl font-semibold text-center text-red-500 underline uppercase decoration-wavy">
                   LogIn
                </h1>
                <div className="mb-2">
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-800" >
                        Email
                    </label>
                    <input ref={emailElement} type="email" className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40"/>
                </div>
                <div className="mb-2">
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
                        Password
                    </label>
                    <input ref={passwordElement} type="password" className="block w-full px-4 py-2 mt-2 text-black-700 bg-white border rounded-md focus:border-red-400 focus:ring-red-300 focus:outline-none focus:ring focus:ring-opacity-40" />
                </div>
                <div>
                <input ref={storeDataElement} type="checkbox" id="storeData" name="storeData" value="true"/>
                    <label className="text-gray-500 cursor-pointer mx-4" htmlFor="storeData">Save e-mail and password for the next time</label>
                </div>
                {error && <p className="text-xs text-red-500">{messaje}</p>}
                <div className="mt-6">
                    <button onClick={handleFormSubmission} className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-red-600 rounded-md hover:bg-red-400 focus:outline-none focus:bg-red-400">
                        Login
                    </button>
                </div>
            </div>
        </div>
        </>
    );
}