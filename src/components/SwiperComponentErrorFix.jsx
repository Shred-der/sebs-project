import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';

const SwiperComponentErrorFix = ({assets, openPreview}) => {
  return (
    <>
      <Swiper className='assets-container-carousel mySwiper' pagination={{
          type: 'progressbar',
        }} navigation={true} modules={[Pagination, Navigation]}>
          {assets.map((asset, index) => {
            const imageUrl = asset.metadata.image.replace('ipfs://', ''); // Remove the "ipfs://" prefix
            const imageSrc = `https://ipfs.io/ipfs/${imageUrl}`; // Construct the corrected image URL
            return (
              <SwiperSlide key={index} className='nft-holder'>
                <div onClick={()=>{
              const assetData=asset
              console.clear()
              console.log(assetData)
              openPreview(assetData, imageSrc)
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
        </Swiper>
    </>
  )
}

export default SwiperComponentErrorFix
