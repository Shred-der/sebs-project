import React, { useEffect, useState } from 'react'
import {FaArrowRight, FaTimes} from "react-icons/fa"
import {BsFillSkipEndFill} from "react-icons/bs"

const SelectNftIntro = (props) => {
  const textToType = "Your Namil Wallet was connected successfully. Click the button below to select the NFT you want to MINT 👍"
  const [displayText, setDisplayText] = useState("")
  const [hasSkipped, setHasSkipped] = useState(false)

  function skipTextTyping(){
    setHasSkipped(true)
  }

  useEffect(()=>{
    let currentText = '';
    let currentIndex = 0;

    const typingInterval = setInterval(() => {
      if(props.showIntro){
        if (currentIndex === textToType.length) {
          clearInterval(typingInterval);
          setHasSkipped(true)
          return;
        }
  
        currentText = textToType.slice(0, currentIndex + 1);
        setDisplayText(currentText);
        currentIndex++;
      }
      
      else{
        setHasSkipped(false)
        setDisplayText("")
      }
    }, 60); // Adjust typing speed by changing the interval (e.g., 50 for faster, 200 for slower)

    return () => clearInterval(typingInterval);
    // setTimeout(()=>{
    // }, 6000)
  }, [props.showIntro])

  const [showConfirm, setShowConfirm] = useState(false)

  // const showBot = window.localStorage.getItem("show-bot")
  
  return (
    <div className={props.showIntro ? 'intro' : 'intro'}>
      <div className="holder">
        <div className={showConfirm ? "confirm show": "confirm"}>
          <div className="backdrop"></div>
          <div className="contentx x">
            <p>
              This action will disable SHIRTY's guide throughout your session
            </p>
            <div className="controls">
              <button onClick={()=>{
                setTimeout(()=>{
                  props.hideShirty()
                }, 1500)
                setShowConfirm(false)
              }}>I know</button>
              <button onClick={()=>{
                setShowConfirm(false)
              }}>cancel</button>
            </div>
          </div>
        </div>
        <div className="chat-box">
            <div className={hasSkipped ? "skip disabled" : "skip"} onClick={skipTextTyping}>
              <BsFillSkipEndFill />
            </div>
            <p>{hasSkipped ? textToType : displayText}</p>
            {/* <p>
                Isaac is an Upcoming <span>Ricch Kidd &lt;/&gt; </span> 
            </p>
            <p>
                Watch out for <span>Isaac</span> He isn't slowing down any time soon...
            </p>
            <p>
                Click the button below to Get Started!!
            </p> */}
            <button className="continue-btn" onClick={props.gotoSignIn}>
                Continue <FaArrowRight size={14}/> 
            </button>
            <div className="chat-guy">
              <div className="close" onClick={()=>{
                setShowConfirm(true)
              }}>
                <FaTimes />
              </div>
              <div className="shred">
                <img src="./chat-guy-shredder.png" alt="chat-guy" />
              </div>
              {/* <img src="https://cdn-icons-png.flaticon.com/128/1507/1507155.png" alt="chat-guy" /> */}
              {/* <img src="https://www.pngkit.com/png/detail/129-1296240_shredder-shredder-of-ninja-turtles.png" alt="chat-guy" /> */}
            </div>
        </div>
      </div>
    </div>
  )
}

export default SelectNftIntro