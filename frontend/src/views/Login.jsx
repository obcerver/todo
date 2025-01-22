import React from 'react'
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';


function Login() {

    const navigate = useNavigate();

    const sign = () => {
        navigate('/home');
    }

    const login = (credentialResponse) => {
        axios.post('http://localhost:3000/api/auth', {
            credential: credentialResponse.credential
        }, {
            withCredentials: true  // Ensure cookies are sent with requests
        })
            .then(function (response) {
                navigate('/home')
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 border-2 border-gray-600 rounded-xl">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="text-center text-2xl/9 font-bold tracking-tight text-gray-200">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <GoogleLogin
                        onSuccess={(credentialResponse) => login(credentialResponse)}
                    />
                </div>
            </div>
        </>
    )
}

export default Login