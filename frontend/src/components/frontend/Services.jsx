import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';
import { apiUrl, fileUrl } from '../common/http';
import { Link } from 'react-router-dom';
import DefaultImage from '../../assets/images/default-service.jpg';

const Services = () => {
   const[services, setServices] = useState([])
      
   const fetchAllServices = async () => {
      const res = await fetch(apiUrl+'get-services', {
         'method' : 'GET'
      });
      const result = await res.json();
      // console.log(result);
      setServices(result.data);
   }

   useEffect(() => {
      fetchAllServices()
   }, []);

   
   return (
   <>
      <Header />
         <Hero preHeading='Repair. Support. Solutions.'
         heading='Services'
         text='From computer and laptop repairing to CCTV installation, networking, and
               fast technical support — we provide dependable services with expert care.'
         />
         <section className='section-3 bg-light py-5'>
               <div className='container py-5'>
                  <div className='section-header text-center'>
                     <span>Our Services</span>
                     <h2>Our Devika Computer Services</h2>
                     <p>Computer, Laptop, Printer, CCTV, Networking, Repairing And Services</p>
                  </div>
                  <div className='row pt-4'>
                     {
                        services && services.map(service => {
                           return (
                              <div key={`service-${service.id}`} className='col-md-4 col-lg-4'>
                                 <div className='item'>
                                    <div className='service-image'>
                                       {/* <img src={`${fileUrl}uploads/services/small/${service.image}`} alt="" className='w-100' /> */}
                                       <img
                                          src={
                                             service?.image
                                             ? `${fileUrl}uploads/services/small/${service.image}`
                                             : DefaultImage
                                          }
                                          alt=""
                                          className='w-100'
                                       />
                                    </div>
                                    <div className='service-body'>
                                       <div className='service-title'>
                                             <h3>{service.title}</h3>
                                       </div>
                                       <div className='service-content'>
                                             <p>
                                                {service.short_desc}
                                             </p>
                                             <Link to={`/service/${service.id}`} className='btn btn-primary small'>Read More</Link>
                                       </div>
                                    </div>
                                 </div>
                           </div>
                           )
                        })
                     }
                  </div>
               </div>
         </section>
      <Footer />
   </>
   )
}

export default Services