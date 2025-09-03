import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Sparkles from './Sparkles';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../firebase";

const auth = getAuth(app);

const SignUp = () => {
  const navigate = useNavigate();

  // Define state variables for form inputs
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          navigate('/dashboard'); // Redirect after successful sign-up
        })
        .catch((error) => {
          console.error(error.message);
        });
    } else {
      console.error("Password and Confirm Password do not match");
    }
  };

  return (
    <>
      <Header />
      
      <div className="flex items-center justify-center h-screen">
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a252f] to-[#02050a] z-[-1]">
          <Sparkles className="w-full h-full" />
        </div>

        <div className="w-[450px] h-[500px] bg-white shadow-lg rounded-lg p-6 flex flex-col justify-center items-center mb-12">
          <p className="text-center font-sans text-4xl font-bold mb-6">Create an Account</p>

          <form className="w-full flex flex-col gap-4 mb-4" onSubmit={handleSignUp}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-full border border-gray-300 outline-none p-3" placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="rounded-full border border-gray-300 outline-none p-3" placeholder="Password" required />
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="rounded-full border border-gray-300 outline-none p-3" placeholder="Confirm Password" required />

            <label className="flex items-center justify-between text-gray-500 text-sm">
              Accept terms of use
              <input type="checkbox" className="ml-2 h-5 w-5 cursor-pointer" required />
            </label>

            <button type="submit" className="py-3 px-4 font-sans rounded-full border-none outline-none bg-[#4a90e2] text-black text-lg cursor-pointer shadow-md active:shadow-none">
              Sign Up
            </button>
          </form>

          <p className="text-sm text-gray-900">
            Already have an account? 
            <a href='/login' className="text-[#4a90e2] text-base font-bold underline cursor-pointer hover:text-black ml-3">
              Log in
            </a>
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignUp;
