import React, { useEffect, useState } from 'react'
import {FaArrowRight} from "react-icons/fa"
import {BsFillSkipEndFill} from "react-icons/bs"

const Intro = (props) => {
  const textToType = "Welcome to Seb's NFT Printing. Isaac is an Upcoming Ricch Kidd </>. Watch out for Isaac He isn't slowing down anytime soon... Click the button below to Get Started!!!"
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
    }, 100); // Adjust typing speed by changing the interval (e.g., 50 for faster, 200 for slower)

    return () => clearInterval(typingInterval);
    // setTimeout(()=>{
    // }, 6000)
  }, [props.showIntro])
  return (
    <div className='intro'>
      <div className="holder">
        <div className="chat-box">
            <div className={hasSkipped ? "skip disabled" : "skip"} onClick={skipTextTyping}>
              <BsFillSkipEndFill />
            </div>
            <p>{hasSkipped ? textToType : displayText}</p>
            {/* <p>
                Hello, I amm Shreddder <span>Ricch Kidd &lt;/&gt; </span> 
            </p>
            <p>
                I will be your  <span>Isaac</span> to getting your NFT Shirt printed
            </p>
            <p>
                Click the button below to Get Started!!
            </p> */}
            <button className="continue-btn" onClick={props.gotoSignIn}>
                Get Started <FaArrowRight size={14}/> 
            </button>
            <div className="chat-guy">
              {/* <img src="https://cdn-icons-png.flaticon.com/128/1507/1507155.png" alt="chat-guy" /> */}
              {/* <img src="https://www.pngkit.com/png/detail/129-1296240_shredder-shredder-of-ninja-turtles.png" alt="chat-guy" /> */}
              <img src="./chat-guy-shredder.png" alt="chat-guy" />
            </div>
        </div>
        {/* <div className="chat-guy">
          <img src="https://cdn-icons-png.flaticon.com/128/1507/1507155.png" alt="chat-guy" />
        </div> */}
      </div>
    </div>
  )
}

export default Intro