import React, { useEffect } from 'react'
import {FaArrowLeft, FaArrowRight} from "react-icons/fa"
import { AssetMetadata, Transaction, largestFirst } from '@meshsdk/core'
import { CardanoWallet } from '@meshsdk/react';
import { useWallet } from '@meshsdk/react';

const PreviewReciept = (props) => {
  const wallet = props.wallet
  const sendReciept = async (previewData)=>{
    console.clear()
    console.log(previewData)

    const assetName = "TX Reciept"

    const [address, setAddress] = useState(null)
    
    useEffect(()=>{
      const addressX = useAddress(accountId = 0);
      setAddress(addressX)
    },[])

    const assetMetadata ={
      name: 'TX Reciept',
      image: props.recieptImage?props.rec:"",
      mediaType: 'image/jpg',
      description: 'This NFT was minted by Sebs project',
      shippingDetails: {
        country: "united states",
        state: "washington dc",
        street: "maddison ave",
      }
    };

    const asset = {
      assetName: assetName,
      assetQuantity: '1',
      metadata: assetMetadata,
      label: '721',
      recipient: recipientAddress,
    };

    console.log(asset)

    const costLovelace = '10000000';
    const selectedUtxos = largestFirst(costLovelace, utxos, true);
    const bankWalletAddress = 'addr_test1qzmwuzc0qjenaljs2ytquyx8y8x02en3qxswlfcldwetaeuvldqg2n2p8y4kyjm8sqfyg0tpq9042atz0fr8c3grjmysm5e6yx';

    const tx = new Transaction({ initiator: appWallet });
    tx.setTxInputs(selectedUtxos);
    tx.mintAsset(forgingScript, asset);
    tx.sendLovelace(bankWalletAddress, costLovelace);
    tx.setChangeAddress(recipientAddress);
    const unsignedTx = await tx.build();
  }

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
            <button style={{cursor:"pointer"}} className="sign-tx" onClick={()=>{
              if(props.wallet && props.previewData){
                sendReciept( props.previewData)
              } else{
                console.log("Failed to compile metadata")
              }
            }}>
                Mint your CNFT shirt
            </button>
        </div>}
      </div>
    </div>
  )
}

export default PreviewReciept
