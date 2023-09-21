import React, { useEffect, useState } from 'react'
import { FaCheck, FaInfo, FaTimes } from 'react-icons/fa'
import QRCode from 'react-qr-code'

const PreviewShirt = (props) => {
    const nftImageSrc = props.previewData.imgUrl
    const [shirtColor, setShirtColor] = useState("white")
    const [verifiedShirtColor, setVerifiedShirtColor] = useState("black")
    const [shirtAnim, setShirtAnim] = useState(true)

    const [formattedDate, setFormattedDate] = useState('');
    
    const [transactionHash, setTransactionHash] = useState("https://explorer.cardano.org/en/transaction")

    const previewData = props.previewData

    useEffect(() => {
        const currentDate = new Date();
        
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = String(currentDate.getFullYear()).slice(-2);
    
        const dateString = `${day}/${month}/${year}`;
    
        setFormattedDate(dateString);
    }, []); // Empty dependency array ensures this runs only on mount.
    

    useEffect(()=>{
        setTransactionHash((prev)=>{
          if(previewData && previewData.asset && previewData.asset.assetDetails) {
            const transactionHash = previewData.asset.assetDetails.initial_mint_tx_hash;
            if(transactionHash){
              return `https://explorer.cardano.org/en/transaction?id=${transactionHash}`;
            } 
          }
          return "https://explorer.cardano.org/en/transaction";
        });
    },[previewData, props.className])
      

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
        <div className="info">
            <p>
                Shirt Preview
            </p>
            <div className="drop">
                <FaInfo />
                <div className="info-content">
                    <p>
                        Click the QRcode to make it visible for scanning 👍
                    </p>
                </div>
            </div>
        </div>
        <div className="shirts-holder">
            <div className={shirtAnim ? "shirt anim front" : "shirt front"}>
                <img className='nft-img i' src="./CNFTshirt.png" alt="nft" />
                <img className='shirt-img' src={verifiedShirtColor === "white" ? "./shirt-images/white-tee.png" : "./shirt-images/black-tee.png"} alt="tee" />
            </div>
            <div className={shirtAnim ? "shirt anim front" : "shirt front back"}>
                <img className='nft-img' src={nftImageSrc} alt="nft" />
                <img className='shirt-img' src={verifiedShirtColor === "white" ? "./shirt-images/white-tee-back.png" : "./shirt-images/black-tee-back.png"} alt="tee" />
                    <div className={verifiedShirtColor === "white" ? "details" : "details white-text"}>
                        <h2>
                            {props.previewData?.asset?.metadata?.name && props.previewData.asset.metadata.name}
                        </h2>
                        <p className='fingerprint'>
                        {props.previewData?.asset?.fingerprint && props.previewData.asset.fingerprint}
                        </p>
                        <p className='mint-date'>
                            CNFT shirt minted on: <span>{formattedDate}</span>
                        </p>
                        <p className='tx-hash'>
                            {previewData?.asset?.assetDetails?.initial_mint_tx_hash && previewData.asset.assetDetails.initial_mint_tx_hash}
                        </p>
                        <QRCode value={transactionHash} />
                    </div>
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
        <div className="actions">
            <button onClick={()=>{
                const info = {
                    productInfo: {
                      type: "shirt",
                      color: verifiedShirtColor,
                      size: "normal",
                    },
                    nftInfo: {
                      name: previewData.asset.metadata.name,
                      txHash: transactionHash,
                      imgUrl: previewData.imgUrl,
                    }
                }
                props.updatePreviewData({
                    type: "shirt",
                    color: verifiedShirtColor,
                    size: "medium",
                    variant: "default",
                })
                props.openDetails(info)
            }} className="proceed">Proceed <FaCheck /> </button>
        </div>
      </div>
    </div>
  )
}

export default PreviewShirt
