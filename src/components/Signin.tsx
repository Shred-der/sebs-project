import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CardanoWallet } from '@meshsdk/react';
import { useWallet } from '@meshsdk/react';
import { BlockfrostProvider } from '@meshsdk/core';
import styles from "../styles/Signin.module.css";
import Intro from "../components/Intro"
import PreviewShirt from "../components/PreviewShirt"
import Preloader from './Preloader';
import { FaArrowLeft, FaPowerOff } from 'react-icons/fa';
import AnimatedBackgroundByRicchKidd44 from './AnimatedBackgroundByRicchKidd44';

interface AssetMetadata {
  name: string;
  image: string;
  description: string; // Added description property
}

interface Asset {
  unit: string;
  metadata: AssetMetadata;
}


export default function SignIn(props:any) {
  const { connected, wallet } = useWallet();
  const [loading, setLoading] = useState(false);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [showPreview, setShowPreview] = useState(false)
  const [previewData, setPreviewData] = useState({
    unit: "",
    imgUrl: ""
  })
  const blockfrostProvider = new BlockfrostProvider('mainnet50pMKefWQffC8MUvi6pD9dBZZH3RcDQB');
  
  function gotoSignIn(){
    props.gotoSignIn()
  }

  const openPreview = (unit:any, imgUrl:any)=>{
    setPreviewData({
      unit: unit,
      imgUrl: imgUrl
    })
    setShowPreview(true)
  }
  
  useEffect(() => {
    const fetchAssets = async () => {
      if (connected) {
        setLoading(true);
        const assetList = await wallet.getAssets();
        const assetData: Asset[] = await Promise.all(
          assetList.map(async (asset): Promise<Asset> => {
            const metadata: AssetMetadata = await blockfrostProvider.fetchAssetMetadata(asset.unit);
            return { ...asset, metadata };
          })
        );
        setAssets(assetData);
        setLoading(false);
      }
    };
    fetchAssets();
  }, [connected]);

  function disconnectWallet(){
    window.location.reload()
  }

  const renderAssets = () => {
    return (
      <div className='assets-container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {assets.map((asset) => {
          // console.log(asset.unit)
          const imageUrl = asset.metadata.image.replace('ipfs://', ''); // Remove the "ipfs://" prefix
          const imageSrc = `https://ipfs.io/ipfs/${imageUrl}`; // Construct the corrected image URL
          return (
            <div onClick={()=>{
              const unit=asset.unit
              console.log(asset)
              openPreview(unit, imageSrc)
            }} key={asset.unit} style={{ margin: '10px' }}>
              <img
                src={imageSrc}
                alt={asset.metadata.name}
                style={{ width: '200px', height: '200px', objectFit: 'cover' }}
              />
              <h3>{asset.metadata.name}</h3>
              {asset.metadata.description && <p>{asset.metadata.description}</p>}
            </div>
          );
        })}
      </div>
    );
  };

  if (!connected) {
    return (
      <>
        <div   className={`${props.showIntro ? "home show-intro": "home"} ${props.showGetStarted ? "home show": "home"}`}>
          <AnimatedBackgroundByRicchKidd44 />
          <Intro showIntro={props.showGetStarted} gotoSignIn={gotoSignIn}/>
          <div className="backtoHome" onClick={props.backtoHomePage}>
            <FaArrowLeft />
          </div>
          <div className="content">
            <div>
              <h1>Print Your CNFT Shirt</h1>
            </div>
            <div>
              <h1>Connect your Wallet to Print</h1>
              <h2>CNFT PRINTING</h2>
              <CardanoWallet />
            </div>
            <div className="illustration-guy">
              <img src="./CNFTshirt.png" alt="logo" />
            </div>
          </div>
        </div>
      </>
    );
  }

  if (loading) {
    return <Preloader className="preloader show black"/>;
  }
  
  return (
    <>
      <div className='wallet-home'>
        <div className="backtoHome" onClick={disconnectWallet}>
          <FaPowerOff /> <p>Disconnect Wallet</p>
        </div>
        <h1>Welcome, wallet connected!</h1>
        <h2>Select your NFT</h2>
        <div className="soft"></div>
        {renderAssets()}
      </div>
      <PreviewShirt closePreview={()=>{
        setShowPreview(false)
        setPreviewData({
          unit:"",
          imgUrl: ""
        })
      }} previewData={previewData} className={showPreview ? "preview-shirt show": "preview-shirt"}/>
    </>
  );
}
