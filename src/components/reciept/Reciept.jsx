import React, { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import QRCode from 'react-qr-code';

const Reciept = (props) => {
    const [receiptImage, setReceiptImage] = useState(null);
    const [imageLoaded, setImageLoaded] = useState(false)

    const nftImageSrc = props.previewData.imgUrl
    const [shirtColor, setShirtColor] = useState("black")
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

    const captureReceipt = async () => {
        console.clear()
        console.log("Please wait.....")
        const receiptDiv = document.getElementById('reciept-element');
        try{
            const canvas = await html2canvas(receiptDiv);
            const imgData = canvas.toDataURL('image/png');
            setReceiptImage(imgData);
            console.log("successful", imgData)
            return imgData;
        } catch {error =>
            console.error(error.message)
        }
    };

  return (
    <div className='reciept-holder' id='reciept'>
        <div className="popup">
            {receiptImage ? <img className='big' src={receiptImage} alt='' /> : <img src="./error-img.png" alt='' />}
            {imageLoaded && <button onClick={captureReceipt}>Capture Reciept as PNG</button>}
        </div>
        <div className="container" id='reciept-element'>
            <section className="heading">
                <div className="logo">
                    <img src="./CNFTshirt.png" alt="" />
                </div>
                <p>
                    CNFT PRINT RECEIPT
                </p>
            </section>
            <section className="shirts-holder">
                <div className="shirt">
                    <img className='shirt-img' src={verifiedShirtColor === "white" ? "./shirt-images/white-tee.png" : "./shirt-images/black-tee.png"} alt="tee" />
                    <img className='logo' src="./CNFTshirt.png" alt="" />
                </div>

                <div className="shirt">
                    <img className='shirt-img back' src={verifiedShirtColor === "white" ? "./shirt-images/white-tee-back.png" : "./shirt-images/black-tee-back.png"} alt="tee" />
                    <img onLoad={()=>{
                        setImageLoaded(true)
                    }} className='nft-img' src={nftImageSrc} alt="nft" />
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
                        <QRCode value={transactionHash} renderAs="canvas" />
                    </div>
                </div>
            </section>
            <section className="tx-details">
                <div className="detail">
                    <h2>Mint Address</h2>
                    <p>
                        0x123456678901234
                    </p>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Reciept
