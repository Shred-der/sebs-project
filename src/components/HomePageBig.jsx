import React from 'react'
import Carousel from "./Carousel"
import "swiper/css"
import {HiSparkles} from "react-icons/hi"

const HomePageBig = (props) => {
  return (
    <div className={props.className}>
        <button className="mint-nft" onClick={props.goToGetStarted}>
            Mint NFT <HiSparkles />
        </button>
      <div className="content-all">
        <div className="logo">
            <img width={100} src="./CNFTshirt.png" alt="logo" />
        </div>
        <div className="nav">
            <button>
                Project Info
            </button>
            <button>
                Verified Projects
            </button>
            <button>
                Sustainable T-Shirts
            </button>
            <button>
                Locally printed
            </button>
            <button>
                CO2 neutrally shipped
            </button>
        </div>
        <div className="holder">
            <div className="verified-projects">
                <div className="carousel">
                    <Carousel />
                </div>
                <button>
                    Verify your Project
                </button>
            </div>

            <div className="mint-tracker">
                <div className="details">
                    Mint Tracker (Number)

                    Last Minted (Date)
                </div>

                <div className="visuals">
                    <div className="picture i">
                        Picture of Last Mint 1
                    </div>
                    <div className="picture ii">
                        Picture of Last Mint 2
                    </div>
                </div>
            </div>
        </div>
        <div className="links-holder">
            Social Media and Mail Contact Link
        </div>
      </div>
    </div>
  )
}

export default HomePageBig
