import React from 'react'
import Carousel from './Carousel'

const Holder = (props) => {
  return (
    <div className={props.className}>
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
  )
}

export default Holder
