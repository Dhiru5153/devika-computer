import React from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import {default as AboutNew} from '../common/About';
import Hero from '../common/Hero';
import ShowTestimonials from '../common/ShowTestimonials';
import Team from '../common/Team';

export const About = () => {
   return (
      <>
         <Header/>
         <main>
               <Hero preHeading='Innovation. Expertise. Trust.'
               heading='About Us'
               text='We specialize in repairing computers, laptops, printers, and accessories with expert precision, 
                  along with reliable CCTV installations and complete IT support for homes and businesses.'
               />
               <AboutNew/>

               {/* Our Team */}
               <Team/>

               <ShowTestimonials/>

         </main>
         <Footer/>
      </>
   )
}
