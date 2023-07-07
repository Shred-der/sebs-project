import React, { useEffect, useState } from 'react'
import { FaTimes } from 'react-icons/fa'

const PreviewShirt = (props) => {
    const nftImageSrc = props.previewData.imgUrl
    // const nftImageSrc = "https://uploads.laborx.com/gig/thumb_cropped_631x631_LHq07C4aiByeFw6W0O7uI4ziJpgnNLy9.png"
    const [shirtColor, setShirtColor] = useState("black")
    const [verifiedShirtColor, setVerifiedShirtColor] = useState("black")
    const [shirtAnim, setShirtAnim] = useState(true)

    useEffect(()=>{
        setShirtAnim(true)
        setTimeout(()=>{
            setShirtAnim(false)
        }, 500)
        setTimeout(()=>{
            setVerifiedShirtColor(shirtColor)
        }, 300)
    }, [shirtColor])
  return (
    <div className={props.className}>
        <div className="cancel" onClick={props.closePreview}>
            <FaTimes /> Cancel
        </div>
      <div className="content">
        
        <div className="shirts-holder">
            <div className={shirtAnim ? "shirt anim front" : "shirt front"}>
                <img className='nft-img i' src="./CNFTshirt.png" alt="nft" />
                <img className='shirt-img' src={verifiedShirtColor === "white" ? "./shirt-images/white-tee.png" : "./shirt-images/black-tee.png"} alt="tee" />
            </div>
            <div className={shirtAnim ? "shirt anim front" : "shirt front"}>
                <img className='nft-img' src={nftImageSrc} alt="nft" />
                <img className='shirt-img' src={verifiedShirtColor === "white" ? "./shirt-images/white-tee-back.png" : "./shirt-images/black-tee-back.png"} alt="tee" />
                <img src="./blank-qr-code.png" className='qr' alt="qr-code" />
            </div>
        </div>
        <div className="swap-img">
            <div onClick={()=>{
                setShirtColor("white")
            }} className={`${shirtColor === "white" && "active"} white`}></div>
            <div onClick={()=>{
                setShirtColor("black")
            }} className={`${shirtColor === "black" && "active"} black`}></div>
        </div>
      </div>
    </div>
  )
}

export default PreviewShirt
