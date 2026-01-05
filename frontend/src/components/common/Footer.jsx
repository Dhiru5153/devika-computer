import React, { useEffect, useState } from 'react'
import { apiUrl, token } from './http';

const Footer = () => {
   const [services, setServices] = useState([]);

   const fetchServices = async () =>{
      const res = await fetch(apiUrl+'get-services', {
         'method' : 'GET'
      });
      const result = await res.json();
      setServices(result.data);
   }

   useEffect(() => {
      fetchServices();
   }, []);

   return (
   <footer>
      <div className='container py-5'>
         <div className='row'>
               <div className='col-md-3'>
                  <h3 className='mb-3'>Devika Computers</h3>
                  <div className='pe-5'>
                     <p>Near Bank of Baroda, Main Road Bagbahara, Mahasamund (C.G.)</p>
                  </div>
               </div>
               <div className='col-md-3'>
                  <h3 className='mb-3'>Our Services</h3>
                  <ul>
                     {
                        services && services.map(service => {
                           return (
                              <li key={`service-${service.id}`}>
                                 <a href={`/service/${service.id}`}>{service.title}</a>
                              </li>
                           )
                        })
                     }
                  </ul>
               </div>
               <div className='col-md-3'>
                  <h3 className='mb-3'>Quick Links</h3>
                  <ul>
                     <li>
                        <a href='/'>Home</a>
                     </li>
                     <li>
                        <a href='/about'>About Us</a>
                     </li>
                     <li>
                        <a href='/services'>Services</a>
                     </li>
                     <li>
                        <a href='/projects'>Projects</a>
                     </li>
                     <li>
                        <a href='blogs'>Blog</a>
                     </li>
                     <li>
                        <a href='/contact'>Contact Us</a>
                     </li>
                  </ul>
               </div>
               <div className='col-md-3'>
                  <h3 className='mb-3'>Contact Us</h3>
                  <ul>
                     <li>
                        <a href='tel:+919669155746'>
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone" viewBox="0 0 16 16">
                              <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.6 17.6 0 0 0 4.168 6.608 17.6 17.6 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.68.68 0 0 0-.58-.122l-2.19.547a1.75 1.75 0 0 1-1.657-.459L5.482 8.062a1.75 1.75 0 0 1-.46-1.657l.548-2.19a.68.68 0 0 0-.122-.58zM1.884.511a1.745 1.745 0 0 1 2.612.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"/>
                           </svg> +91 96691-55746
                        </a>
                     </li>
                     <li>
                        <a href="https://wa.me/919669155746?text=Hello%20Devika%20Computers%2C%20I%20am%20interested%20in%20your%20services%20(New%20Computers%2FLaptops%2FPrinters%2FAccessories%2C%20Repairs%2C%20CCTV%20Installation%2C%20or%20Computer%20Support).%20Please%20provide%20more%20details.%20Thank%20you!" target="_blank">
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                              <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                           </svg> +91 96691-55746
                        </a>
                     </li>
                     <li>
                        {/* <a href='https://mail.google.com/mail/?view=cm&fs=1&to=devika@example.com' target='_blank'> */}
                        <a href='mailto:devika.computer1312@gmail.com'>
                           <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope" viewBox="0 0 16 16">
                              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"/>
                           </svg> devika.computer1312@gmail.com
                        </a>
                     </li>
                     <li>
                           <p>Near Bank of Baroda, Main Road Bagbahara, Mahasamund (C.G.)</p>
                     </li>
                  </ul>
               </div>
               <hr />
               <div className='text-center pt-4'>© 2025 Devika Computers. All Rights Reserved.</div>
         </div>
      </div>
   </footer>
   )
}

export default Footer