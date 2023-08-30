import React from 'react'
import {FaArrowLeft, FaArrowRight} from "react-icons/fa"

const PreviewReciept = (props) => {
  return (
    <div className='preview-reciept'>
      <div className={props.isGenerating ? "back disabled" : "back"} onClick={()=>{
        if (props.isGenerating){
          let choice = window.confirm("This will abruptly end the receipt generation process...");

          if(choice) {
            console.log("Ended Generation Process....");
            props.closeReciept()
          } else {
            console.log("...");
          }
        } else{
          props.closeReciept()
        }
      }}>
        <FaArrowLeft /> Back
      </div>
      <div className="container">
        <div className="info">
            Mint reciept
        </div>
        <div className="reciept-container">
          {(props.recieptImage && props.hasGenerated) && <img src={props.recieptImage} alt="" />}
          {/* <img src={"https://files.jotform.com/jotformapps/payment-receipt-template-5fd30596666e2866e04390d48ec89876.png?v=1692656756"} alt="" /> */}
        </div>
        {(props.hasGenerated===false && props.isGenerating) ? <div className="generating">
            <div className="generating-circle"></div>
           {props.showing && <p>
              Generating your Reciept, this might take a while...
            </p>}
        </div> : 
        <div className="actions">
            <button className="sign-tx">
                Mint your CNFT shirt
            </button>
        </div>}
      </div>
    </div>
  )
}

export default PreviewReciept
