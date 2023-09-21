import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { CardanoWallet } from '@meshsdk/react';
import { useWallet } from '@meshsdk/react';
import { BlockfrostProvider } from '@meshsdk/core';
import styles from "../styles/Signin.module.css";
import Intro from "../components/Intro"
import PreviewShirt from "../components/PreviewShirt"
import PreviewReciept from "../components/PreviewReciept"
import SelectNftIntro from "../components/SelectNftIntro"
import Preloader from './Preloader';
import { FaArrowLeft, FaPowerOff, FaQuestion } from 'react-icons/fa';
import AnimatedBackgroundByRicchKidd44 from './AnimatedBackgroundByRicchKidd44';
import SwiperComponentErrorFix from './SwiperComponentErrorFix';
import Reciept from "../components/reciept/Reciept"
import UserForm from "../components/UserForm"
import UserDetails from "../components/UserDetails"
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import html2canvas from 'html2canvas';


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
    asset: {},
    imgUrl: "",
    itemDetails: {
      type: "shirt",
      color: "white",
      size: "medium",
      variant: "default",
    },
  })
  const [userInfo, setUserInfo] = useState({
    saved: false,
    shipping: {
      country: "USA",
      city: "New York",
      discordUrl: "",
      emailAddress: "",
      address: "",
      markedLocation: {
        longitude: 0,
        latitude: 0,
      }
    },
  })

  const updatePreviewData = (itemDetails:any)=>{
    setPreviewData((prev)=>{
      return ({
        ...prev,
        itemDetails: itemDetails,
      })
    })
  }

  const updateUser = (data:any)=>{
    setUserInfo(()=>{
      return ({
        saved: true,
        shipping: data.shipping,
      })
    })
  }

  const clearUser = ()=>{
    setUserInfo(()=>{
      return ({
        saved: false,
        shipping: {
          country: "USA",
          city: "New York",
          discordUrl: "",
          emailAddress: "",
          address: "",
          markedLocation: {
            longitude: 0,
            latitude: 0,
          }
        },
      })
    })
  }

  const blockfrostProvider = new BlockfrostProvider('mainnet50pMKefWQffC8MUvi6pD9dBZZH3RcDQB');
  const [showNftIntroI, setShowNftIntro] = useState(true)

  const [mintProcess, setMintProcess] = useState({
    showPreviewShirt: false,
    showReciept: false,
    showForm: false,
    disableForm: false,
    showDetails: false,
    reciept: {
      recieptImg: "",
      hasFetched: false,
      isFetching: false,
      assetInfo: {
        name: "",
        desc: "",
        todayDate: "",
        shippingDate: "",
        txHash: "",
        nftImgUrl: "",
        product: {
          type: "shirt",
          color: "white",
          size: "normal",
        },
      }
    }
  })

  const [recieptImage, setRecieptImage] = useState("")

  const [selectedAsset, setSelectedAsset] = useState(null)

  const captureReceipt = async () => {
    console.clear()
    console.log("Please wait.....")
    try{
      const receiptDiv = document.getElementById('reciept-element');
      if(receiptDiv){
        const canvas = await html2canvas(receiptDiv);
      const imgData = canvas.toDataURL('image/png');
      console.clear()
      console.log("successful", imgData)
      if(imgData){
        setRecieptImage(imgData)
      }
      setMintProcess((prev)=>{
        return ({
          ...prev,
          reciept: {
            ...prev.reciept,
            recieptImg: imgData,
            hasFetched: true,
            isFetching: false,
          }
        })
      })
      return imgData;
      }else{
        console.error("didn't find reciept")
      }
    } catch {
      console.error("AN error occured")
    }
  };

  const clearRecieptData = ()=>{
    setTimeout(()=>{
      setMintProcess((prev)=>{
        return ({
          ...prev,
          reciept: {
            recieptImg: "",
            hasFetched: false,
            isFetching: false,
            assetInfo: {
              name: "",
              desc: "",
              todayDate: "",
              shippingDate: "",
              txHash: "",
              nftImgUrl: "",
              product: {
                type: "shirt",
                color: "white",
                size: "normal",
              },
            }
          }
        })
      })
    }, 500)
  }

  function generateReciept(info:any){
    console.log(info)
    const nftInfo = info.nftInfo
    const productInfo = info.productInfo
    captureReceipt()
    setMintProcess((prev)=>{
      return ({
        ...prev,
        reciept: {
          ...prev.reciept,
          recieptImg: "",
          hasFetched: false,
          isFetching: true,
          assetInfo: {
            name: nftInfo.name,
            desc: "...",
            todayDate: "DD/MM/YY",
            shippingDate: "DD/MM/YY",
            txHash: nftInfo.txHash,
            nftImgUrl: nftInfo.imgUrl,
            product: {
              type: productInfo.type,
              color: productInfo.color,
              size: productInfo.size,
            },
          }
        }
      })
    })
  }
  
  function gotoSignIn(){
    props.gotoSignIn()
  }

  const openPreview = (assetData:any, imgUrl:any)=>{
    setPreviewData(
      (prev)=>{
        return ({
          ...prev,
          asset: assetData,
          imgUrl: imgUrl
        })
      }
    )
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
            console.log(asset.unit); // log the asset unit
            const metadata: AssetMetadata = await blockfrostProvider.fetchAssetMetadata(asset.unit);
  
            // Fetch asset details from Blockfrost
            const assetDetailsResponse = await fetch(`https://cardano-mainnet.blockfrost.io/api/v0/assets/${asset.unit}`, {
              headers: {
                'project_id': 'mainnet50pMKefWQffC8MUvi6pD9dBZZH3RcDQB'
              }
            });
            const assetDetails = await assetDetailsResponse.json();
  
            console.log(assetDetails); // log the asset details
  
            return { ...asset, metadata, assetDetails: assetDetails };
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
      <>
        {props.showshirty ? <><SwiperComponentErrorFix assets={assets} openPreview={openPreview} /></> : <div className='assets-container' style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {assets.map((asset) => {
          const imageUrl = asset.metadata.image.replace('ipfs://', ''); // Remove the "ipfs://" prefix
          const imageSrc = `https://ipfs.io/ipfs/${imageUrl}`; // Construct the corrected image URL
          return (
            <div onClick={()=>{
              const assetData=asset
              console.clear()
              console.log(assetData)
              openPreview(assetData, imageSrc)
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
    <div className={`big-holder ${mintProcess.showForm ? "show-form" : ""} ${mintProcess.showDetails ? "show-details" : ""} ${mintProcess.showReciept ? "show-reciept" : ""}`}>

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
      
      <div className={showPreview ? "backdrop show": "backdrop"}></div>
      
      <PreviewShirt closePreview={()=>{
        setShowPreview(false)
        setPreviewData((prev)=>{
          return ({
            ...prev,
            asset:"",
            imgUrl: ""
          })
        })
      }} openDetails={(info:any)=>{
        if(mintProcess.disableForm){
          setMintProcess((prev)=>{
            return({
              ...prev,
              showPreviewShirt: false,
              showForm: false,
              showDetails: true,
            })  
          })
        } else{
          setMintProcess((prev)=>{
            return({
              ...prev,
              showForm: true,
              showDetails: false,
              showPreviewShirt: false,
            })  
          })
        }

        setSelectedAsset(info)
      }} previewData={previewData} className={showPreview ? "preview-shirt show": "preview-shirt"} updatePreviewData={updatePreviewData}/>
      
      <UserForm info={selectedAsset} openUserDetails={()=>{
        setMintProcess((prev)=>{
          return({
            ...prev,
            showForm: false,
            showDetails: true,
          })
        })
      }} closeUserForm={()=>{
        setMintProcess((prev)=>{
          return({
            ...prev,
            showForm: false,
            showDetails: false,
            showPreviewShirt: true,
          })
        })
      }} />
      
      <UserDetails info={selectedAsset} closeUserDetails={()=>{
        if(mintProcess.disableForm){
          setMintProcess((prev)=>{
            return({
              ...prev,
              showForm: false,
              showDetails: false,
              showPreviewShirt: true
            })  
          })
        } else{
          setMintProcess((prev)=>{
            return({
              ...prev,
              showForm: true,
              showDetails: false,
              showPreviewShirt: false,
            })  
          })
        }
      }} openReciept={(info:any)=>{
        setMintProcess((prev)=>{
          return({
            ...prev,
            showForm: false,
            showDetails: false,
            showPreviewShirt: false,
            showReciept: true,
          })
        })

        generateReciept(info)
      }} />
      
      <Reciept previewData={previewData} />
      
      <PreviewReciept showing={mintProcess.showReciept} closeReciept={()=>{
        setMintProcess((prev)=>{
          return({
            ...prev,
            showReciept: false,
            showDetails: true,
            showForm: false,
            showPreviewShirt: false,
          })
        })
        clearRecieptData()
      }} wallet={wallet} previewData={previewData} isGenerating={mintProcess.reciept.isFetching} hasGenerated={mintProcess.reciept.hasFetched} recieptImage={recieptImage} />
    
    </div>
  );
}