import React from 'react'
import { FaArrowLeft } from 'react-icons/fa'

const UserForm = (props) => {
  const info = props.info
  return (
    <div className='user-form'>
      <div className='user-form'>
        <div className={props.isGenerating ? "back disabled" : "back"} onClick={()=>{
          props.closeUserForm()
        }}>
          <FaArrowLeft /> Back
        </div>
        <div className="container">
          <div className="info">
              Shipping Form
              {/* this should have a form component that takes the shipping details and then pass that data to the minting and either use an hash to store it too the block chain or just add it to a database */}
          </div> 
          <div className="actions">
              {info && <button style={{cursor:"pointer"}} className="sign-tx" onClick={()=>{
                props.openUserDetails(info)
              }}>
                  Save
              </button>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserForm
