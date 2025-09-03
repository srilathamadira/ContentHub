import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";
import { useNavigate, useLocation } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Sparkles from './Sparkles';

const auth = getAuth(app);

const Form = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Save user info to localStorage
      localStorage.setItem("user", JSON.stringify({ email: user.email }));

      // Redirect to previous page or home
      const returnTo = location.state?.from || "/home";
      navigate(returnTo);
    } catch (error) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <>
      <Header />

      <div className="flex items-center justify-center h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a252f] to-[#02050a] z-[-1]">
          <Sparkles className="w-full h-full" />
        </div>

        <div className="w-[450px] h-[500px] bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center mb-25">
          <p className="text-center font-sans text-4xl font-bold mb-6">Welcome back</p>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <form className="w-full flex flex-col gap-4 mb-4" onSubmit={handleLogin}>
            <input 
              type="email"
              className="rounded-full border border-gray-300 outline-none p-3"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input 
              type="password"
              className="rounded-full border border-gray-300 outline-none p-3"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="text-right text-gray-500 underline text-xs font-bold cursor-pointer hover:text-black">
              Forgot Password?
            </p>
            <button 
              type="submit" 
              className="py-3 px-4 font-sans rounded-full border-none outline-none bg-[#4a90e2] text-black text-lg cursor-pointer shadow-md active:shadow-none"
            >
              Log in
            </button>
          </form>

          <p className="text-sm text-gray-900">
            Don't have an account? 
            <a href='/signup' className="text-[#4a90e2] text-base font-bold underline cursor-pointer hover:text-black ml-3">
              Sign up
            </a>
          </p>

          <div className="w-full flex flex-col justify-start mt-5 gap-4">
            <div className="flex items-center justify-center gap-2 p-3 border border-gray-500 rounded-full shadow-md cursor-pointer" >
              <svg stroke="currentColor" fill="currentColor" strokeWidth={0} version="1.1" x="0px" y="0px" className="w-5 h-5" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
                <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
                <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
                <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
              </svg>
              <span>Log in with Google</span>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Form;
