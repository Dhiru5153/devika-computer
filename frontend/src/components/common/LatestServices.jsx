import React, { useEffect, useState } from 'react'
import { apiUrl, fileUrl, token } from '../common/http';
import { Link } from 'react-router-dom';
import DefaultImage from '../../assets/images/default-service.jpg';



const LatestServices = () => {
   const[services, setServices] = useState([])
   
   const fetchLatestServices = async () => {
      const res = await fetch(apiUrl+'get-latest-services?limit=4', {
         'method' : 'GET'
      });
      const result = await res.json();
      // console.log(result);
      setServices(result.data);
   }

   useEffect(() => {
      fetchLatestServices()
   }, []);
   return (
      <>
         <section className='section-3 bg-light py-5'>
               <div className='container-fluid py-5'>
                  <div className='section-header text-center'>
                     <span>Our Services</span>
                     <h2>Our Devika Computer Services</h2>
                     <p>Computer, Laptop, Printer, CCTV, Networking, Repairing And Services</p>
                  </div>
                  <div className='row pt-4'>
                     {
                        services && services.map(service => {
                           return (
                              <div key={`service-${service.id}`} className='col-md-3 col-lg-3'>
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
      </>
   )
}

export default LatestServices