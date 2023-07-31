import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CardanoWallet } from '@meshsdk/react';
import { useWallet } from '@meshsdk/react';
import { BlockfrostProvider } from '@meshsdk/core';
import styles from "../styles/Signin.module.css";
import Intro from "../components/Intro"
import PreviewShirt from "../components/PreviewShirt"
import SelectNftIntro from "../components/SelectNftIntro"
import Preloader from './Preloader';
import { FaArrowLeft, FaPowerOff, FaQuestion } from 'react-icons/fa';
import AnimatedBackgroundByRicchKidd44 from './AnimatedBackgroundByRicchKidd44';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';


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
  const [showNftIntroI, setShowNftIntro] = useState(true)
  
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
        props.setShowBot(true)
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

  // const [viewNfts, setViewNfts] = useState(false)

  const showshirty = props.showshirty
  console.log(showshirty)
  const renderAssets = () => {
    return (
      <>
        {props.showshirty ? <Swiper className='assets-container-carousel mySwiper' pagination={{
          type: 'progressbar',
        }} navigation={true} modules={[Pagination, Navigation]}>
          {assets.map((asset) => {
            const imageUrl = asset.metadata.image.replace('ipfs://', ''); // Remove the "ipfs://" prefix
            const imageSrc = `https://ipfs.io/ipfs/${imageUrl}`; // Construct the corrected image URL
            return (
              <SwiperSlide className='nft-holder'>
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
              </SwiperSlide>
            );
          })}
        </Swiper> : <div className='assets-container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {assets.map((asset) => {
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
              />
              <h3>{asset.metadata.name}</h3>
              {asset.metadata.description && <p>{asset.metadata.description}</p>}
            </div>
          );
        })}
      </div>}
      </>
    );
  };

  if (!connected) {
    return (
      <>
        <div   className={`${props.showIntro ? "home show-intro": "home"} ${props.showGetStarted ? "home show": "home"}`}>
          <AnimatedBackgroundByRicchKidd44 />
          <Intro hideShirty={props.hideShirty} showBot={props.showBot} setShowBot={props.setShowBot} showIntro={props.showGetStarted} gotoSignIn={gotoSignIn}/>
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
      {props.hideShirty ? <div className={`${showNftIntroI ? "wallet-home show-intro": "wallet-home"}`}>
        <div className="backtoHome" onClick={disconnectWallet}>
          <FaPowerOff /> <p>Disconnect Wallet</p>
        </div>
        <div className="question" onClick={()=>{
          setShowNftIntro(true)
        }}>
          <FaQuestion />
        </div>
        <h1>Welcome, wallet connected!</h1>
        <h2>Select your NFT</h2>
        <div className="soft"></div>
        <SelectNftIntro showIntro={showNftIntroI}  hideShirty={props.hideShirty} gotoSignIn={()=>{
          setShowNftIntro(false)
        }} />
        {renderAssets()}
      </div> : <div className={`${showNftIntroI ? "wallet-home show-intro": "wallet-home"}`}>
        <div className="backtoHome" onClick={disconnectWallet}>
          <FaPowerOff /> <p>Disconnect Wallet</p>
        </div>
        <h1>Welcome, wallet connected!</h1>
        <h2>Select your NFT</h2>
        <div className="soft"></div>
        {renderAssets()}
      </div>}
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
