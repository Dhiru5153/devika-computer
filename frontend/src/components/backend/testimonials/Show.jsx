import React, { useEffect, useState } from 'react'
import Header from '../../common/Header'
import Footer from '../../common/Footer'
import Sidebar from '../../common/Sidebar'
import { apiUrl, token } from '../../common/http'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
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

const Show = () => {
   const [testimonials, setTestimonials] = useState([]);
   const [loading, setLoading] = useState(false);

   const fetchTestimonials = async () =>{
      setLoading(true);
      try {
         const res = await fetch(apiUrl+'testimonials', {
            'method' : 'GET',
            'headers' : {
               'Content-type' : 'application/json',
               'Accept' : 'application/json',
               'Authorization' : `Bearer ${token()}`
            }
         });
         const result = await res.json();
         setTestimonials(result.data);
      } catch (error) {
         toast.error("Failed to load testimonials");
      } finally {
         setLoading(false);
      }
   }

   const deleteTestimonial = async (id) => {
      if (confirm("Are you sure you want to delete?")){
         setLoading(true);
         try {
            const res = await fetch(apiUrl+'testimonials/'+id, {
               'method' : 'DELETE',
               'headers' : {
                  'Content-type' : 'application/json',
                  'Accept' : 'application/json',
                  'Authorization' : `Bearer ${token()}`
               }
            });
            const result = await res.json();
            // setTestimonials(result.data);

            if (result.status == true) {
               const newTestimonials = testimonials.filter(testimonial => testimonial.id != id)
               setTestimonials(newTestimonials)
               toast.success(result.message)
            } else {
               toast.error(result.message)
            }
         } catch (error) {
            toast.error("Delete failed");
         } finally {
            setLoading(false);
         }
      }
   }

   useEffect(() => {
      fetchTestimonials();
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
            <div className='container my-5'>
                  <div className='row'>
                     <div className='col-md-3 mb-3'>
                        {/* Sidebar */}
                        <Sidebar/>
                     </div>
                     <div className='col-md-9'>
                        {/* Dashboard */}
                        <div className='card shadow border-0'>
                              <div className='card-body p-4'>
                                 <div className='d-flex justify-content-between'>
                                    <h4 className='h5'>Testimonials</h4>
                                    <Link to="/admin/testimonials/create" className='btn btn-primary'>Create</Link>
                                 </div>
                                 <hr />
                                 <table className='table table-striped'>
                                    <thead>
                                       <tr>
                                          <th>ID</th>
                                          <th>Testimonial</th>
                                          <th>Citation</th>
                                          {/* <th>Designation</th> */}
                                          <th>Status</th>
                                          <th>Action</th>
                                       </tr>
                                    </thead>
                                    <tbody>
                                       {/* {loading && (
                                          <tr>
                                          <td colSpan="5" className="text-center py-4">
                                             <div className="spinner-border text-primary" role="status"></div>
                                          </td>
                                          </tr>
                                       )} */}

                                       {!loading && testimonials.length === 0 && (
                                          <tr>
                                          <td colSpan="5" className="text-center py-4">
                                             No testimonials found
                                          </td>
                                          </tr>
                                       )}

                                       { !loading &&
                                          testimonials && testimonials.map((testimonial, index) => {
                                             return (
                                                <tr key={`testimonial-${testimonial.id}`}>
                                                   <td>{index + 1}</td>
                                                   <td>{testimonial.testimonial}</td>
                                                   <td>{testimonial.citation}</td>
                                                   {/* <td>{testimonial.designation}</td> */}
                                                   <td>
                                                      {
                                                         (testimonial.status == 1)? 'Active':'Block'
                                                      }
                                                   </td>
                                                   <td>
                                                      <Link to={`/admin/testimonials/edit/${testimonial.id}`} className='btn btn-primary btn-sm'>Edit</Link>
                                                      <Link onClick={() => deleteTestimonial(testimonial.id)} className='btn btn-secondary btn-sm ms-2'>Delete</Link>
                                                   </td>
                                                </tr>
                                             )
                                          })
                                       }
                                    </tbody>
                                 </table>
                              </div>
                        </div>
                     </div>
                  </div>
            </div>
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

export default Show