import React, { useEffect, useState } from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import {default as AboutNew} from '../common/About';
import Hero from '../common/Hero';
import ShowTestimonials from '../common/ShowTestimonials';
import Team from '../common/Team';
import { Commet } from "react-loading-indicators";

const styles = {
   overlay: {
      position: "fixed",
      inset: 0,
      backgroundColor: "rgba(0,0,0,0.35)",
      backdropFilter: "blur(6px)",
      WebkitBackdropFilter: "blur(6px)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 9999
   }
};

export const About = () => {
   const [loading, setLoading] = useState(true);
   useEffect(() => {
      const timer = setTimeout(() => {
         setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
   }, []);

   return (
      <>
         <Header/>
         <main
            style={{
               filter: loading ? "blur(4px)" : "none",
               transition: "filter 0.3s ease",
               pointerEvents: loading ? "none" : "auto"
            }}
         >
            <Hero preHeading='Innovation. Expertise. Trust.'
            heading='About Us'
            text='We are a trusted computer service and electronics shop providing expert repair solutions
               for computers, laptops, printers, and accessories, along with CCTV installation and complete
               IT support for homes and businesses.'
            />
            <AboutNew/>

            {/* Our Team */}
            <Team/>

            <ShowTestimonials/>

         </main>
         {loading && (
            <div style={styles.overlay}>
               <Commet
               color="#0d6efd"
               size="large"
               text="PLEASE WAIT"
               textColor="#0d6efd"
               />
            </div>
         )}
         <Footer/>
      </>
   )
}
