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

export const Home = () => {


   return (
   <>
      <Header/>
      <main>
         {/* Hero Section */}
         <section className='section-1'>
               <div className='hero d-flex align-items-center py-5'>
                  <div className='container-fluid'>
                     <div className='text-center'>
                           <span>Welcome To Devika Computer</span>
                           <h1>The most trusted computer and electronics shop</h1>
                           <p>
                              New Computer, Laptop, Printer & Accessories
                              <br/>Repairing with Expert Touch
                              <br/>CCTV Installation - Analog & IP Cameras
                              <br/>Fast & Reliable Computer Support
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
      <Footer/>
   </>
   )
}
