import React, { useEffect, useState } from 'react';
import type { NextPage } from "next";
import SignIn from "../components/Signin";
import Preloader from "../components/Preloader"

const HomePage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showSignIn, setShowSIgnIn] = useState(false)

  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
    }, 5000)
  }, [])

  function showSignInComp(){
    setShowSIgnIn(true)
  }

  return (
    <div className={`${showSignIn ? "show-signin" : ""} ${isLoading ? "loading" : ""} `}>
        <Preloader className={isLoading ? "show preloader" : "preloader"} />
        <div>
          <SignIn gotoSignIn={showSignInComp} />
        </div>
    </div>
  );
};

export default HomePage;
