import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const UserDetails = (props) => {
  const info = props.info
  return (
    <div className='user-details'>
      <div className={props.isGenerating ? "back disabled" : "back"} onClick={()=>{
        props.closeUserDetails()
      }}>
        <FaArrowLeft /> Back
      </div>
      <div className="container">
        <div className="info">
            User Details
        </div> 
        <div className="actions">
            {info && <button style={{cursor:"pointer"}} className="sign-tx" onClick={()=>{
              props.openReciept(info)
            }}>
                Confirm Details
            </button>}
        </div>
      </div>
    </div>
  )
}

export default UserDetails
