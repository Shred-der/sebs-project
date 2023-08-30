import React, { useEffect, useState } from 'react';
import type { NextPage } from "next";
import SignIn from "../components/Signin";
import Preloader from "../components/Preloader"
import HomePageBig from "../components/HomePageBig"

const HomePage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [showHomePage, setShowHomePage] = useState(false)
  const [showIntro, setShowIntro] = useState(false)
  const [showGetStarted, setShowGetStarted] = useState(false)
  const [showshirty, setShowshirty] = useState(true)

  useEffect(()=>{
    setTimeout(()=>{
      setIsLoading(false)
      setShowHomePage(true)
    }, 5000)
  }, [])

  function showSignInComp(){
    setShowIntro(false)
  }

  function goToGetStarted(){
    setShowGetStarted(true)
    setShowIntro(true)
  }
  
  function backtoHomePage(){
    setShowGetStarted(false)
    setShowIntro(false)
  }

  const [showBot, setShowBot] = useState(true)

  return (
    <div className={`${isLoading ? "loading" : ""} ${showshirty === false ? "hide-shirty" : ""} ${showGetStarted ? "showing-get-started" : ""}`}>
        <Preloader className={isLoading ? "show preloader" : "preloader"} />
        <SignIn showshirty={showshirty} showIntro={showIntro} hideShirty={()=>{
          setShowshirty(false)
        }} showBot={showBot} setShowBot={setShowBot} showGetStarted={showGetStarted} gotoSignIn={showSignInComp} backtoHomePage={backtoHomePage}/>
        <HomePageBig toggleShirty={(value)=>{
          setShowshirty(value)
        }} className={showHomePage  ? "home-pg show" : "home-pg"} goToGetStarted={goToGetStarted}/>
    </div>
  );
};

export default HomePage;
