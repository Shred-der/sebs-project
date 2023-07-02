import React from 'react'
import {FaArrowRight} from "react-icons/fa"

const Intro = (props) => {
  return (
    <div className='intro'>
      <div className="holder">
        <div className="chat-box">
            <p>Welcome to Seb's NFT Printing</p>
            <p>
                Isaac is an Upcoming <span>Ricch Kidd &lt;/&gt; </span> 
            </p>
            <p>
                Watch out for <span>Isaac</span> He isn't slowing down any time soon...
            </p>
            <p>
                Click the button below to Get Started!!
            </p>
            <button className="continue-btn" onClick={props.gotoSignIn}>
                Get Started <FaArrowRight size={14}/> 
            </button>
            <div className="chat-guy">
              <img src="https://cdn-icons-png.flaticon.com/128/1507/1507155.png" alt="chat-guy" />
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
