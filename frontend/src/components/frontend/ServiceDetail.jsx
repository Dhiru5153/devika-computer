import React, { useEffect, useState } from 'react'
import Header from '../common/Header'
import Hero from '../common/Hero';
import Footer from '../common/Footer'
import { Link, useParams } from 'react-router-dom';
import { apiUrl, fileUrl } from '../common/http'
import ShowTestimonials from '../common/ShowTestimonials';
import ReactPlayer from 'react-player'
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

const ServiceDetail = () => {

   const[service, setService] = useState([])
   const[services, setServices] = useState([])
   const params = useParams();
   const [loading, setLoading] = useState(false);
   
   const fetchService = async () => {
      setLoading(true);
      try {
         const res = await fetch(`${apiUrl}get-service/${params.id}`, {
            'method' : 'GET'
         });
         const result = await res.json();
         // console.log(result);
         setService(result.data);
      } catch (error) {
         toast.error("Failed to load service");
      } finally {
         setLoading(false);
      }
   }
   
   const fetchAllServices = async () => {
      const res = await fetch(`${apiUrl}get-services`, {
         'method' : 'GET'
      });
      const result = await res.json();
      // console.log(result);
      setServices(result.data);
   }
   useEffect(() => {
      window.scrollTo({
         top: 0,
         left: 0,
         behavior: "smooth"
      });
      fetchService();
      fetchAllServices();
      
      const timer = setTimeout(() => {
         setLoading(false);
      }, 1500);
      return () => clearTimeout(timer);
   }, [params.id]);


   const videoId = service?.video ? getYoutubeId(service.video) : null;
   const [play, setPlay] = useState(false);
   function getYoutubeId(url) {
      const regExp =
         /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
      const match = url.match(regExp);
      return match ? match[1] : null;
   }

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
            heading={`${service.title}`}
            text=''
            />
            <section className='section-10'>

               <div className='container py-5'>
                  <div className='row'>
                     <div className='col-md-3 mb-3'>
                        <div className='card shadow border-0 sidebar'>
                           <div className='card-body px-4 py-4'>
                              <h3 className='mt-2 mb-3'>Our Services</h3>
                              <ul>
                                 {
                                    services && services.map(service => {
                                       return (
                                          <li key={`service-${service.id}`}>
                                             <Link to={`/service/${service.id}`}>{service.title}</Link>
                                          </li>
                                       )
                                    })
                                 }
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div className='col-md-9'>
                        {/* Video */}
                        <div>
                           {!loading && service.length === 0 && (
                              <div className="text-center py-4">
                                 No service found
                              </div>
                           )}

                           { !loading && service?.video ? (
                              <div className="w-100 h-100">
                                 <div className="ratio ratio-16x9">
                                    <iframe
                                    src={`https://www.youtube.com/embed/${videoId}?autoplay=0`}
                                    title="YouTube video"
                                    allow="autoplay; encrypted-media"
                                    allowFullScreen
                                    ></iframe>
                                 </div>
                              </div>
                           ) :  !loading && service?.image ? (
                              <img
                                 src={`${fileUrl}uploads/services/large/${service.image}`}
                                 alt={service.title || "Service Image"}
                                 className="w-100"
                              />
                           ) : null}
                        </div>
                        {!loading && service?.title && (
                           <h3 className='py-3'>{service.title}</h3>
                        )}
                        {/* <div>
                           {service.short_desc}
                        </div> */}
                        {!loading && service?.content && (
                           <div dangerouslySetInnerHTML={{ __html: service.content }}></div>
                        )}
                     </div>
                  </div>
               </div>
            </section>
            <section className='section-11 bg-light'>
               <ShowTestimonials/>
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
         <Footer/>
      </>
   )
}

export default ServiceDetail