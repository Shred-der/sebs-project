import React, { useEffect, useState } from 'react'
import {FaArrowLeft, FaArrowRight} from "react-icons/fa"
import {AppWallet, AssetMetadata, Transaction, largestFirst, Mint, ForgeScript,
} from '@meshsdk/core'
import { CardanoWallet, useWallet } from '@meshsdk/react';
import { createTransaction } from "../../backend/index.ts";
import  { NextApiRequest, NextApiResponse } from "next";
import { KoiosProvider } from "@meshsdk/core";







const PreviewReciept = (props) => {

  const { connected } = useWallet();

  const wallet = props.wallet


  // this function is to create the transaction (im not too sure but)
  const sendReciept = async (previewData)=>{
    console.clear()
    console.log(previewData)

    const recipientAddress = await wallet.getChangeAddress();
    const utxos = await wallet.getUtxos();

    const koiosProvider = new KoiosProvider("preprod");
    const appWallet = new AppWallet({
      networkId: 0,
      fetcher: koiosProvider,
      submitter: koiosProvider,
      key: {
        type: "mnemonic",
        words: [
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
          "solution",
        ],
      },
    });
  
    // minting script
    const appWalletAddress = appWallet.getPaymentAddress();
    const forgingScript = ForgeScript.withOneSignature(appWalletAddress);
  

    const assetName = "TX Reciept"

    // const [address, setAddress] = useState(null)
    
    // useEffect(()=>{
    //   const address = useAddress(accountId = 0);
    //   setAddress(addressX)
    // },[])

    const assetMetadata ={
      name: 'TX Reciept',
      image: props.recieptImage ? props.rec :  "",
      mediaType: 'image/jpg',
      description: 'This NFT was minted by Sebs project',
      shippingDetails: {

        // this should be changed to take props data from the user shipping details form component  
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
// this should track the price of lovelace too the dollar and it shoukd always equal 40dollars
    const costLovelace = '1000000';
    const selectedUtxos = largestFirst(costLovelace, utxos, true);
    const bankWalletAddress = 'addr_test1qzmwuzc0qjenaljs2ytquyx8y8x02en3qxswlfcldwetaeuvldqg2n2p8y4kyjm8sqfyg0tpq9042atz0fr8c3grjmysm5e6yx';


    // check how to intiate the miniting process and if this create transaction (this )
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
                {connected ? <MintSection /> : <CardanoWallet />}
            </button>
        </div>}
      </div>
    </div>
  )
}

export default PreviewReciept


function MintSection() {
  const koiosProvider = new KoiosProvider("preprod");

  const { wallet } = useWallet();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [txHash, setTxHash] = useState(undefined);

  async function startMinting() {
    setSuccess(false);
    setTxHash(undefined);
    setLoading(true);
    const recipientAddress = await wallet.getChangeAddress();
    const utxos = await wallet.getUtxos();
    console.log("starting minting", { recipientAddress, utxos });
    const { unsignedTx } = await createTransaction(recipientAddress, utxos);

    const signedTx = await wallet.signTx(unsignedTx, true);
    const txHash = await wallet.submitTx(signedTx);
    console.log({ txHash });
    setLoading(false);
    setTxHash(txHash);

    koiosProvider.onTxConfirmed(txHash, () => {
      console.log("Transaction confirmed");
      setSuccess(true);
    });
  }

  return (
    <>
      {txHash ? (
        <>
          <p>
            <b>Tx Hash:</b>
            <br />
            {txHash}
          </p>
          {success ? (
            <p>Transaction confirmed</p>
          ) : (
            <p>Waiting confirmation...</p>
          )}
        </>
      ) : (
        <button
          type="button"
          onClick={() => startMinting()}
          disabled={loading}
          style={{
            fontSize: "20px",
            margin: "16px",
            padding: "10px",
            backgroundColor: loading ? "orange" : "grey",
          }}
        >
         {loading ? (
            <p>Minting started</p>
          ) : (
            <p>Mint Now!</p>
          )}
        </button>
      )}
    </>
  );
}