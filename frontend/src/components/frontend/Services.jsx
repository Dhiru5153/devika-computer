import React, { useEffect, useState } from 'react';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Hero from '../common/Hero';
import { apiUrl, fileUrl } from '../common/http';
import { Link } from 'react-router-dom';
import DefaultImage from '../../assets/images/default-service.jpg';
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

const Services = () => {
   const[services, setServices] = useState([])
   const [loading, setLoading] = useState(true);
      
   const fetchAllServices = async () => {
      const res = await fetch(apiUrl+'get-services', {
         'method' : 'GET'
      });
      const result = await res.json();
      // console.log(result);
      setServices(result.data);
   }

   useEffect(() => {
      fetchAllServices();
      const timer = setTimeout(() => {
         setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
   }, []);

   
   return (
   <>
      <Header />
         <main
            style={{
               filter: loading ? "blur(4px)" : "none",
               transition: "filter 0.3s ease",
               pointerEvents: loading ? "none" : "auto"
            }}
         >
            <Hero preHeading='Repair. Support. Solutions.'
            heading='Our Services'
            text='We offer complete computer and laptop repair, printer services,
               CCTV installation, networking solutions, and reliable technical support
               for homes, offices, and businesses.'
            />
            <section className='section-3 bg-light py-5'>
                  <div className='container py-5'>
                     <div className='section-header text-center'>
                        <span>What We Offer</span>
                        <h2>Devika Computer Services</h2>
                        <p>
                           Trusted computer repair shop providing laptop & desktop repairing,
                           printer solutions, CCTV installation, networking setup,
                           and complete IT support services.
                        </p>
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
      <Footer />
   </>
   )
}

export default Services