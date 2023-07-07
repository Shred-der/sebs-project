import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import {BiLinkExternal} from "react-icons/bi"

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import './styles.css';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function Carousel() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  const verifiedProjects = [
    {
      projectName: "CardanoKidz",
      projectImgUrl: "./verified-projects/cardanokidz.png",
      projectUrl: "https://www.cardanocube.io/projects/cardanokidz"
    },
    {
      projectName: "Spacebudz",
      projectImgUrl: "./verified-projects/space-budz.png",
      projectUrl: "https://spacebudz.io/"
    },
    {
      projectName: "CardanoBits",
      projectImgUrl: "./verified-projects/cardanobitz.png",
      projectUrl: "https://cardanobits.art/"
    },
  ]

  const verifiedProjectsEl = verifiedProjects.map((project)=>{
    return (
      <SwiperSlide>
        <p>
          {project.projectName}
          <a href={project.projectUrl} target="_blank" rel="noreferrer">
            <BiLinkExternal />
          </a>
        </p>
        <img src={project.projectImgUrl} alt="image" />
      </SwiperSlide>
    )
  })
  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        {verifiedProjectsEl}
        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}
