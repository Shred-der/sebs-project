import React from 'react'
import { FaTimes } from 'react-icons/fa'

const ShirtyInfo = (props) => {
  return (
    <div className='shirty-info'>
        <button className="hide" onClick={props.close}>
            <FaTimes />
        </button>
      <div className="shirty-img">
        <img src="./chat-guy-shredder.png" alt="chat-guy" />
      </div>
      <div className="message">
        <p>
            Hey There I'm <span>SHIRTY</span> <br /> Do you want me to be your Guide throughout the Minting process?
        </p>
        <div className="controls">
            <button onClick={()=>{
              props.showShirty()
            }} className="yes">Yes</button>
            <button onClick={()=>{
              props.hideShirty()
            }} className="no">No</button>
        </div>
      </div>
    </div>
  )
}

export default ShirtyInfo
