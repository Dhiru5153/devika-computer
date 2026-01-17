import React, { useEffect, useState } from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import Icon1 from '../../assets/images/icon-1.svg';
import Icon2 from '../../assets/images/icon-2.svg';
import Icon3 from '../../assets/images/icon-3.svg';
import About from '../common/About';
import LatestServices from '../common/LatestServices';
import LatestProjects from '../common/LatestProjects';
import LatestBlogs from '../common/LatestBlogs';
import ShowTestimonials from '../common/ShowTestimonials';
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

export const Home = () => {
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
         {/* Hero Section */}
         <section className='section-1'>
               <div className='hero d-flex align-items-center py-5'>
                  <div className='container-fluid'>
                     <div className='text-center'>
                           <span>Welcome To Devika Computer</span>
                           <h1>Reliable Computer & IT Service Experts</h1>
                           <p>
                              Computer, Laptop, Printer & Accessories Repair
                              Expert Diagnostics & Reliable Solutions
                              CCTV Installation – Analog & IP Camera Systems
                              Fast, Affordable & Trusted IT Support
                           </p>
                           <div className='mt-4'>
                              <a href="/contact" className='btn btn-primary large'>Contact Now</a>
                              <a href="/services" className='btn btn-secondary ms-2 large'>View Services</a>
                           </div>
                     </div>
                  </div>
               </div>
         </section>

         {/* About Us Section */}
         <About/>

         {/* Our Services Section */}
         <LatestServices/>

         {/* Why Choose Us */}
         <section className='section-4 py-5'>
               <div className='container py-5'>
                  <div className='section-header text-center'>
                     <span>Why Choose Us</span>
                     <h2>Discover our wide variety of projects</h2>
                     <p>Discover our wide variety of computer repair, networking, and IT service projects tailored for homes and businesses.</p>
                  </div>
                  <div className='row pt-4'>
                     <div className='col-md-4'>
                           <div className='card shadow border-0 p-4'>
                              <div className='card-icon'>
                                 <img src={Icon1} alt="" />
                              </div>
                              <div className='card-title mt-3'>
                                 <h3>Expert Technicians</h3>
                              </div>
                              <p>Our highly skilled professionals diagnose and fix all types of computer, networking, and IT-related issues with accuracy and expertise.</p>
                           </div>
                     </div>
                     <div className='col-md-4'>
                           <div className='card shadow border-0 p-4'>
                              <div className='card-icon'>
                                 <img src={Icon2} alt="" />
                              </div>
                              <div className='card-title mt-3'>
                                 <h3>Skilled & Professionals</h3>
                              </div>
                              <p>Our team of experts delivers reliable computer repairs, networking solutions, and IT services with precise diagnosis and efficient problem-solving.</p>
                           </div>
                     </div>
                     <div className='col-md-4'>
                           <div className='card shadow border-0 p-4'>
                              <div className='card-icon'>
                                 <img src={Icon3} alt="" />
                              </div>
                              <div className='card-title mt-3'>
                                 <h3>Trusted IT Specialists</h3>
                              </div>
                              <p>Experienced technicians providing fast, accurate, and dependable solutions for computer repair, network setup, and complete IT services.</p>
                           </div>
                     </div>
                  </div>
               </div>
         </section>

         {/* Our Projects Section */}
         <LatestProjects/>

         {/* Testimonials Section */}
         <ShowTestimonials/>

         {/* Blog Section */}
         <LatestBlogs/>
         
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
