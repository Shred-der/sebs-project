import React, {useState} from 'react'
import Carousel from "./Carousel"
import "swiper/css"
import Holder from "./Holder"
import {HiSparkles} from "react-icons/hi"
import AnimatedBackgroundByRicchKidd44 from "../components/AnimatedBackgroundByRicchKidd44"

const HomePageBig = (props) => {
    const [currentHolder, setCurrentHolder] = useState("i")
  return (
    <div className={props.className}>
      <AnimatedBackgroundByRicchKidd44 />
        <button className="mint-nft" onClick={props.goToGetStarted}>
            Print NFT Shirt <HiSparkles />
        </button>
      <div className='content-all'>
        <div className="logo">
            <img width={100} src="./CNFTshirt.png" alt="logo" />
        </div>
        <div className="nav">
            <button onClick={()=>{
                setCurrentHolder("i")
            }} className={` ${currentHolder === "i" && "active"}`}>
                Project Info
            </button>
            <button onClick={()=>{
                setCurrentHolder("ii")
            }} className={` ${currentHolder === "ii" && "active"}`}>
                Verified Projects
            </button>
            <button onClick={()=>{
                setCurrentHolder("iii")
            }} className={` ${currentHolder === "iii" && "active"}`}>
                Sustainable T-Shirts
            </button>
            <button onClick={()=>{
                setCurrentHolder("iv")
            }} className={` ${currentHolder === "iv" && "active"}`}>
                Locally printed
            </button>
            <button onClick={()=>{
                setCurrentHolder("v")
            }} className={` ${currentHolder === "v" && "active"}`}>
                CO2 neutrally shipped
            </button>
        </div>
        <div className={`container ${currentHolder === "i" && "showing-i"} ${currentHolder === "ii" && "showing-ii"} ${currentHolder === "iii" && "showing-iii"} ${currentHolder === "iv" && "showing-iv"} ${currentHolder === "v" && "showing-v"}`}>
            <Holder className={"holder i"} />
            <Holder className={"holder ii"} />
            <Holder className={"holder iii"} />
            <Holder className={"holder iv"} />
            <Holder className={"holder v"} />
        </div>
        <div className="links-holder">
            Social Media and Mail Contact Link
        </div>
      </div>
    </div>
  )
}

export default HomePageBig
