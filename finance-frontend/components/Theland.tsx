import React, { useRef } from "react";
import Sec1 from "../SingelComponent/Sec1";
import Sec2 from "../SingelComponent/Sec2";
import Feedback from "../SingelComponent/Feedback";
import AboutCompany from "../SingelComponent/AboutCompany";
import Crew from "../SingelComponent/Cru";
import Footer from "../SingelComponent/Fotter";
import NavBar from "../SingelComponent/Nav";

const Theland = () => {
  const aboutRef = useRef<HTMLDivElement>(null);

  const scrollToAbout = () => {
    aboutRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <NavBar onAboutClick={scrollToAbout} />
      <Sec1 />
      <Sec2 />

      <Feedback />
      <div ref={aboutRef}>
        <AboutCompany />
      </div>
      <Crew />
      <Footer />
    </div>
  );
};

export default Theland;
