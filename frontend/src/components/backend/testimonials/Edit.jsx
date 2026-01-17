import React, { useState, useRef, useMemo, useEffect } from 'react'
import Header from '../../common/Header'
import Sidebar from '../../common/Sidebar'
import Footer from '../../common/Footer'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useForm } from "react-hook-form"
import { apiUrl, token, fileUrl } from '../../common/http'
import { toast } from 'react-toastify'
import JoditEditor from 'jodit-react'
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

const Edit = ({placeholder}) => {
   const editor = useRef(null);
	const [content, setContent] = useState('');
	const [testimonial, setTestimonials] = useState('');
	const [isDisable, setIsDisable] = useState(false);
	const [imageId, setImageId] = useState(null);
   const params = useParams();
   const [loading, setLoading] = useState(true);

   const config = useMemo(() => ({
			readonly: false,
			placeholder: placeholder || ''
		}),
		[placeholder]
	);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues : async () => {
         const res = await fetch(apiUrl+'testimonials/'+params.id, {
         'method' : 'GET',
         'headers' : {
            'Content-type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${token()}`
         }
      });
      const result = await res.json();
      setContent(result.data.content);
      setTestimonials(result.data);
      return {
         testimonial: result.data.testimonial,
         citation: result.data.citation,
         designation: result.data.designation,
         status: result.data.status,
      }
      }
   });

   const navigate = useNavigate();

   const onSubmit = async (data) => {
      const newData = {...data, "content": content, "imageId":imageId}
      const res = await fetch(apiUrl+'testimonials/'+params.id, {
         'method' : 'PUT',
         'headers' : {
            'Content-type' : 'application/json',
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${token()}`
         },
         body : JSON.stringify(newData)
      });
      const result = await res.json();
      if (result.status == true) {
         toast.success(result.message);
         navigate('/admin/testimonials');
      } else {
         toast.error(result.message);
      }
   }

   const handleFile = async (e) => {
      const formData = new FormData();
      const file = e.target.files[0];
      formData.append("image", file);
      setIsDisable(true);
      
      await fetch(apiUrl+'temp-image', {
         'method' : 'POST',
         'headers' : {
            'Accept' : 'application/json',
            'Authorization' : `Bearer ${token()}`
         },
         body : formData
      })
      .then(response => response.json())
      .then(result => {
         setIsDisable(false);
         if (result.status == false){
            toast.error(result.errors.image[0])
         } else {
            setImageId(result.data.id)
         }
      });
   }
   
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
                                    <h4 className='h5'>Testimonials / Edit</h4>
                                    <Link to="/admin/testimonials" className='btn btn-primary'>Back</Link>
                                 </div>
                                 <hr />
                                 <form onSubmit={handleSubmit(onSubmit)}>
                                    <div className='mb-3'>
                                       <label htmlFor="" className='form-label'>Testimonial</label>
                                       <textarea placeholder='Testimonial'
                                       {
                                          ...register('testimonial', {
                                             required : "The Testimonial field is required."
                                          })
                                       }
                                       className={`form-control ${errors.testimonial && 'is-invalid'}`}
                                       rows={4}></textarea>
                                       {
                                          errors. testimonial && <p className='invalid-feedback'>{errors.testimonial?.message}</p>
                                       }
                                    </div>
                                    <div className='mb-3'>
                                       <label htmlFor="" className='form-label'>Citation</label>
                                       <input placeholder='Citation'
                                       {
                                          ...register('citation', {
                                             required : "The citation field is required."
                                          })
                                       }
                                       type="text" 
                                       className={`form-control ${errors.citation && 'is-invalid'}`} />
                                       {
                                          errors. citation && <p className='invalid-feedback'>{errors.citation?.message}</p>
                                       }
                                    </div>
                                    <div className='mb-3'>
                                       <label htmlFor="" className='form-label'>Designation</label>
                                       <input placeholder='Designation'
                                       {
                                          ...register('designation')
                                       }
                                       type="text" 
                                       className='form-control' />
                                    </div>
                                    <div className='mb-3'>
                                       <label htmlFor="" className='form-label'>Image</label>
                                       <br />
                                       <input onChange={handleFile} type="file" accept="image/*" className='form-control' />
                                    </div>
                                    <div className='pb-3'>
                                       {
                                          testimonial.image && <img src={fileUrl+'uploads/testimonials/'+testimonial.image} alt="" />
                                       }
                                    </div>
                                    <div className='mb-3'>
                                       <label htmlFor="" className='form-label'>Status</label>
                                       <select
                                       {
                                          ...register('status')
                                       }
                                       className='form-control'>
                                          <option value="1">Active</option>
                                          <option value="0">Block</option>
                                       </select>
                                    </div>
                                    <button disabled={isDisable} className='btn btn-primary'>Update</button>
                                 </form>
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

export default Edit